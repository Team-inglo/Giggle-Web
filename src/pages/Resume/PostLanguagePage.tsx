import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Input from '@/components/Common/Input';
import PageTitle from '@/components/Common/PageTitle';
import EtcLanguageSection from '@/components/Language/EtcLanguageSection';
import EtcLevelSection from '@/components/Language/EtcLevelSection';
import { LanguageList } from '@/constants/language_data';
import { usePostEtcLanguageLevel } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { LanguageProficiencyLevel } from '@/types/api/resumes';
import { EtcLanguageData } from '@/types/manageResume/manageResume';
import { getLanguageProficiencyLevelEnumFromEn } from '@/utils/resume';
import { useState } from 'react';

// 초기 값
const initialLanguage = {
  id: 0,
  language: '',
  country_name: '',
  img_url: '',
};

const PostLanguagePage = () => {
  const handleBackButtonClick = useNavigateBack();

  const languageList = LanguageList;
  // 선택한 언어 상태 관리
  const [selectedLanguage, setSelectedLanguage] =
    useState<EtcLanguageData>(initialLanguage);
  // 언어 레벨 추가 step 으로 관리 (1: 언어 선택, 2: 레벨 선택)
  const [step, setStep] = useState(1);
  // 선택한 언어 레벨 상태 관리
  const [level, setLevel] = useState('');

  const { mutate } = usePostEtcLanguageLevel();
  const handleSubmit = () => {
    // API - 7.7 언어 - ETC 생성하기
    mutate({
      language_name: selectedLanguage.language,
      level: getLanguageProficiencyLevelEnumFromEn(
        level,
      ) as LanguageProficiencyLevel,
    });
  };

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Language"
      />
      <PageTitle title="Add Your Language Skills" />
      <div className="px-4 mb-32">
        {/* 1단계: 언어 선택 */}
        {step === 1 && (
          <EtcLanguageSection
            languageList={languageList}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            clearLevel={() => setLevel('')}
          />
        )}
        {/* 2단계: 레벨 선택 */}
        {step === 2 && (
          <>
            {/* 2단계에도 언어를 재설정할 수 있음 */}
            <div onClick={() => setStep(1)}>
              <Input
                inputType={Input.Type.SEARCH}
                placeholder="Search Language"
                value={selectedLanguage.language}
                onChange={() => {}}
                canDelete={false}
              />
            </div>
            <EtcLevelSection level={level} setLevel={setLevel} />
          </>
        )}
      </div>
      <BottomButtonPanel>
        {/* 1단계: 언어 선택 버튼 */}
        {step === 1 && (
          <Button
            size={Button.Size.LG}
            type={
              selectedLanguage.language
                ? Button.Type.PRIMARY
                : Button.Type.DISABLED
            }
            isFullWidth
            title="Select"
            onClick={() => setStep(2)}
          />
        )}
        {/* 2단계: submit 버튼(레벨 선택) */}
        {step === 2 && (
          <Button
            size={Button.Size.LG}
            type={level ? Button.Type.PRIMARY : Button.Type.DISABLED}
            isFullWidth
            title="Done"
            onClick={handleSubmit}
          />
        )}
      </BottomButtonPanel>
    </div>
  );
};

export default PostLanguagePage;
