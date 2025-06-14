// Google Translate 관련 타입 정의
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          config: { pageLanguage: string; autoDisplay: boolean },
          elementId: string,
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

// Google Translate 위젯의 select 요소를 기다리는 함수
const waitForGoogleTranslateWidget = (
  maxAttempts: number = 10,
  interval: number = 200,
): Promise<HTMLSelectElement> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkWidget = () => {
      const element = document.querySelector(
        '.goog-te-combo',
      ) as HTMLSelectElement;
      if (element) {
        resolve(element);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        reject(new Error('Google Translate 위젯을 찾을 수 없습니다.'));
      } else {
        setTimeout(checkWidget, interval);
      }
    };
    checkWidget();
  });
};

// 언어 변경 함수
export const changeLanguage = async (lang: string) => {
  try {
    const selectElement = await waitForGoogleTranslateWidget();
    selectElement.value = lang;
    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (error) {
    console.error('언어 변경 중 오류 발생:', error);
    throw error;
  }
};

// 현재 선택된 언어를 가져오는 함수
export const getCurrentLanguage = (): string => {
  const selectElement = document.querySelector(
    '.goog-te-combo',
  ) as HTMLSelectElement;
  if (selectElement && selectElement.value) {
    return selectElement.value;
  }

  // 쿠키를 fallback으로 확인 (초기 로드 시 유용)
  const cookieMatch = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
  if (cookieMatch) {
    return cookieMatch[2].split('/')[2];
  }

  return 'ko'; // 기본값
};
