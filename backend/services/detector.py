from ultralytics import YOLO
from config import MODEL_PATH
import os

# Load model only once
model = YOLO(MODEL_PATH)


def detect_ppe(image_path):
    """
    Detect PPE in an image using the trained YOLO model.
    """

    results = model.predict(
        source=image_path,
        conf=0.5,
        save=True,
        project="results",
        name="prediction",
        exist_ok=True
    )

    detections = []

    for result in results:

        boxes = result.boxes

        for box in boxes:

            cls = int(box.cls[0])
            confidence = float(box.conf[0])

            class_name = model.names[cls]

            x1, y1, x2, y2 = map(int, box.xyxy[0])

            detections.append({
                "class": class_name,
                "confidence": round(confidence, 2),
                "bbox": [x1, y1, x2, y2]
            })
    print(detections)
    return detections

