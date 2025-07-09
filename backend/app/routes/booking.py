from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.booking import BookingCreate, BookingOut
from app.models.booking import Booking
from app.models.user import User
from app.dependencies.auth import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Protected Booking Create Route
@router.post("/", response_model=BookingOut)
def create_booking(data: BookingCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    # Example role check
    if user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can book interviews")
    booking = Booking(**data.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

# ✅ Admin Analytics Route
@router.get("/stats/users")
def user_stats(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    result = {
        "candidates": db.query(User).filter(User.role == "candidate").count(),
        "interviewers": db.query(User).filter(User.role == "interviewer").count(),
        "admins": db.query(User).filter(User.role == "admin").count(),
    }
    return result
