import { Language } from '@/types/api/users';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useState } from 'react';
import Dropdown from '@/components/Common/Dropdown';
import { languageList } from '@/constants/information';
import Button from '@/components/Common/Button';
import PageTitle from '../Common/PageTitle';
import { signInputTranclation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation } from 'react-router-dom';
import InputLayout from '../WorkExperience/InputLayout';

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
          title={signInputTranclation.languageStepTitle[isEmployer(pathname)]}
          content={
            signInputTranclation.languageStepContent[isEmployer(pathname)]
          }
        />
      </div>
      <div className="w-full flex flex-col gap-[1.125rem] px-4">
        {/* 언어 선택 작성 */}
        <InputLayout title="Language">
          <Dropdown
            title="Language"
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
          type="large"
          bgColor={language === '' ? 'bg-[#F4F4F9]' : 'bg-[#fef387]'}
          fontColor={language === '' ? '' : 'text-[#222]'}
          title="Next"
          onClick={
            language === ''
              ? undefined
              : () => onNext(language.toUpperCase() as Language)
          }
        />
      </BottomButtonPanel>
    </div>
  );
};

export default LanguageStep;
