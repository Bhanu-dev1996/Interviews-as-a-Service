from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User
from app.models.booking import Booking

router = APIRouter()


# ✅ Admin analytics
@router.get("/admin/analytics")
def get_analytics(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return {
        "candidates": db.query(User).filter(User.role == "candidate").count(),
        "interviewers": db.query(User).filter(User.role == "interviewer").count(),
        "bookings": db.query(Booking).count(),
    }


# ✅ Admin get all users
@router.get("/admin/users")
def get_all_users(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return db.query(User).all()


# ✅ Approve interviewer
@router.put("/admin/interviewers/{id}/approve")
def approve_interviewer(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    interviewer = db.query(User).filter(User.id == id, User.role == "interviewer").first()
    if not interviewer:
        raise HTTPException(status_code=404, detail="Interviewer not found")
    interviewer.is_approved = True
    db.commit()
    return {"message": "Interviewer approved"}


# ✅ Reject interviewer
@router.put("/admin/interviewers/{id}/reject")
def reject_interviewer(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    interviewer = db.query(User).filter(User.id == id, User.role == "interviewer").first()
    if not interviewer:
        raise HTTPException(status_code=404, detail="Interviewer not found")
    interviewer.is_approved = False
    db.commit()
    return {"message": "Interviewer rejected"}


# ✅ Platform settings (mock)
@router.get("/admin/settings")
def get_settings(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return {
        "platform_name": "InterviewPro",
        "booking_window_days": 30,
        "max_daily_slots": 10
    }

@router.put("/admin/settings")
def update_settings(settings: dict, user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    # Normally, update DB config
    return {"message": "Settings updated", "new": settings}
