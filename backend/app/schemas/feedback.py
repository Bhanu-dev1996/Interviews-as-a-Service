# app/schemas/feedback.py

from pydantic import BaseModel, Field
from typing import Optional

class FeedbackSchema(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    comments: Optional[str] = Field(None, max_length=1000)

    class Config:
        from_attributes = True
