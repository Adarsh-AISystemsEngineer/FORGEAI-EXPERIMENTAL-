from pydantic import BaseModel, EmailStr
from enum import Enum
from uuid import UUID
from datetime import datetime
from typing import Optional

class UserRole(str, Enum):
    user = "user"
    developer = "developer"
    admin = "admin"

# ── Signup ────────────────────────────────
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    role: UserRole = UserRole.user

# ── Login ─────────────────────────────────
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ── Response (what we send back) ──────────
class UserResponse(BaseModel):
    id: UUID
    email: str
    username: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ── Token ─────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class OTPRequest(BaseModel):
    email: EmailStr

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str

class PasswordReset(BaseModel):
    email: EmailStr
    new_password: str