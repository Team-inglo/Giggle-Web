import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import BottomSheetLayout from '../Common/BottomSheetLayout';
import { changeLanguage, getCurrentLanguage } from '@/utils/translate';
import Icon from '@/components/Common/Icon';
import BottomSheetCheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';

interface LanguageBottomSheetProps {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>;
}

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
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
    // 스크립트가 이미 주입되었거나, BottomSheet가 보이지 않으면 실행하지 않음
    if (isInitialized || !isShowBottomsheet) return;

    const addGoogleTranslateScript = document.createElement('script');
    addGoogleTranslateScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addGoogleTranslateScript.async = true;
    document.body.appendChild(addGoogleTranslateScript);

    window.googleTranslateElementInit = () => {
      if (window.google) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'ko',
            autoDisplay: false,
          },
          'google_translate_element',
        );
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
    if (langCode === currentLanguage || isChanging) {
      if (langCode === currentLanguage) setIsShowBottomSheet(false);
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
    <BottomSheetLayout
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
      isAvailableHidden={false}
    >
      {/* Google Translate 위젯을 위한 숨겨진 div */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <div className="flex flex-col px-1">
        <h2 className="py-3 head-3 text-text-strong heading-18-semibold">
          언어 선택
        </h2>
        <ul className="flex flex-col">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} className="relative">
              <button
                className="w-full text-left py-3 rounded-lg"
                onClick={() => handleLanguageClick(lang.code)}
                aria-label={`${lang.name}로 언어 변경`}
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
      </div>
    </BottomSheetLayout>
  );
};

export default LanguageBottomSheet;
