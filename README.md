# 🦺 SmartHelmet AI

SmartHelmet AI is an AI-powered construction safety monitoring system that helps identify whether workers are following safety regulations by wearing helmets and safety vests. The system uses YOLOv8 for object detection and FastAPI for the backend, with a simple and responsive frontend built using HTML, CSS, and JavaScript.

This project was developed to demonstrate how Artificial Intelligence and Computer Vision can improve safety at construction sites.

---

## Features

- Detects safety helmets in construction site images
- Detects safety vests
- Counts workers
- Identifies safety violations
- Stores detection history
- Dashboard with analytics
- Report generation
- Responsive user interface
- FastAPI REST API
- SQLite database

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- FastAPI

### AI Model
- YOLOv8 (Ultralytics)

### Database
- SQLite

### Tools
- Git
- GitHub
- VS Code

---

## Project Structure

```text
SmartHelmet-AI/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   ├── routes/
│   └── services/
│
├── frontend/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── pages/
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Siva2859/SmartHelmet-AI.git
```

```bash
cd SmartHelmet-AI
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r backend/requirements.txt
```

### Run Backend

```bash
cd backend
uvicorn app:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

API Documentation

```
http://127.0.0.1:8000/docs
```

### Run Frontend

Open the frontend using VS Code Live Server.

Example:

```
http://127.0.0.1:5500/frontend/pages/index.html
```

---

## Application Flow

```
Login
   ↓
Dashboard
   ↓
Upload Image
   ↓
AI Detection
   ↓
Detection Result
   ↓
History
   ↓
Reports
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home |
| GET | `/dashboard` | Dashboard data |
| POST | `/detect` | Upload image and detect PPE |
| GET | `/history` | Detection history |
| GET | `/reports` | Reports |

---

## Future Improvements

- Live camera detection
- Real-time monitoring
- Email alerts
- PDF report export
- Multi-camera support
- Cloud deployment
- User authentication

---

## Author

**Achanta Siva Rama Krishna**

GitHub:  
https://github.com/Siva2859

---

## License

This project was created for educational and hackathon purposes.

---

## Screenshots

You can add screenshots here:

- Login Page
- Dashboard
- Upload Page
- Detection Results
- History
- Reports
- Analytics

---

⭐ If you found this project useful, consider giving it a star on GitHub.
