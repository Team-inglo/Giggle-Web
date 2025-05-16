import { useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { usePatchWorkPreference } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import PageTitle from '@/components/Common/PageTitle';
import InputLayout from '@/components/WorkExperience/InputLayout';
import Dropdown from '@/components/Common/Dropdown';
import WorkPreferenceAreaSelect from '@/components/WorkPreference/WorkPreferenceAreaSelect';
import WorkPreferenceJobTypeSelect, {
  JobTypeSelectRef,
} from '@/components/WorkPreference/WorkPreferenceJobTypeSelect';
import WorkPreferenceIndustrySelect, {
  IndustrySelectRef,
} from '@/components/WorkPreference/WorkPreferenceIndustrySelect';
import Divider from '@/components/Common/Divider';
import Tag from '@/components/Common/Tag';

const WorkPreferencePage = () => {
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [isAreaSelectOpen, setIsAreaSelectOpen] = useState(false);
  const jobTypeRef = useRef<JobTypeSelectRef>(null);
  const industryRef = useRef<IndustrySelectRef>(null);

  // 근무 형태와 업직종의 유효성 검사 state
  const [validityState, setValidityState] = useState({
    jobType: false,
    industry: false,
  });

  // 근무 지역 포함 전체 유효성 계산
  const isFormValid = useMemo(() => {
    return (
      selectedAreas.length > 0 ||
      validityState.jobType ||
      validityState.industry
    );
  }, [selectedAreas, validityState]);

  // 근무 선호 사항 화면 <=> 지역 선택 화면
  const handleAreaSelectOpen = useCallback((areas?: string[]) => {
    console.log('handleAreaSelectOpen', areas);
    if (areas) {
      setSelectedAreas(areas);
      setIsAreaSelectOpen(false);
      return;
    }
    console.log('handleAreaSelectOpen');
    setIsAreaSelectOpen(true);
  }, []);

  // 상태 보고 패턴 핸들러
  const updateValidity = useCallback(
    (field: 'jobType' | 'industry') => (isValid: boolean) => {
      setValidityState((prev) => ({
        ...prev,
        [field]: isValid,
      }));
    },
    [],
  );

  // API 훅 사용
  const { mutate } = usePatchWorkPreference();

  // 저장 버튼 클릭 핸들러
  const handleSubmit = () => {
    if (!isFormValid) {
      // 변경사항이 없으면 이전 페이지로 이동
      navigate('/profile/edit-resume');
      return;
    }

    // 데이터 형식 변환
    const requestData = {
      preferred_work_type: jobTypeRef.current?.getSelectedJobs().join(', '),
      preferred_location: selectedAreas.join(', '),
      preferred_industries: industryRef.current
        ?.getSelectedIndustries()
        .join(', '),
    };

    mutate(requestData);
  };

  if (isAreaSelectOpen) {
    return (
      <WorkPreferenceAreaSelect
        selectedAreas={selectedAreas}
        onSelectAreas={setSelectedAreas}
        onClose={() => setIsAreaSelectOpen(false)}
      />
    );
  }

  return (
    <div>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Work Preferences"
      />
      <PageTitle
        title="Tell us what you're looking for 🎯"
        content="Set your work preferences to get better job matches!"
      />

      <div className="p-4 flex flex-col [&>*:last-child]:mb-24">
        <InputLayout
          title="Select one or multiple areas where you want to work"
          isEssential={false}
        >
          <div
            className="w-full flex flex-col gap-2"
            onClick={() => handleAreaSelectOpen()}
          >
            <Dropdown
              value={''}
              placeholder="Select Areas"
              options={[]}
              setValue={() => {}}
            />
            <div className="w-full flex flex-row flex-wrap gap-2">
              {selectedAreas.length > 0 &&
                selectedAreas.map((region, index) => (
                  <Tag
                    key={`${region}_${index}`}
                    value={region}
                    padding="py-[0.375rem] pr-[0.5rem] pl-[0.675rem]"
                    isRounded={true}
                    hasCheckIcon={false}
                    borderColor={'border-border-alternative'}
                    backgroundColor={'bg-surface-base'}
                    color="text-text-normal"
                    fontStyle="body-2"
                    onDelete={() =>
                      setSelectedAreas(
                        selectedAreas.filter((_, i) => i !== index),
                      )
                    }
                  />
                ))}
            </div>
          </div>
        </InputLayout>
        <Divider />
        <InputLayout
          title="What kind of job are you looking for?"
          isEssential={false}
        >
          <WorkPreferenceJobTypeSelect
            ref={jobTypeRef}
            onValidityChange={updateValidity('jobType')}
          />
        </InputLayout>
        <Divider />
        <InputLayout
          title="What kind of job are you looking for?"
          isEssential={false}
        >
          <WorkPreferenceIndustrySelect
            ref={industryRef}
            onValidityChange={updateValidity('jobType')}
          />
        </InputLayout>
      </div>

      <BottomButtonPanel>
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={isFormValid ? 'bg-surface-primary' : 'bg-surface-disabled'}
          fontColor={isFormValid ? 'text-text-strong' : 'text-text-disabled'}
          title="Save"
          isBorder={false}
          onClick={handleSubmit}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default WorkPreferencePage;
