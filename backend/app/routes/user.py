from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserOut, UserUpdate

router = APIRouter()

@router.get("/users/profile", response_model=UserOut)
def get_profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    user_data = db.query(User).filter(User.email == user["sub"]).first()
    return user_data

@router.put("/users/profile", response_model=UserOut)
def update_profile(update: UserUpdate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user["sub"]).first()
    for key, value in update.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/users/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
