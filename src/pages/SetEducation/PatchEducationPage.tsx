import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EducationPatch from '@/components/SetEducation/EducationPatch';
import { buttonTypeKeys } from '@/constants/components';
import { EducationLevels } from '@/constants/manageResume';
import { useGetEducation, usePatchEducation } from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { EducationLevelType } from '@/types/postApply/resumeDetailItem';
import { PostEducationType } from '@/types/postResume/postEducation';
import { transformToPatchEducation } from '@/utils/editResume';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PatchEducationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  const { mutate } = usePatchEducation();

  // 수정할 학력 데이터
  const [educationData, setEducationData] = useState<PostEducationType>({
    education_level: 'BACHELOR',
    school_id: 0,
    major: '',
    gpa: 0,
    start_date: '',
    end_date: '',
    grade: 2,
  });

  // reset 버튼을 대비하여 patch form 의 초기 데이터를 저장하는 상태
  const [initialData, setInitialData] = useState<PostEducationType>();
  const [isValid, setIsValid] = useState<boolean>(false);

  // API - 7.10 학력 수정하기
  const handleSubmit = () => {
    if (educationData == initialData) navigate('/profile/edit-resume');
    else mutate({ id: id!, education: educationData });
  };

  const handleReset = () => {
    // Reset 버튼 클릭 시 초기 데이터로 되돌리기
    if (initialData) setEducationData(initialData);
  };

  // API - 7.3 학력 상세 조회하기
  const { data: getEducationData } = useGetEducation(id!);
  useEffect(() => {
    if (getEducationData) {
      // patch 타입 initialData 설정
      const transformedData = transformToPatchEducation(getEducationData.data);
      setInitialData(transformedData);
    }
  }, [getEducationData]);

  // initialData가 설정된 후에 educationData를 설정
  useEffect(() => {
    if (initialData) {
      setEducationData(initialData);
    }
  }, [initialData]);

  // 유효성 검사
  useEffect(() => {
    const isValidEducationData = () => {
      return Object.entries(educationData).every(([key, value]) => {
        if (key === 'education_level')
          return EducationLevels.includes(value as EducationLevelType);
        else if (typeof value === 'string') return value.trim().length > 0;
        else if (typeof value === 'number') return value >= 0;
        return false;
      });
    };
    setIsValid(isValidEducationData);
  }, [educationData]);

  return (
    <>
      {getEducationData?.data && initialData && (
        <>
          <div className="mb-24">
            <BaseHeader
              hasBackButton={true}
              onClickBackButton={handleBackButtonClick}
              hasMenuButton={false}
              title="Education"
            />
            <EducationPatch
              educationData={educationData}
              setEducationData={setEducationData}
              schoolData={getEducationData.data.school}
            />
          </div>
          <BottomButtonPanel>
            <div className="w-full flex gap-2">
              <Button
                type={buttonTypeKeys.LARGE}
                bgColor="bg-[#F4F4F9]"
                fontColor="text-[#BDBDBD]"
                title="Reset"
                isBorder={false}
                onClick={isValid ? handleReset : undefined}
              />
              <Button
                type={buttonTypeKeys.LARGE}
                bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
                fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
                title="Save"
                isBorder={false}
                onClick={isValid ? handleSubmit : undefined}
              />
            </div>
          </BottomButtonPanel>
        </>
      )}
    </>
  );
};

export default PatchEducationPage;
