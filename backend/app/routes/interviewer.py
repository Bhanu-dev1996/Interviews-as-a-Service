from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.booking import Booking
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.feedback import FeedbackSchema
from app.schemas.availability import AvailabilityCreate, AvailabilityOut
from datetime import datetime
from app.schemas.feedback import FeedbackSchema

router = APIRouter()


# ✅ Get all interviewers
@router.get("/interviewers")
def get_interviewers(db: Session = Depends(get_db)):
    return db.query(User).filter(User.role == "interviewer").all()


# ✅ Get interviewer by ID
@router.get("/interviewers/{id}")
def get_interviewer(id: int, db: Session = Depends(get_db)):
    interviewer = db.query(User).filter(User.id == id, User.role == "interviewer").first()
    if not interviewer:
        raise HTTPException(status_code=404, detail="Interviewer not found")
    return interviewer


# ✅ Set availability (placeholder for now)
@router.post("/interviewers/availability", response_model=AvailabilityOut)
def set_availability(data: AvailabilityCreate, user=Depends(get_current_user)):
    if user["role"] != "interviewer":
        raise HTTPException(status_code=403, detail="Only interviewers can set availability")
    # ❗ You can save this to a real model like InterviewerAvailability
    return data  # returning for now, assuming front-end needs mock


# ✅ Get availability (mocked response)
@router.get("/interviewers/availability")
def get_availability(user=Depends(get_current_user)):
    if user["role"] != "interviewer":
        raise HTTPException(status_code=403, detail="Only interviewers can view their availability")
    # ❗ Replace with real DB logic when InterviewerAvailability model is added
    return {
        "availability": [
            {"date": "2025-07-10", "slot": "10:00-11:00"},
            {"date": "2025-07-10", "slot": "14:00-15:00"},
        ]
    }


# ✅ Submit feedback on interview
@router.post("/interviews/{interview_id}/feedback")
def submit_feedback(interview_id: int, feedback: FeedbackSchema, db: Session = Depends(get_db), user=Depends(get_current_user)):
    interview = db.query(Booking).filter(Booking.id == interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    if user["role"] != "interviewer" or interview.interviewer_id != user["id"]:
        raise HTTPException(status_code=403, detail="Only the assigned interviewer can submit feedback")
    interview.feedback = feedback.text
    db.commit()
    db.refresh(interview)
    return {"message": "Feedback submitted"}
