import asyncio
from fastapi import APIRouter, File, UploadFile, HTTPException

router = APIRouter()

@router.post("/upload")
async def upload_ocr_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="파일이 업로드되지 않았습니다.")
    
    # 목업 지연 시간 (1초)
    await asyncio.sleep(1)
    
    return {
        "status": "success",
        "filename": file.filename,
        "extracted_text": f"[MOCK (출시예정)] 인식된 OCR 텍스트입니다. 문서 ({file.filename}) 내용 sample...\n- 안녕하세요! 대표 문서 텍스트 추출 샘플입니다.\n- 이미지 내 불필요한 노이즈 제거 완료.\n- 주요 텍스트 100% 인식 성공.",
        "summary_text": "[MOCK (출시예정)] LLM 요약 결과입니다:\n1. 문서의 핵심 요약 내용 첫번째 (주요 안건 분석 완료)\n2. 두번째 주요 포인트 (데이터 세부 항목 확인 필요)\n3. 세번째 결론 (최종 승인 준비 단계)"
    }


