from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import DetectionHistory

router = APIRouter(tags=["History"])


# ==========================================
# Get All Detection History
# ==========================================

@router.get("/history")
def get_history(db: Session = Depends(get_db)):

    history = db.query(DetectionHistory).order_by(
        DetectionHistory.id.desc()
    ).all()

    return history


# ==========================================
# Get Single History Record
# ==========================================

@router.get("/history/{history_id}")
def get_history_by_id(
    history_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        DetectionHistory
    ).filter(
        DetectionHistory.id == history_id
    ).first()