import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import {
  changeLanguage,
  getCurrentLanguage,
  revertToOriginal,
  setTranslateElementInstance,
} from '@/utils/translate';
import Icon from '@/components/Common/Icon';
import BottomSheetCheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import { BottomSheet } from '@/components/Common/BottomSheet';

interface LanguageBottomSheetProps {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>;
}

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: 'none', name: '없음' },
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'zh-CN', name: '中文(简体)' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

const LanguageBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: LanguageBottomSheetProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('ko');
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Google Translate의 기본 UI(배너, 툴팁)를 숨기는 스타일을 주입합니다.
    // 번역 중 간헐적으로 나타나는 UI가 화면을 가리는 문제를 해결합니다.
    const style = document.createElement('style');
    style.id = 'google-translate-override';
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate {
          display: none !important;
      }
      html,
      body {
        top: 0px !important;
        margin-top: 0px !important;
      }
      body > div.skiptranslate,
      svg.VIpgJd-ZVi9od-aZ2wEe,
      div.VIpgJd-ZVi9od-aZ2wEe-OiiCO,
      div.VIpgJd-ZVi9od-aZ2wEe-OiiCO-ti6hGc,
      #goog-gt-tt {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('google-translate-override');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  useEffect(() => {
    // 스크립트가 이미 주입되었거나, BottomSheet가 보이지 않으면 실행하지 않음
    if (isInitialized || !isShowBottomsheet) return;

    const addGoogleTranslateScript = document.createElement('script');
    addGoogleTranslateScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addGoogleTranslateScript.async = true;
    document.body.appendChild(addGoogleTranslateScript);

    window.googleTranslateElementInit = () => {
      if (window.google) {
        const instance = new window.google.translate.TranslateElement(
          {
            pageLanguage: 'ko',
            autoDisplay: false,
          },
          'google_translate_element',
        );
        setTranslateElementInstance(instance);
      }
      // 초기화 완료 후 현재 언어 설정
      setCurrentLanguage(getCurrentLanguage());
      setIsInitialized(true); // 초기화 상태 업데이트
    };

    return () => {
      // 언마운트 시 스크립트와 위젯 관련 요소 제거
      const script = document.querySelector(
        'script[src*="translate.google.com"]',
      );
      if (script) {
        document.body.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
  }, [isShowBottomsheet, isInitialized]);

  useEffect(() => {
    // BottomSheet가 다시 열릴 때 현재 언어를 다시 확인
    if (isShowBottomsheet && isInitialized) {
      setCurrentLanguage(getCurrentLanguage());
    }
  }, [isShowBottomsheet, isInitialized]);

  const handleLanguageClick = async (langCode: string) => {
    if (isChanging) return;

    if (langCode === 'none') {
      setIsChanging(true);
      try {
        await revertToOriginal();
        setCurrentLanguage('ko');
        setIsShowBottomSheet(false);
      } catch (error) {
        console.error('언어 복원에 실패했습니다.', error);
      } finally {
        setIsChanging(false);
      }
      return;
    }

    if (langCode === currentLanguage) {
      setIsShowBottomSheet(false);
      return;
    }

    setIsChanging(true);
    try {
      await changeLanguage(langCode);
      setCurrentLanguage(langCode);
      setIsShowBottomSheet(false);
    } catch (error) {
      console.error('언어 변경에 실패했습니다.', error);
      // 사용자에게 에러 상황을 알리는 UI를 추가할 수도 있습니다.
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <BottomSheet
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
      isAvailableHidden={true}
    >
      {/* Google Translate 위젯을 위한 숨겨진 div */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <BottomSheet.Header title="언어 선택" />
      <BottomSheet.Content>
        <ul className="flex flex-col">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} className="relative">
              <button
                className="w-full text-left py-3 rounded-lg"
                onClick={() => handleLanguageClick(lang.code)}
                aria-label={`${lang.name}(으)로 언어 변경`}
                aria-pressed={lang.code === currentLanguage}
                disabled={isChanging || !isInitialized}
              >
                {lang.name}
              </button>
              {lang.code === currentLanguage && (
                <div className="absolute right-0 top-3">
                  <div className={`p-1 rounded-full bg-surface-base`}>
                    <Icon
                      icon={BottomSheetCheckIcon}
                      strokeColor="stroke-surface-invert"
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default LanguageBottomSheet;
