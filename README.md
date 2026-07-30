# Sub OCR 2026 MVP Project

React (Vite) 프론트엔드와 FastAPI 백엔드로 구성된 문서 OCR 및 LLM 요약 뼈대 프로젝트입니다.

## 📁 프로젝트 구조

```text
test_project/
├── backend/
│   ├── app/
│   │   ├── api/v1/ocr.py     # POST /api/v1/ocr/upload 엔드포인트
│   │   └── main.py            # FastAPI 애플리케이션 및 CORS 설정
│   ├── main.py                # 진입점 백업 (app.main re-export)
│   └── requirements.txt       # 백엔드 의존성 파일
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/api.js    # 백엔드 통신 API 함수
│   │   ├── App.jsx            # 메인 UI 컴포넌트
│   │   └── App.css            # 스타일링
│   └── package.json
└── testPrompt.md              # 요구사항 명세서
```

---

## 📥 다른 PC에서 Clone 후 시작하는 방법 (초기 환경설정)

새로운 PC 환경에서 이 프로젝트를 GitHub에서 Clone 받아 처음 실행할 때의 가이드입니다.

### 1. 프로젝트 복제 (Clone)
```bash
git clone https://github.com/csj9630/VibeCodingPractice.git
cd VibeCodingPractice
```

### 2. 백엔드 (FastAPI) 환경설정 및 구동
```bash
# 백엔드 폴더로 이동
cd backend

# 파이썬 가상환경 생성 (최초 1회)
python -m venv venv

# 가상환경 활성화 (Windows 기준)
.\venv\Scripts\Activate.ps1   # PowerShell
# 또는 .\venv\Scripts\activate.bat (CMD)

# 필요 패키지 재설치
pip install -r requirements.txt

# FastAPI 서버 실행 (http://localhost:8000)
uvicorn app.main:app --reload
```

### 3. 프론트엔드 (React / Vite) 환경설정 및 구동
```bash
# 프론트엔드 폴더로 이동
cd frontend

# node_modules 의존성 패키지 재설치 (최초 1회)
npm install

# Vite 개발 서버 실행 (http://localhost:5173)
npm run dev
```

---

## 🚀 기존 로컬 실행 방법 안내

### 1. 백엔드 (FastAPI) 구동
```bash
cd backend
uvicorn app.main:app --reload
```
> **FastAPI API 문서 확인**: 브라우저에서 [http://localhost:8000/docs](http://localhost:8000/docs) 접속

### 2. 프론트엔드 (React / Vite) 구동
```bash
cd frontend
npm run dev
```

---

## 🧪 동작 및 기능 테스트

1. 브라우저에서 `http://localhost:5173` 접속
2. 이미지 파일 Drag & Drop 또는 파일 클릭하여 선택
3. **'문서 분석 시작'** 버튼 클릭
4. **"OCR 및 LLM 요약 진행 중... (출시예정)"** 스피너 확인 (1초 목업 지연)
5. `alert("분석이 완료되었습니다!(출시예정)")` 확인
6. 화면 좌측(이미지 프리뷰) 및 우측(OCR 추출 텍스트 & LLM 요약 카드) 결과 출력 확인