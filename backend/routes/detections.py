from fastapi import APIRouter

router = APIRouter()

@router.get("/detections")
def detections():

    return [

        {
            "worker":"W-101",
            "helmet":True,
            "vest":True,
            "status":"Safe"
        },

        {
            "worker":"W-102",
            "helmet":False,
            "vest":True,
            "status":"Helmet Missing"
        }

    ]