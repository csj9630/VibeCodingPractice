from fastapi import FastAPI
from app.api.v1 import ocr, history

app = FastAPI(title="Sub OCR 2026 API")

app.include_router(ocr.router, prefix="/api/v1/ocr", tags=["ocr"])
app.include_router(history.router, prefix="/api/v1/history", tags=["history"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Sub OCR 2026 Backend API"}
