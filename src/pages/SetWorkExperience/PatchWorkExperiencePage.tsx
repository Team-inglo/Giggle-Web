import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import WorkExperiencePatch from '@/components/WorkExperience/WorkExperiencePatch';
import { buttonTypeKeys } from '@/constants/components';
import {
  useGetWorkExperience,
  usePatchWorkExperience,
} from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { WorkExperienctRequest } from '@/types/api/resumes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PatchWorkExperiencePage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { id } = useParams();

  // reset 버튼을 대비하여 초기 데이터를 저장하는 상태
  const [initialData, setInitialData] = useState<WorkExperienctRequest>({
    title: '',
    workplace: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const [workExperienceData, setWorkExperienceData] =
    useState<WorkExperienctRequest>(initialData);

  // 초기 값에서 수정된 내용이 있는지 확인
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: getWorkExperienceData } = useGetWorkExperience(id!);
  const { mutate } = usePatchWorkExperience();

  const handleSubmit = () => {
    // 모든 필드가 입력되었는지 확인
    if (Object.values(workExperienceData).every((value) => value === ''))
      return;

    // 날짜 형식 서버 데이터와 통일, optional 값은 "-"으로 전달
    const formattedData = {
      ...workExperienceData,
      start_date: workExperienceData.start_date
        ? workExperienceData.start_date.replace(/\//g, '-')
        : '',
      end_date: workExperienceData.end_date
        ? workExperienceData.end_date.replace(/\//g, '-')
        : '',
      description:
        workExperienceData.description === ''
          ? '-'
          : workExperienceData.description,
    };

    // API - 7.9 경력 수정하기
    mutate({ id: id!, workExperience: formattedData });
  };

  const handleReset = () => {
    // Reset 버튼 클릭 시 초기 데이터로 되돌리기
    setWorkExperienceData(initialData);
  };

  // 7.2 (유학생) 경력 상세 조회하기
  useEffect(() => {
    if (getWorkExperienceData) {
      const formattedData =
        getWorkExperienceData.data?.description === '-'
          ? { ...getWorkExperienceData.data, description: '' }
          : getWorkExperienceData.data;

      setWorkExperienceData(formattedData);
      setInitialData(formattedData);
    }
  }, [getWorkExperienceData]);

  useEffect(() => {
    // 편집 중인지 여부 확인
    if (workExperienceData == initialData) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [workExperienceData]);

  return (
    <div>
      <div className="mb-24">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={handleBackButtonClick}
          hasMenuButton={false}
          title="Introduction"
        />
        {/* input 영역 */}
        <WorkExperiencePatch
          workExperienceData={workExperienceData}
          setWorkExperienceData={setWorkExperienceData}
        />
      </div>
      <BottomButtonPanel>
        <div className="w-full flex gap-2 z-40">
          {/* 리셋 버튼 */}
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor="bg-[#F4F4F9]"
            fontColor="text-[#BDBDBD]"
            title="Reset"
            isBorder={false}
            onClick={handleReset}
          />
          {/* patch 버튼 */}
          <Button
            type={buttonTypeKeys.LARGE}
            bgColor={isEditing ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
            fontColor={isEditing ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
            title="Save"
            isBorder={false}
            onClick={isEditing ? handleSubmit : undefined}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default PatchWorkExperiencePage;
