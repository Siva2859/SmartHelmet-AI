from fastapi import APIRouter, UploadFile, File
from services.detector import detect_ppe
from config import UPLOAD_FOLDER
from services.analyzer import analyze_detections

import os
import shutil
from sqlalchemy.orm import Session
from fastapi import Depends

from database import get_db
from models import DetectionHistory

router = APIRouter()


@router.post("/detect")
async def detect(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Save uploaded image
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run AI Detection
    detections = detect_ppe(file_path)
    report = analyze_detections(detections)
    
    history = DetectionHistory(

        image_name=file.filename,

        total_workers=report["total_workers"],

        helmet_count=report["helmet_count"],

        no_helmet_count=max(
            report["total_workers"] - report["helmet_count"],
            0
        ),

        vest_count=report["vest_count"],

        no_vest_count=max(
            report["total_workers"] - report["vest_count"],
            0
        ),

        violations=report["violations"],

        compliance_score=report["safety_score"],

        result_image=f"results/prediction/{file.filename}"

    )

    db.add(history)

    db.commit()

    db.refresh(history)

    prediction_image = f"results/prediction/{file.filename}"
    

    return {
        "status": "success",
        "filename": file.filename,
        "prediction_image": prediction_image,
        "report": report,
        "detections": detections
    }