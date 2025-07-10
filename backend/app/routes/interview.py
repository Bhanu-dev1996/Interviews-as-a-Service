from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.booking import Booking
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingOut
from app.dependencies.auth import get_current_user
from datetime import datetime

router = APIRouter()

# ✅ Get all interviews (admin or interviewer)
@router.get("/interviews")
def get_interviews(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] == "admin":
        return db.query(Booking).all()
    elif user["role"] == "interviewer":
        return db.query(Booking).filter(Booking.interviewer_id == user["id"]).all()
    elif user["role"] == "candidate":
        return db.query(Booking).filter(Booking.candidate_id == user["id"]).all()
    raise HTTPException(status_code=403, detail="Access denied")

# ✅ Get interview by ID
@router.get("/interviews/{id}", response_model=BookingOut)
def get_interview(id: int, db: Session = Depends(get_db)):
    interview = db.query(Booking).filter(Booking.id == id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    return interview

# ✅ Book a new interview
@router.post("/interviews", response_model=BookingOut)
def book_interview(data: BookingCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can book interviews")
    booking = Booking(**data.dict(), candidate_id=user["id"])
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

# ✅ Update interview (by interviewer)
@router.put("/interviews/{id}", response_model=BookingOut)
def update_interview(id: int, data: BookingCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    interview = db.query(Booking).filter(Booking.id == id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    if user["role"] != "interviewer" or interview.interviewer_id != user["id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    for key, value in data.dict().items():
        setattr(interview, key, value)
    db.commit()
    db.refresh(interview)
    return interview

# ✅ Cancel interview (by candidate)
@router.delete("/interviews/{id}")
def cancel_interview(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    interview = db.query(Booking).filter(Booking.id == id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    if user["role"] != "candidate" or interview.candidate_id != user["id"]:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this booking")
    db.delete(interview)
    db.commit()
    return {"detail": "Interview cancelled"}

# ✅ Get available slots for a given interviewer
@router.get("/interviews/availability/{interviewer_id}")
def get_available_slots(interviewer_id: int, date: str = Query(...), db: Session = Depends(get_db)):
    try:
        day = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
    # 🔧 This would be replaced by actual availability logic later
    booked_times = db.query(Booking).filter(
        Booking.interviewer_id == interviewer_id,
        Booking.scheduled_time.between(f"{day} 00:00", f"{day} 23:59")
    ).all()
    return {"interviewer_id": interviewer_id, "booked_slots": [b.scheduled_time for b in booked_times]}
