from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db, Base
from models import User
from schemas import UserCreate, UserLogin, Token, UserResponse
from auth import signup_user, login_user, get_current_user
from dotenv import load_dotenv
from schemas import OTPRequest, OTPVerify, PasswordReset
from auth import send_otp, verify_otp, reset_password

load_dotenv()

# ── Create Tables ─────────────────────────
Base.metadata.create_all(bind=engine)

# ── App ───────────────────────────────────
app = FastAPI(
    title="ForgeAI API",
    description="The open source AI tools platform by BlackRails Technology",
    version="0.1.0"
)

# ── CORS ──────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────

@app.get("/")
def root():
    return {
        "platform": "forgeai",
        "company": "BlackRails Technology",
        "version": "0.1.0",
        "status": "forge begins 🔥"
    }

@app.get("/health")
def health():
    return {"status": "running"}

# ── Auth Routes ───────────────────────────

@app.post("/auth/signup", response_model=Token)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return signup_user(user, db)

@app.post("/auth/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(user, db)

@app.get("/auth/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/debug")
def debug():
    import os
    return {
        "database_url_set": bool(os.getenv("DATABASE_URL")),
        "secret_key_set": bool(os.getenv("SECRET_KEY")),
        "supabase_url_set": bool(os.getenv("SUPABASE_URL")),
    }

@app.post("/auth/forgot-password")
def forgot_password(data: OTPRequest, db: Session = Depends(get_db)):
    return send_otp(data.email, db)

@app.post("/auth/verify-otp")
def verify_otp_route(data: OTPVerify):
    return verify_otp(data.email, data.otp)

@app.post("/auth/reset-password")
def reset_password_route(data: PasswordReset, db: Session = Depends(get_db)):
    return reset_password(data.email, data.new_password, db)
