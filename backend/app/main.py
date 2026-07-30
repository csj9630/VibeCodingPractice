from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import ocr

app = FastAPI(
    title="Sub OCR 2026 API",
    description="OCR & LLM Document Analysis MVP Service",
    version="1.0.0"
)

# CORS 설정 (React 프론트엔드 통신 허용)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router 등록
app.include_router(ocr.router, prefix="/api/v1/ocr", tags=["ocr"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Sub OCR 2026 Backend API"}
