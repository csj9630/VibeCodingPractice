from fastapi import APIRouter

router = APIRouter()

@router.post("/process")
async def process_ocr():
    return {"message": "OCR & LLM Summary Endpoint"}
