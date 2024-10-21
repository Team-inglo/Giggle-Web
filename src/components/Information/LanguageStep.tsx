import { Language, UserInfoRequestBody } from '@/types/api/users';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import { useState } from 'react';
import Dropdown from '../Common/Dropdown';
import { languageList } from '@/constants/information';
import Button from '../Common/Button';

type LanguageStepProps = {
  userInfo: UserInfoRequestBody;
  onNext: (newInfo: UserInfoRequestBody) => void;
};

const LanguageStep = ({ userInfo, onNext }: LanguageStepProps) => {
  const [language, setLanguage] = useState('English');
  return (
    <div className="w-full mx-auto">
      <div className="w-full flex flex-col gap-[1.125rem]">
        {/* 언어 선택 작성 */}
        <div className="w-full">
          <div className="w-full flex items-center justify-start body-3 color-[#222] px-[0.25rem] py-[0.375rem]">
            Visa Status
          </div>
          <Dropdown
            value={language}
            placeholder="Select Visa Status"
            options={languageList} // TODO: 비자 데이터 받으면 교체해야
            setValue={(value: string) => setLanguage(value)}
          />
        </div>
      </div>
      {/* 다음 step 이동 버튼 포함한 Bottom Panel */}
      <BottomButtonPanel>
        {language === '' ? (
          <Button
          type="large"
          bgColor="bg-[#F4F4F9]"
          fontColor=""
          isBorder={false}
          title="Next"
        />
        ) : (
          <Button
            type="large"
            bgColor="bg-[#fef387]"
            fontColor="text-[#222]"
            isBorder={false}
            title="Next"
            onClick={() =>
              onNext({
                ...userInfo,
                language: language.toUpperCase() as Language,
              })
            }
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default LanguageStep;
