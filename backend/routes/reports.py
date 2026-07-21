from fastapi import APIRouter

router = APIRouter()

@router.get("/reports")
def reports():

    return [

        {
            "id":"RPT001",
            "date":"2026-07-21",
            "violations":2
        }

    ]