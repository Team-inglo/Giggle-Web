import {
  useGetWorkExperience,
  usePatchWorkExperience,
  usePostWorkExperience,
} from '@/hooks/api/useResume';
import useNavigateBack from '@/hooks/useNavigateBack';
import { WorkExperienceRequest } from '@/types/api/resumes';
import {
  isObjectEqual,
  workExperienceDataValidation,
} from '@/utils/editResume';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useWorkExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = useNavigateBack();

  const mode = useMemo(() => (id ? 'patch' : 'post'), [id]);

  const { mutate: postMutate } = usePostWorkExperience();
  const { mutate: patchMutate } = usePatchWorkExperience();

  const initialData = {
    title: '',
    workplace: '',
    start_date: '',
    end_date: '',
    description: '',
  };

  const [workExperienceData, setWorkExperienceData] =
    useState<WorkExperienceRequest>(initialData); // 현재 입력된 데이터
  const [initialPatchData, setInitialPatchData] =
    useState<WorkExperienceRequest>(initialData); // 초기 데이터

  const [isValid, setIsValid] = useState<boolean>(false); // 유효성 검사 결과

  const { data: getWorkExperienceData, isPending } = useGetWorkExperience(
    id || '',
  );

  // 경력 추가 핸들러
  const handleSubmit = () => {
    // 데이터 포맷팅
    const submitData =
      workExperienceData?.description === ''
        ? { ...workExperienceData, description: '-' }
        : workExperienceData;
    // 데이터 전송
    if (mode === 'post') {
      postMutate(submitData);
    } else {
      // 데이터 변경 여부 확인
      if (isObjectEqual(workExperienceData, initialPatchData)) {
        navigate('/profile/manage-resume');
        return;
      }
      // 데이터 전송
      patchMutate({ id: id!, workExperience: submitData });
    }
  };

  // 경력 초기화 핸들러
  const handleReset = () => {
    setWorkExperienceData(initialPatchData);
  };

  useEffect(() => {
    if (mode === 'patch' && getWorkExperienceData) {
      // 데이터 포맷팅
      const fetchedData = getWorkExperienceData.data;
      // 초기 데이터 설정
      const formattedData =
        fetchedData?.description === '-'
          ? { ...fetchedData, description: '' }
          : fetchedData;

      setWorkExperienceData(formattedData);
      setInitialPatchData(formattedData);
    }
  }, [getWorkExperienceData, mode]);

  useEffect(() => {
    // 유효성 검사 결과 설정
    const isDataValid = workExperienceDataValidation(workExperienceData);
    if (mode === 'post') {
      // 유효성 검사 결과 설정
      setIsValid(isDataValid);
    } else {
      const hasChanged = !isObjectEqual(workExperienceData, initialPatchData);
      // 유효성 검사 결과 설정
      setIsValid(isDataValid && hasChanged);
    }
  }, [workExperienceData, initialPatchData, mode]);

  const pageTitle =
    mode === 'post' ? 'Add Work Experience' : 'Modify Work Experience';

  return {
    mode,
    isPending,
    workExperienceData,
    setWorkExperienceData,
    isValid,
    pageTitle,
    handleBackButtonClick,
    handleSubmit,
    handleReset,
  };
};
