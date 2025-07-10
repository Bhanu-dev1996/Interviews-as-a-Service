from pydantic import BaseModel
from typing import List
from datetime import date, time


class AvailabilityCreate(BaseModel):
    date: date
    slots: List[time]


class AvailabilityOut(BaseModel):
    id: int
    interviewer_id: int
    date: date
    slots: List[time]

    class Config:
        from_attributes = True
