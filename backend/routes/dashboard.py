from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
def dashboard():

    return {
        "workers":156,
        "helmet":94,
        "vest":89,
        "violations":12
    }