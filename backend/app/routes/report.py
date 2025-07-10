from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.report import Report
from app.schemas.report import ReportOut

router = APIRouter()

# ✅ Get all reports (admin only)
@router.get("/reports", response_model=list[ReportOut])
def get_reports(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    return db.query(Report).all()

# ✅ Get report by ID (admin)
@router.get("/reports/{id}", response_model=ReportOut)
def get_report(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    report = db.query(Report).filter(Report.id == id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

# ✅ Download report (return dummy PDF for now)
@router.get("/reports/{id}/download")
def download_report(id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    report = db.query(Report).filter(Report.id == id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # For now, return dummy PDF content
    pdf_content = b"%PDF-1.4\n%Mock PDF\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"
    return Response(
        content=pdf_content,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=report_{id}.pdf"}
    )
