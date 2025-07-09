from pydantic import BaseModel, EmailStr
from enum import Enum

class Role(str, Enum):
    candidate = "candidate"
    interviewer = "interviewer"
    admin = "admin"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Role = Role.candidate

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: Role

    class Config:
        orm_mode = True
