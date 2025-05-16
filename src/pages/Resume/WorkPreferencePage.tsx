import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import {
  usePatchWorkPreference,
  usePostWorkPreference,
  useGetWorkPreference,
} from '@/hooks/api/useResume';
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
import { EmploymentType, JobCategory } from '@/types/postCreate/postCreate';
import { WorkPreferenceType } from '@/types/postApply/resumeDetailItem';

const WorkPreferencePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleBackButtonClick = useNavigateBack();

  // location.state에서 isEdit 플래그 확인
  const isEdit = location.state?.isEdit === true;

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [isAreaSelectOpen, setIsAreaSelectOpen] = useState(false);
  const jobTypeRef = useRef<JobTypeSelectRef>(null);
  const industryRef = useRef<IndustrySelectRef>(null);

  // 근무 형태와 업직종의 유효성 검사 state
  const [validityState, setValidityState] = useState({
    jobType: false,
    industry: false,
  });

  // 기존 데이터 조회
  const { data: workPreferenceData, isSuccess } = useGetWorkPreference();

  // 기존 데이터가 있는 경우 초기 데이터 설정
  useEffect(() => {
    if (isEdit && isSuccess && workPreferenceData) {
      // 지역 데이터 변환
      const areas = workPreferenceData.areas.map(
        (area: {
          region_1depth_name: string;
          region_2depth_name: string | null;
          region_3depth_name: string | null;
        }) => {
          const parts = [];
          if (area.region_1depth_name) parts.push(area.region_1depth_name);
          if (area.region_2depth_name) parts.push(area.region_2depth_name);
          if (area.region_3depth_name) parts.push(area.region_3depth_name);
          return parts.join(' ');
        },
      );

      setSelectedAreas(areas);

      // jobType과 industry 초기값 설정은 다음 렌더링 사이클에서 처리
      setTimeout(() => {
        // 근무 형태 설정
        const jobTypeStrings = workPreferenceData.jobTypes.map(
          (jobType: EmploymentType) => jobType.toLowerCase(),
        );

        // 컴포넌트 내부 상태 업데이트
        const jobTypeSelectElement =
          document.querySelectorAll('[data-job-type]');
        jobTypeStrings.forEach((jobType: string) => {
          jobTypeSelectElement.forEach((element) => {
            if (element.textContent?.trim().toLowerCase() === jobType) {
              (element as HTMLElement).click();
            }
          });
        });

        // 업직종 설정
        const industrySelectElement =
          document.querySelectorAll('[data-industry]');
        workPreferenceData.industries.forEach((industry: JobCategory) => {
          industrySelectElement.forEach((element) => {
            if (element.getAttribute('data-industry-value') === industry) {
              (element as HTMLElement).click();
            }
          });
        });
      }, 0);
    }
  }, [isEdit, isSuccess, workPreferenceData]);

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
    if (areas) {
      setSelectedAreas(areas);
      setIsAreaSelectOpen(false);
      return;
    }
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
  const { mutate: patchMutate } = usePatchWorkPreference();
  const { mutate: postMutate } = usePostWorkPreference();

  // 저장 버튼 클릭 핸들러
  const handleSubmit = () => {
    if (!isFormValid) {
      // 변경사항이 없으면 이전 페이지로 이동
      navigate('/profile/edit-resume');
      return;
    }

    // 지역 데이터를 AreaType 배열로 변환
    const areas = selectedAreas.map((area) => {
      const parts = area.split(' ');
      return {
        region_1depth_name: parts[0] || '',
        region_2depth_name: parts[1] || null,
        region_3depth_name: parts[2] || null,
        region_4depth_name: null,
      };
    });

    // 문자열 배열을 EmploymentType 배열로 변환
    const jobTypes = (jobTypeRef.current?.getSelectedJobs() || []).map(
      (jobType) => jobType.toUpperCase() as EmploymentType,
    );

    // 데이터 형식 변환
    const requestData: WorkPreferenceType = {
      areas: areas,
      jobTypes: jobTypes,
      industries: industryRef.current?.getSelectedIndustries() || [],
    };

    // isEdit 플래그에 따라 적절한 API 호출
    if (isEdit) {
      patchMutate(requestData);
    } else {
      postMutate(requestData);
    }
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
            onValidityChange={updateValidity('industry')}
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
