import { signInputTranslation } from '@/constants/translation';

export enum Language {
  KO = 'ko',
  EN = 'en',
}

type HelperLabelProps = {
  language: Language;
  emailError: string | null;
  emailVerifyStatus: string | null;
};

// Helper label 상태와 스타일을 정의하는 map
const getHelperLabel = (status: string, language: Language) => {
  switch (status) {
    case 'sent':
      return signInputTranslation.enterCode[language];
    case 'resent':
      return signInputTranslation.resentMessage[language];
    case 'verified':
      return signInputTranslation.successVerify[language];
    default:
      return '';
  }
};

// Helper label 렌더링 함수
const HelperLabel = ({
  language,
  emailError,
  emailVerifyStatus,
}: HelperLabelProps) => {
  // emailError가 있는 경우 우선 표시
  if (emailError) {
    return (
      <div className="w-full px-1 py-2">
        <p className="text-text-error caption-12-semibold">{emailError}</p>
      </div>
    );
  }

  // emailVerifyStatus에 해당하는 helper label 렌더링
  if (emailVerifyStatus) {
    return (
      <p className={`px-1 py-2 caption-12-semibold text-status-blue-300`}>
        {getHelperLabel(emailVerifyStatus, language)}
      </p>
    );
  }

  return null;
};

export default HelperLabel;
