import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import {
  useGetWorkPreference,
  usePutWorkPreference,
} from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import PageTitle from '@/components/Common/PageTitle';
import InputLayout from '@/components/WorkExperience/InputLayout';
import Dropdown from '@/components/Common/Dropdown';
import WorkPreferenceAreaSelect from '@/components/WorkPreference/WorkPreferenceAreaSelect';
import WorkPreferenceJobTypeSelect from '@/components/WorkPreference/WorkPreferenceJobTypeSelect';
import WorkPreferenceIndustrySelect from '@/components/WorkPreference/WorkPreferenceIndustrySelect';
import Divider from '@/components/Common/Divider';
import Tag from '@/components/Common/Tag';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import { EmploymentType, JobCategory } from '@/types/postCreate/postCreate';
import {
  convertApiAreasToStrings,
  prepareWorkPreferenceData,
} from '@/utils/editResume';

const WorkPreferencePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackButtonClick = useNavigateBack();

  // 수정 여부 확인
  const isEdit = location.state?.isEdit === true;

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [isAreaSelectOpen, setIsAreaSelectOpen] = useState(false);

  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<JobCategory[]>(
    [],
  );

  // 기존 데이터 조회
  const {
    data: workPreferenceData,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetWorkPreference(isEdit);

  // 로딩 상태 표시 여부
  const isShowLoading = isEdit && (isLoading || isFetching);

  // 기존 데이터가 있는 경우 초기 데이터 설정
  useEffect(() => {
    if (isEdit && isSuccess && workPreferenceData) {
      setSelectedAreas(convertApiAreasToStrings(workPreferenceData.areas));

      // 근무 형태 설정
      const jobTypeStrings = workPreferenceData.jobTypes.map(
        (jobType: EmploymentType) => jobType.toLowerCase(),
      );
      setSelectedJobTypes(jobTypeStrings);

      // 업직종 설정
      setSelectedIndustries(workPreferenceData.industries);
    }
  }, [isEdit, isSuccess, workPreferenceData]);

  // 폼 유효성 계산
  const isFormValid = useMemo(() => {
    return (
      selectedAreas.length > 0 ||
      selectedJobTypes.length > 0 ||
      selectedIndustries.length > 0
    );
  }, [
    selectedAreas.length,
    selectedJobTypes.length,
    selectedIndustries.length,
  ]);

  // 근무 선호 사항 화면 <=> 지역 선택 화면
  const handleAreaSelectOpen = useCallback((areas?: string[]) => {
    if (areas) {
      setSelectedAreas(areas);
      setIsAreaSelectOpen(false);
      return;
    }
    setIsAreaSelectOpen(true);
  }, []);

  // 직무 변경 핸들러
  const handleJobTypesChange = useCallback((jobTypes: string[]) => {
    setSelectedJobTypes(jobTypes);
  }, []);

  // 업직종 변경 핸들러
  const handleIndustriesChange = useCallback((industries: JobCategory[]) => {
    setSelectedIndustries(industries);
  }, []);

  // API 훅 사용
  const { mutate: putMutate } = usePutWorkPreference();

  // 저장 버튼 클릭 시
  const handleSubmit = () => {
    if (!isFormValid) {
      // 변경사항이 없으면 이전 페이지로 이동
      navigate('/profile/manage-resume');
      return;
    }

    const requestData = prepareWorkPreferenceData(
      selectedAreas,
      selectedJobTypes,
      selectedIndustries,
    );

    putMutate(requestData);
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
      {/* 로딩 오버레이 - 데이터 로딩 또는 저장 중일 때 표시 */}
      {isShowLoading && <LoadingOverLay />}

      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Work Preferences"
      />
      <PageTitle
        title={`Tell us what you're\nlooking for 🎯`}
        content="Set your work preferences to get better job matches!"
      />

      <div className="p-4 flex flex-col [&>*:last-child]:mb-24">
        <InputLayout
          title="Select one or multiple areas where you want to work"
          isEssential={false}
        >
          <div className="w-full flex flex-col gap-2">
            <div onClick={() => handleAreaSelectOpen()}>
              <Dropdown
                value={''}
                placeholder="Select Areas"
                options={[]}
                setValue={() => {}}
              />
            </div>
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
            selectedJobTypes={selectedJobTypes}
            onJobTypesChange={handleJobTypesChange}
          />
        </InputLayout>
        <Divider />
        <InputLayout title="What industries interest you?" isEssential={false}>
          <WorkPreferenceIndustrySelect
            selectedIndustries={selectedIndustries}
            onIndustriesChange={handleIndustriesChange}
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
