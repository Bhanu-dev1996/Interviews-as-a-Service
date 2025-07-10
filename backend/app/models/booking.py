from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer, ForeignKey("interviews.id"))
    candidate_id = Column(Integer, ForeignKey("users.id"))
    interviewer_id = Column(Integer, ForeignKey("users.id"))
    scheduled_time = Column(DateTime)

    interview = relationship("Interview", back_populates="bookings")
    candidate = relationship("User", foreign_keys=[candidate_id])
    interviewer = relationship("User", foreign_keys=[interviewer_id])
