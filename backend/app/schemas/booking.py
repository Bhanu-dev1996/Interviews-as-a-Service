# app/schemas/booking.py
from pydantic import BaseModel
from datetime import datetime

class BookingCreate(BaseModel):
    candidate_id: int
    interviewer_id: int
    scheduled_time: datetime

class BookingOut(BookingCreate):
    id: int
    class Config:
        from_attributes = True
