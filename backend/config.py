import os

# Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Database
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'database', 'smarthelmet.db')}"

# Upload folder
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

# Detection results folder
RESULT_FOLDER = os.path.join(BASE_DIR, "results")

# YOLO Model
MODEL_PATH = os.path.join(BASE_DIR, "models", "best.pt")

# Allowed image formats
ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"]

# Create required folders automatically
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "database"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "models"), exist_ok=True)