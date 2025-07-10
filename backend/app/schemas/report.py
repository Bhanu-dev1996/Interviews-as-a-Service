from pydantic import BaseModel

class ReportOut(BaseModel):
    id: int
    title: str
    content: str

    class Config:
        from_attributes = True
