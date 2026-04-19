from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy import Column, String, Boolean, DateTime, Enum, Float, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base
import uuid
import enum

# Role choices
class UserRole(str, enum.Enum):
    user = "user"
    developer = "developer"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.user)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ToolCategory(str, enum.Enum):
    iot = "iot"
    gaming = "gaming"
    language = "language"
    productivity = "productivity"
    drones = "drones"
    creative = "creative"
    education = "education"
    automation = "automation"
    developer = "developer"

class ToolPlatform(str, enum.Enum):
    android = "android"
    desktop = "desktop"
    web = "web"
    iot = "iot"
    drones = "drones"

class Tool(Base):
    __tablename__ = "tools"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    developer_id = Column(UUID(as_uuid=True), nullable=False)
    developer_name = Column(String, nullable=False)
    category = Column(Enum(ToolCategory), nullable=False)
    price = Column(Float, default=0.0)
    is_free = Column(Boolean, default=True)
    downloads = Column(Integer, default=0)
    rating = Column(Float, default=0.0)
    version = Column(String, default="1.0.0")
    platforms = Column(String, default="web")
    manifest = Column(JSON, nullable=True)
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())