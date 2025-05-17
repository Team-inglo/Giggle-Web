import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EtcLanguageCard from '@/components/Language/EtcLanguageCard';
import EtcLanguageSection from '@/components/Language/EtcLanguageSection';
import EtcLevelSection from '@/components/Language/EtcLevelSection';
import { buttonTypeKeys } from '@/constants/components';
import { LanguageList } from '@/constants/language_data';
import { usePostEtcLanguageLevel } from '@/hooks/api/useResume';
import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 초기 값
const initialLanguage = {
  id: 0,
  language: '',
  country_name: '',
  img_url: '',
};

const PostLanguagePage = () => {
  const navigate = useNavigate();

  const languageList = LanguageList;
  // 선택한 언어 상태 관리
  const [selectedLanguage, setSelectedLanguage] =
    useState<EtcLanguageData>(initialLanguage);
  // 언어 레벨 추가 step 으로 관리 (1: 언어 선택, 2: 레벨 선택)
  const [step, setStep] = useState(1);
  // 선택한 언어 레벨 상태 관리
  const [level, setLevel] = useState(0);

  const { mutate } = usePostEtcLanguageLevel();
  const handleSubmit = () => {
    // API - 7.7 언어 - ETC 생성하기
    mutate({ language_name: selectedLanguage.language, level: level });
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/profile/edit-resume')}
        hasMenuButton={false}
        title="Add Language"
      />
      <div className="px-6 mb-32">
        <h1 className="pt-6 pb-12 head-1 text-[#1E1926]">Add Language</h1>
        {/* 1단계: 언어 선택 */}
        {step === 1 && (
          <EtcLanguageSection
            languageList={languageList}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        )}
        {/* 2단계: 레벨 선택 */}
        {step === 2 && (
          <>
            {/* 2단계에도 언어를 재설정할 수 있음 */}
            <div onClick={() => setStep(1)}>
              <EtcLanguageCard language={selectedLanguage} isSelected={false} />
            </div>
            <EtcLevelSection level={level} setLevel={setLevel} />
          </>
        )}
      </div>
      <BottomButtonPanel>
        {/* 1단계: 언어 선택 버튼 */}
        {step === 1 && (
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={selectedLanguage ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
            fontColor={selectedLanguage ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
            title="Select"
            isBorder={false}
            onClick={() => setStep(2)}
          />
        )}
        {/* 2단계: submit 버튼(레벨 선택) */}
        {step === 2 && (
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor="bg-[#FEF387]"
            fontColor="text-[#1E1926]"
            title="Done"
            isBorder={false}
            onClick={handleSubmit}
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default PostLanguagePage;
