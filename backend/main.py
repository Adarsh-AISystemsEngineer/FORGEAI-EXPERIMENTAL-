from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db, Base
from models import User, Tool
from schemas import UserCreate, UserLogin, Token, UserResponse
from schemas import OTPRequest, OTPVerify, PasswordReset
from schemas import ToolCreate, ToolResponse, ToolListResponse
from auth import signup_user, login_user, get_current_user
from auth import send_otp, verify_otp, reset_password
from dotenv import load_dotenv
from typing import Optional
import uuid
from sqlalchemy import String

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

# ── Tools Routes ──────────────────────────

@app.get("/tools", response_model=ToolListResponse)
def get_tools(
    category: Optional[str] = Query(None),
    platform: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Tool).filter(Tool.is_approved == True)

    if category:
        query = query.filter(Tool.category == category)

    if platform:
        query = query.filter(Tool.platforms.contains(platform))

    if search:
        query = query.filter(
            Tool.name.ilike(f"%{search}%") |
            Tool.description.ilike(f"%{search}%")
        )

    tools = query.all()
    return ToolListResponse(tools=tools, total=len(tools))


@app.get("/tools", response_model=ToolListResponse)
def get_tools(
    category: Optional[str] = Query(None),
    platform: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Tool).filter(Tool.is_approved == True)

    if category:
        # Cast to string to avoid enum mismatch
        query = query.filter(
            Tool.category.cast(String) == category
        )

    if platform:
        query = query.filter(Tool.platforms.contains(platform))

    if search:
        query = query.filter(
            Tool.name.ilike(f"%{search}%") |
            Tool.description.ilike(f"%{search}%")
        )

    tools = query.all()
    return ToolListResponse(tools=tools, total=len(tools))


@app.post("/tools", response_model=ToolResponse)
def create_tool(
    tool: ToolCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_tool = Tool(
        name=tool.name,
        description=tool.description,
        developer_id=current_user.id,
        developer_name=current_user.username,
        category=tool.category,
        price=tool.price,
        is_free=tool.is_free,
        version=tool.version,
        platforms=tool.platforms,
        is_approved=False
    )
    db.add(new_tool)
    db.commit()
    db.refresh(new_tool)
    return new_tool


@app.patch("/tools/{tool_id}/approve")
def approve_tool(
    tool_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    tool.is_approved = True
    db.commit()
    return {"message": "Tool approved"}


@app.delete("/tools/{tool_id}")
def delete_tool(
    tool_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")

    if str(tool.developer_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not your tool")

    db.delete(tool)
    db.commit()
    return {"message": "Tool deleted"}