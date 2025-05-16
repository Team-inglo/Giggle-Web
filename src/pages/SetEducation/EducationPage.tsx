import { useState, useEffect, useMemo } from 'react';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import EducationForm from '@/components/SetEducation/EducationForm';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import {
  InitailEducationType,
  InitialEducationData,
  PostEducationType,
  SchoolSummary,
} from '@/types/postResume/postEducation';
import {
  usePostEducation,
  usePatchEducation,
  useGetEducation,
} from '@/hooks/api/useResume';
import {
  educationDataValidation,
  transformToPatchEducation,
} from '@/utils/editResume';
import { EducationRequest } from '@/types/api/resumes';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { EducationLevelType } from '@/types/postApply/resumeDetailItem';
import { EducationLevels } from '@/constants/manageResume';

const EducationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  // URL 패턴으로 mode 결정 (id가 있으면 patch, 없으면 post)
  const mode = useMemo(() => (id ? 'patch' : 'post'), [id]);

  // 각 모드별 API 훅 사용
  const { mutate: postMutate } = usePostEducation();
  const { mutate: patchMutate } = usePatchEducation();

  // 공통 상태 - mode에 따라 타입을 명확히 구분
  const [educationData, setEducationData] = useState<
    InitailEducationType | PostEducationType
  >(
    mode === 'post'
      ? InitialEducationData
      : {
          education_level: 'BACHELOR' as EducationLevelType,
          school_id: 0,
          major: '',
          gpa: 0,
          start_date: '',
          end_date: '',
          grade: 2,
        },
  );

  // patch 모드일 때 필요한 상태
  const [initialData, setInitialData] = useState<PostEducationType>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [schoolData, setSchoolData] = useState<SchoolSummary>();

  // API - 학력 저장/수정하기
  const handleSubmit = () => {
    if (mode === 'post') {
      // 유효성 검사
      if (!educationDataValidation(educationData as InitailEducationType))
        return;
      // API - 7.6 학력 생성하기
      const formattedEducationData = {
        ...educationData,
        gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
        grade: educationData.grade ? Number(educationData.grade) : 0,
      };
      postMutate(formattedEducationData as EducationRequest);
    } else {
      // patch 모드
      if (educationData === initialData) navigate('/profile/edit-resume');
      else
        patchMutate({ id: id!, education: educationData as PostEducationType });
    }
  };

  // patch 모드에서만 필요한 Reset 기능
  const handleReset = () => {
    if (initialData) setEducationData(initialData);
  };

  // patch 모드일 때만 데이터 가져오기
  // useGetEducation 훅은 내부에 enabled: !!id 옵션이 있음
  const { data: getEducationData } = useGetEducation(id || '');

  useEffect(() => {
    if (mode === 'patch' && getEducationData) {
      // patch 타입 initialData 설정
      const transformedData = transformToPatchEducation(getEducationData.data);
      setInitialData(transformedData);
      setSchoolData(getEducationData.data.school);
    }
  }, [getEducationData, mode]);

  // initialData가 설정된 후에 educationData를 설정 (patch 모드)
  useEffect(() => {
    if (mode === 'patch' && initialData) {
      setEducationData(initialData);
    }
  }, [initialData, mode]);

  // 유효성 검사
  useEffect(() => {
    if (mode === 'post') {
      setIsValid(
        educationDataValidation(educationData as InitailEducationType),
      );
    } else {
      // patch 모드 유효성 검사
      const isValidEducationData = () => {
        return Object.entries(educationData).every(([key, value]) => {
          if (key === 'education_level')
            return EducationLevels.includes(value as EducationLevelType);
          else if (typeof value === 'string') return value.trim().length > 0;
          else if (typeof value === 'number') return value >= 0;
          return false;
        });
      };
      setIsValid(isValidEducationData());
    }
  }, [educationData, mode]);

  return (
    <>
      {(mode === 'post' ||
        (mode === 'patch' && getEducationData?.data && initialData)) && (
        <>
          <div className="mb-24">
            <BaseHeader
              hasBackButton={true}
              onClickBackButton={handleBackButtonClick}
              hasMenuButton={false}
              title="Education"
            />
            <EducationForm
              mode={mode}
              educationData={educationData}
              setEducationData={setEducationData}
              initialSchool={schoolData}
            />
          </div>
          <BottomButtonPanel>
            {mode === 'patch' ? (
              <div className="w-full flex gap-2">
                <Button
                  type={buttonTypeKeys.LARGE}
                  bgColor="bg-surface-secondary"
                  fontColor="text-text-normal"
                  title="Reset"
                  isBorder={false}
                  onClick={isValid ? handleReset : undefined}
                />
                <Button
                  type={buttonTypeKeys.LARGE}
                  bgColor={
                    isValid ? 'bg-surface-primary' : 'bg-surface-secondary'
                  }
                  fontColor={
                    isValid ? 'text-text-normal' : 'text-text-disabled'
                  }
                  title="Save"
                  isBorder={false}
                  onClick={isValid ? handleSubmit : undefined}
                />
              </div>
            ) : (
              <Button
                type={buttonTypeKeys.LARGE}
                bgColor={isValid ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}
                fontColor={isValid ? 'text-[#1E1926]' : 'text-[#BDBDBD]'}
                title="Save"
                isBorder={false}
                onClick={isValid ? handleSubmit : undefined}
              />
            )}
          </BottomButtonPanel>
        </>
      )}
    </>
  );
};

export default EducationPage;
