// Google Translate 관련 타입 정의

// Google Translate 위젯 인스턴스의 타입 정의
interface GoogleTranslateElementInstance {
  [key: string]: { restore?: () => void };
}

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          config: { pageLanguage: string; autoDisplay: boolean },
          elementId: string,
        ) => GoogleTranslateElementInstance;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

// Google Translate 위젯 인스턴스를 저장하는 변수
let translateElementInstance: GoogleTranslateElementInstance | null = null;

// Google Translate 위젯 인스턴스를 설정
export const setTranslateElementInstance = (
  instance: GoogleTranslateElementInstance,
) => {
  translateElementInstance = instance;
};

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

  // 쿠키를 fallback으로 확인
  const cookieMatch = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
  if (cookieMatch) {
    return cookieMatch[2].split('/')[2];
  }

  return 'ko'; // 기본값
};

// Google Translate 위젯의 restore() 함수를 호출하여 번역을 되돌리는 함수
export const revertToOriginal = async () => {
  // 저장된 인스턴스에서 restore 함수를 찾아 실행
  let restoreCalled = false;
  if (translateElementInstance) {
    for (const key in translateElementInstance) {
      if (
        Object.prototype.hasOwnProperty.call(translateElementInstance, key) &&
        translateElementInstance[key] &&
        typeof translateElementInstance[key].restore === 'function'
      ) {
        translateElementInstance[key].restore();
        restoreCalled = true;
        break;
      }
    }
  }

  // restore 함수를 찾을 수 없으면 에러 발생
  if (!restoreCalled) {
    const errorMessage =
      'Google Translate 인스턴스에서 restore() 함수를 찾을 수 없거나 인스턴스가 없습니다.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  // 번역 설정이 유지되지 않도록 googtrans 쿠키를 제거
  const cookieMatch = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
  if (cookieMatch) {
    document.cookie =
      'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};
