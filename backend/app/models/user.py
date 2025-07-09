from sqlalchemy import Column, Integer, String, Enum
from app.database import Base
import enum

class Role(enum.Enum):
    candidate = "candidate"
    interviewer = "interviewer"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(Enum(Role), default=Role.candidate)
