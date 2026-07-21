from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import engine
from models import Base

from routes.detect import router as detect_router
from routes.dashboard import router as dashboard_router
from routes.detections import router as detections_router
from routes.reports import router as reports_router
from routes.history import router as history_router

# Create all database tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(
    title="SmartHelmet AI",
    description="AI-powered Construction Safety Monitoring System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Later you can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(detect_router, tags=["Detection"])
app.include_router(dashboard_router)
app.include_router(detections_router)
app.include_router(reports_router)
app.include_router(history_router)

# Static folder for annotated images
app.mount(
    "/results",
    StaticFiles(directory="runs/detect/results"),
    name="results"
)

# Home
@app.get("/")
def home():
    return {
        "message": "SmartHelmet AI Backend Running Successfully 🚀",
        "status": "Server is Live"
    }