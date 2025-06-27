import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  usePostEducation,
  usePatchEducation,
  useGetEducation,
} from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import {
  InitialEducationData,
  PostEducationType,
  SchoolSummary,
} from '@/types/postResume/postEducation';
import { EducationRequest } from '@/types/api/resumes';
import { EducationLevelType } from '@/types/postApply/resumeDetailItem';
import {
  educationDataValidation,
  isObjectEqual,
  transformToPatchEducation,
} from '@/utils/editResume';
import { getMajorEnumFromEn } from '@/utils/resume';

export const useEducation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  const mode = useMemo(() => (id ? 'patch' : 'post'), [id]);

  const { mutate: postMutate } = usePostEducation();
  const { mutate: patchMutate } = usePatchEducation();

  const [educationData, setEducationData] =
    useState<PostEducationType>(InitialEducationData); // 현재 입력된 데이터
  const [initialData, setInitialData] = useState<PostEducationType>(); // 초기 데이터
  const [isValid, setIsValid] = useState<boolean>(false); // 유효성 검사 결과
  const [schoolData, setSchoolData] = useState<SchoolSummary>(); // 학교 데이터

  const { data: getEducationData, isPending } = useGetEducation(id || '');

  // 학력 추가 핸들러
  const handlePost = () => {
    // 유효성 검사
    if (!educationDataValidation(educationData)) return;
    // 데이터 포맷팅
    const formattedEducationData = {
      ...educationData,
      education_level: educationData.education_level as EducationLevelType,
      gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
      grade: educationData.grade ? Number(educationData.grade) : 0,
    };
    // 데이터 전송
    postMutate(formattedEducationData as EducationRequest);
  };

  // 학력 수정 핸들러
  const handlePatch = () => {
    // 데이터 변경 여부 확인
    const isUnchanged = isObjectEqual(educationData, initialData);
    if (isUnchanged) {
      navigate('/profile/manage-resume');
      return;
    }
    // 데이터 포맷팅
    const formattedPatchData = {
      ...educationData,
      education_level: educationData.education_level as EducationLevelType,
      gpa: educationData.gpa ? parseFloat(String(educationData.gpa)) : 0,
      grade: educationData.grade ? Number(educationData.grade) : 0,
      major: getMajorEnumFromEn(educationData.major || '') || '',
    };
    // 데이터 전송
    patchMutate({
      id: id!,
      education: formattedPatchData as EducationRequest,
    });
  };

  const handleSubmit = () => {
    if (mode === 'post') {
      handlePost();
    } else {
      handlePatch();
    }
  };

  const handleReset = () => {
    if (initialData) setEducationData(initialData);
  };

  useEffect(() => {
    if (mode === 'patch' && getEducationData) {
      // 데이터 포맷팅
      const transformedData = transformToPatchEducation(getEducationData.data);
      // 초기 데이터 설정
      setInitialData(transformedData);
      // 학교 데이터 설정
      setSchoolData(getEducationData.data.school);
    }
  }, [getEducationData, mode]);

  useEffect(() => {
    if (mode === 'patch' && initialData) {
      // 초기 데이터 설정
      setEducationData(initialData);
    }
  }, [initialData, mode]);

  useEffect(() => {
    // 유효성 검사 결과 설정
    setIsValid(educationDataValidation(educationData));
  }, [educationData]);

  const pageTitle =
    mode === 'post'
      ? "Let's add your\neducation background! 🎓"
      : 'Modify Education';

  return {
    mode,
    isPending,
    educationData,
    setEducationData,
    initialData,
    schoolData,
    isValid,
    pageTitle,
    handleBackButtonClick,
    handleSubmit,
    handleReset,
  };
};
