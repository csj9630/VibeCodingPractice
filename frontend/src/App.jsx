import { useState, useRef } from 'react';
import { uploadOcrImage } from './services/api';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('분석할 이미지 파일을 먼저 선택해 주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await uploadOcrImage(selectedFile);
      setResult(data);
      alert('분석이 완료되었습니다!(출시예정)');
    } catch (err) {
      console.error('OCR Upload Error:', err);
      setError(err.message || '문서 분석 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* 헤더 영역 */}
      <header className="app-header">
        <span className="badge">Sub OCR 2026 MVP (출시예정)</span>
        <h1 className="app-title">지능형 문서 OCR 및 요약 서비스</h1>
        <p className="app-subtitle">
          이미지 문서를 업로드하여 텍스트를 추출하고 LLM 요약 결과를 즉시 확인하세요.
        </p>
      </header>

      {/* 파일 업로드 영역 */}
      <section className="upload-card">
        <div
          className={`dropzone ${isDragOver ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="dropzone-text">이미지 파일을 여기에 드래그 앤 드롭하세요</div>
          <div className="dropzone-subtext">또는 클릭하여 파일 선택 (PNG, JPG, JPEG)</div>
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        {/* 선택한 파일 정보 표시 */}
        {selectedFile && (
          <div className="selected-file-info">
            <span className="file-name">📄 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            <button type="button" className="remove-file-btn" onClick={handleRemoveFile}>
              삭제
            </button>
          </div>
        )}

        {/* 버튼 및 로딩 영역 */}
        <div className="action-area">
          <button
            type="button"
            className="btn-primary"
            onClick={handleAnalyze}
            disabled={!selectedFile || loading}
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>분석 처리 중...</span>
              </>
            ) : (
              <span>문서 분석 시작</span>
            )}
          </button>

          {loading && (
            <div className="loading-box">
              <div className="spinner" />
              <span>OCR 및 LLM 요약 진행 중... (출시예정)</span>
            </div>
          )}


          {error && <div className="error-banner">❌ {error}</div>}
        </div>
      </section>

      {/* 분석 결과 표시 영역 */}
      {result && (
        <section className="results-grid">
          {/* 좌측: 업로드한 이미지 프리뷰 */}
          <div className="result-card">
            <h2 className="result-card-title">🖼️ 이미지 프리뷰</h2>
            <div className="image-preview-container">
              {previewUrl ? (
                <img src={previewUrl} alt="업로드 이미지 프리뷰" className="image-preview" />
              ) : (
                <p>프리뷰 이미지가 없습니다.</p>
              )}
            </div>
          </div>

          {/* 우측: 추출 텍스트 및 LLM 요약 결과 */}
          <div className="result-card">
            <h2 className="result-card-title">📝 OCR 추출 텍스트</h2>
            <div className="text-content-box">
              {result.extracted_text}
            </div>

            <h2 className="result-card-title" style={{ marginTop: '1.5rem' }}>🤖 LLM 요약 결과</h2>
            <div className="text-content-box summary">
              {result.summary_text}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
