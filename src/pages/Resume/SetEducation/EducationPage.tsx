import { useState, useEffect, useMemo } from 'react';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import Button from '@/components/Common/Button';
import EducationForm from '@/components/SetEducation/EducationForm';
import { buttonTypeKeys } from '@/constants/components';
import useNavigateBack from '@/hooks/useNavigateBack';
import {
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
  isObjectEqual,
  transformToPatchEducation,
} from '@/utils/editResume';
import { EducationRequest } from '@/types/api/resumes';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { EducationLevelType } from '@/types/postApply/resumeDetailItem';
import { getMajorEnumFromEn } from '@/utils/resume';

const EducationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  // URL 패턴으로 mode 결정 (id가 있으면 patch, 없으면 post)
  const mode = useMemo(() => (id ? 'patch' : 'post'), [id]);

  // 각 모드별 API 훅 사용
  const { mutate: postMutate } = usePostEducation();
  const { mutate: patchMutate } = usePatchEducation();

  // 초기값
  const [educationData, setEducationData] =
    useState<PostEducationType>(InitialEducationData);

  // patch 모드일 때 필요한 상태
  const [initialData, setInitialData] = useState<PostEducationType>();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [schoolData, setSchoolData] = useState<SchoolSummary>();

  // API - 학력 저장/수정하기
  const handleSubmit = () => {
    if (mode === 'post') {
      // 유효성 검사
      if (!educationDataValidation(educationData)) return;
      // API - 7.6 학력 생성하기
      const formattedEducationData = {
        ...educationData,
        education_level: educationData.education_level as EducationLevelType,
        gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
        grade: educationData.grade ? Number(educationData.grade) : 0,
      };
      postMutate(formattedEducationData as EducationRequest);
    } else {
      // patch 모드
      const isUnchanged = isObjectEqual(educationData, initialData);
      if (isUnchanged) {
        //TODO: 이력서 페이지 리팩토링 후 이동 경로 수정
        navigate('/profile/edit-resume');
        return;
      }

      const formattedPatchData = {
        ...educationData,
        education_level: educationData.education_level as EducationLevelType,
        gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
        grade: educationData.grade ? Number(educationData.grade) : 0,
        major: getMajorEnumFromEn(educationData.major || '') || '',
      };
      patchMutate({
        id: id!,
        education: formattedPatchData as EducationRequest,
      });
    }
  };

  // patch 모드에서만 필요한 Reset 기능
  const handleReset = () => {
    if (initialData) setEducationData(initialData);
  };

  // patch 모드일 때만 데이터 가져오기
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
    setIsValid(educationDataValidation(educationData));
  }, [educationData]);

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
                  onClick={isValid ? handleSubmit : undefined}
                />
              </div>
            ) : (
              <Button
                type={buttonTypeKeys.LARGE}
                bgColor={
                  isValid ? 'bg-surface-primary' : 'bg-surface-secondary'
                }
                fontColor={isValid ? 'text-text-normal' : 'text-text-disabled'}
                title="Save"
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
