from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from database import Base


class DetectionHistory(Base):
    __tablename__ = "detection_history"

    id = Column(Integer, primary_key=True, index=True)

    image_name = Column(String, nullable=False)

    total_workers = Column(Integer, default=0)

    helmet_count = Column(Integer, default=0)

    no_helmet_count = Column(Integer, default=0)

    vest_count = Column(Integer, default=0)

    no_vest_count = Column(Integer, default=0)

    violations = Column(Integer, default=0)

    compliance_score = Column(Float, default=0.0)

    result_image = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)