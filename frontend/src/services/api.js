const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * 이미지 파일을 백엔드 OCR/LLM 분석 API에 업로드합니다.
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} API 응답 데이터 (status, filename, extracted_text, summary_text)
 */
export async function uploadOcrImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/ocr/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `서버 오류가 발생했습니다. (상태 코드: ${response.status})`);
  }

  return response.json();
}
