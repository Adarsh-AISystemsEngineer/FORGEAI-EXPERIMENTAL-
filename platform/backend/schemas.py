from pydantic import BaseModel, EmailStr
from enum import Enum
from uuid import UUID
from typing import List
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



# ── Tool Schemas ──────────────────────────

class ToolCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float = 0.0
    is_free: bool = True
    version: str = "1.0.0"
    platforms: str = "web"

class ToolResponse(BaseModel):
    id: UUID
    name: str
    description: str
    developer_id: UUID
    developer_name: str
    category: str
    price: float
    is_free: bool
    downloads: int
    rating: float
    version: str
    platforms: str
    is_approved: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ToolListResponse(BaseModel):
    tools: List[ToolResponse]
    total: int