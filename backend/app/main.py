from fastapi import FastAPI
from app.routes import auth, booking
from app.database import Base, engine
from app.models import user, booking as booking_model

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/api/auth")
app.include_router(booking.router, prefix="/api/bookings")  # ✅ Add this
