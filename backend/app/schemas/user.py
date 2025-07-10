from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional

class Role(str, Enum):
    candidate = "candidate"
    interviewer = "interviewer"
    admin = "admin"

class UserCreate(BaseModel):
    email: str
    password: str
    role: str
    full_name: str | None = None  # or name: str | None = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: Role

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    role: Optional[Role] = None

class Token(BaseModel):
    access_token: str
    token_type: str
