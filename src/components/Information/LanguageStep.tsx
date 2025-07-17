import { Language } from '@/types/api/users';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useState } from 'react';
import Dropdown from '@/components/Common/Dropdown';
import { languageList } from '@/constants/information';
import Button from '@/components/Common/Button';
import PageTitle from '@/components/Common/PageTitle';
import { signInputTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';
import InputLayout from '@/components/WorkExperience/InputLayout';

type LanguageStepProps = {
  onNext: (language: Language) => void;
};

const LanguageStep = ({ onNext }: LanguageStepProps) => {
  const { pathname } = useLocation();
  const [language, setLanguage] = useState('English');
  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-row items-center justify-between">
        <PageTitle
          title={signInputTranslation.languageStepTitle[isEmployer(pathname)]}
          content={
            signInputTranslation.languageStepContent[isEmployer(pathname)]
          }
        />
      </div>
      <div className="w-full flex flex-col gap-[1.125rem] px-4">
        {/* 언어 선택 작성 */}
        <InputLayout title="Language">
          <Dropdown
            title="Select Language"
            value={language}
            placeholder="Select Language"
            options={languageList}
            setValue={(value: string) => setLanguage(value)}
          />
        </InputLayout>
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        <Button
          type={language === '' ? Button.Type.DISABLED : Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="Next"
          onClick={() => onNext(language.toUpperCase() as Language)}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default LanguageStep;
