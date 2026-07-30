너는 풀스택 웹 개발 전문가야. 
현재 진행 중인 React(JS) 프론트엔드와 FastAPI 백엔드 프로젝트의 초기 MVP 뼈대 코드를 작성해줘.
Docker나 DB 연동은 제외하고, 로컬 IDE에서 직접 서버를 구동하여 UI 및 API 라우팅을 즉시 테스트할 수 있는 최소 단위의 작동 가능한 코드를 원해.

[프로젝트 기본 정보 및 구조]
- 프론트엔드: React (Vite, JavaScript), Tailwind CSS 또는 기본 CSS 사용
- 백엔드: FastAPI (Python)
- 폴더 구조:
  frontend/ (src/App.jsx, src/components/, src/services/api.js)
  backend/ (app/main.py, app/api/v1/ocr.py)

[요구사항]

1. Backend (FastAPI):
- CORS 미들웨어를 설정하여 `http://localhost:5173` (React) 요청을 허용할 것.
- `/api/v1/ocr/upload` (POST) 엔드포인트를 작성해줘.
  - Multipart/form-data 형식으로 이미지 파일(`file`)을 전달받음.
  - 현재는 실제 OCR/LLM API를 호출하지 않고, 1초 간의 목업 지연시간(asyncio.sleep)을 거친 후 아래 예시 JSON을 반환함.
  - 반환 JSON 구조:
    {
      "status": "success",
      "filename": "업로드한 파일명",
      "extracted_text": "[MOCK] 인식된 OCR 텍스트입니다. 문서 내용 sample...",
      "summary_text": "[MOCK] LLM 요약 결과입니다:\n1. 문서의 핵심 요약 내용 첫번째\n2. 두번째 주요 포인트\n3. 세번째 결론"
    }

2. Frontend (React):
- 메인 화면 컴포넌트(`App.jsx`) 하나에 아래 UI 요소를 깔끔하고 직관적으로 구성해줘.
  - 이미지 파일 업로드 영역 (Drag & Drop 또는 파일 선택 input)
  - '문서 분석 시작' 버튼
  - 로딩 상태 표시 (분석 중일 때 버튼 비활성화 및 "OCR 및 LLM 요약 진행 중..." 스피너/문구)
  - 분석 완료 시:
    1) 브라우저 `alert()` 창으로 "분석이 완료되었습니다!" 메시지 출력
    2) 화면 좌측: 업로드한 이미지 프리뷰 표시
    3) 화면 우측: 백엔드에서 받아온 '추출 텍스트'와 'LLM 요약 결과'를 영역을 나누어 깔끔하게 카드 형태로 출력
- 백엔드 통신용 함수(`services/api.js`): `fetch` 또는 `axios`를 사용해 백엔드의 `/api/v1/ocr/upload`에 통신하는 코드 작성.

3. 실행 방법 안내:
- frontend 및 backend 각각 로컬 터미널에서 실행하기 위한 명령어(npm run dev, uvicorn 등)를 하단에 요약해줘.

위 요구사항을 만족하도록 `backend/app/main.py`, `backend/app/api/v1/ocr.py`, `frontend/src/App.jsx`, `frontend/src/services/api.js` 코드를 분리해서 작성해줘.