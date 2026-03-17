from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
import bcrypt as bcrypt_lib
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import resend
import random
import time
import os

from database import get_db
from models import User
from schemas import UserCreate, UserLogin, Token, UserResponse

load_dotenv()

# ── Config ────────────────────────────────
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ── Password Hashing ──────────────────────

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# ── Password Utils ────────────────────────
def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt_lib.gensalt()
    return bcrypt_lib.hashpw(pwd_bytes, salt).decode('utf-8')


def verify_password(plain: str, hashed: str) -> bool:
    pwd_bytes = plain.encode('utf-8')
    hashed_bytes = hashed.encode('utf-8')
    return bcrypt_lib.checkpw(pwd_bytes, hashed_bytes)

# ── JWT Token ─────────────────────────────
def create_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ── Signup ────────────────────────────────
def signup_user(user: UserCreate, db: Session):
    # Check if email exists
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check if username exists
    existing_username = db.query(User).filter(User.username == user.username).first()
    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    # Create new user
    new_user = User(
        email=user.email,
        username=user.username,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Create token
    token = create_token({"sub": str(new_user.id), "role": new_user.role})

    return Token(
        access_token=token,
        token_type="bearer",
        user=UserResponse.from_orm(new_user)
    )

# ── Login ─────────────────────────────────
def login_user(user: UserLogin, db: Session):
    # Find user by email
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create token
    token = create_token({"sub": str(db_user.id), "role": db_user.role})

    return Token(
        access_token=token,
        token_type="bearer",
        user=UserResponse.from_orm(db_user)
    )

# ── Get Current User ──────────────────────
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception

    return user

# Temporary OTP store {email: {otp, expires_at}}
otp_store = {}

# ── Send OTP ──────────────────────────────
def send_otp(email: str, db: Session):
    # Check if user exists
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="No account found with this email"
        )

    # Generate 6 digit OTP
    otp = str(random.randint(100000, 999999))
    
    # Store OTP with 10 minute expiry
    otp_store[email] = {
        "otp": otp,
        "expires_at": time.time() + 600
    }

    # Send email via Resend
    resend.api_key = os.getenv("RESEND_API_KEY")
    resend.Emails.send({
        "from": "forgeai@yourdomain.com",
        "to": email,
        "subject": "forgeai — Your OTP Code",
        "html": f"""
            <div style="background:#000;color:#fff;padding:40px;font-family:monospace;">
                <h2 style="color:#E85D04;">⚒️ FORGEAI</h2>
                <p>Your OTP code is:</p>
                <h1 style="color:#E85D04;font-size:48px;letter-spacing:8px;">{otp}</h1>
                <p style="color:#666;">Expires in 10 minutes.</p>
                <p style="color:#666;">If you didn't request this, ignore this email.</p>
            </div>
        """
    })

    return {"message": "OTP sent to your email"}

# ── Verify OTP ────────────────────────────
def verify_otp(email: str, otp: str):
    if email not in otp_store:
        raise HTTPException(status_code=400, detail="OTP not found. Request a new one")

    stored = otp_store[email]

    if time.time() > stored["expires_at"]:
        del otp_store[email]
        raise HTTPException(status_code=400, detail="OTP expired. Request a new one")

    if stored["otp"] != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # Mark OTP as verified
    otp_store[email]["verified"] = True

    return {"message": "OTP verified"}

# ── Reset Password ────────────────────────
def reset_password(email: str, new_password: str, db: Session):
    if email not in otp_store:
        raise HTTPException(status_code=400, detail="Please verify OTP first")

    if not otp_store[email].get("verified"):
        raise HTTPException(status_code=400, detail="OTP not verified")

    if len(new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    # Update password
    user = db.query(User).filter(User.email == email).first()
    user.password = hash_password(new_password)
    db.commit()

    # Clear OTP
    del otp_store[email]

    return {"message": "Password reset successfully"}