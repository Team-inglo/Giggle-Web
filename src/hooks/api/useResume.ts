import {
  deleteEducation,
  deleteEtcLanguageLevel,
  deleteIntroduction,
  deleteWorkExperience,
  getApplicantResume,
  getEducation,
  getLanguagesSummaries,
  getResume,
  getSearchSchools,
  getWorkExperience,
  patchEducation,
  patchEtcLanguageLevel,
  patchIntroduction,
  patchLanguagesLevel,
  patchWorkExperience,
  postEducation,
  postEtcLanguageLevel,
  postWorkExperience,
} from '@/api/resumes';
import {
  AdditionalLanguageRequest,
  LanguagesLevelType,
} from '@/types/api/resumes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 7.1 (유학생/고용주) 이력서 조회하기
export const useGetResume = (isEnabled: boolean = true) => {
  return useQuery({
    queryKey: ['resume'],
    queryFn: getResume,
    enabled: isEnabled,
  });
};

// 7.2 경력 상세 조회하기
export const useGetWorkExperience = (id: string) => {
  return useQuery({
    queryKey: ['workExperience', id],
    queryFn: () => getWorkExperience(id),
  });
};

// 7.3 학력 상세 조회하기
export const useGetEducation = (id: string) => {
  return useQuery({
    queryKey: ['education', id],
    queryFn: () => getEducation(id),
  });
};

// 7.4 언어 요약 조회하기
export const useGetLanguagesSummaries = () => {
  return useQuery({
    queryKey: ['languagesSummaries'],
    queryFn: getLanguagesSummaries,
  });
};

// 7.11 (유학생) 언어 - TOPIK 레벨 수정하기
// 7.12 (유학생) 언어 - SOCIAL INTEGRATION PROGRAM 레벨 수정하기
// 7.13 (유학생) 언어 - SEJONG INSTITUTE 레벨 수정하기
export const usePatchLanguagesLevel = () => {
  return useMutation({
    mutationFn: ({
      type,
      level,
    }: {
      type: LanguagesLevelType;
      level: number;
    }) => patchLanguagesLevel({ type, level }),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('언어 레벨 수정 실패', error);
    },
  });
};

// 7.5 경력 생성하기
export const usePostWorkExperience = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postWorkExperience,
    onSuccess: () => {
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      console.error('경력 작성 실패', error);
    },
  });
};

// 7.6 학력 생성하기
export const usePostEducation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postEducation,
    onSuccess: () => {
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      console.error('학력 작성 실패', error);
    },
  });
};

// 7.7 언어 - ETC 생성하기
export const usePostEtcLanguageLevel = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postEtcLanguageLevel,
    onSuccess: () => {
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      alert('이미 존재하는 언어입니다');
      console.error('ETC 작성 실패', error);
    },
  });
};

// 7.8 (유학생) 자기소개 수정하기
export const usePatchIntroduction = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchIntroduction,
    onSuccess: () => {
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      console.error('자기소개 작성 실패', error);
    },
  });
};

// 7.9 (유학생) 경력 수정하기
export const usePatchWorkExperience = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchWorkExperience,
    onSuccess: () => {
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      console.error('경력 수정 실패', error);
    },
  });
};

// 7.10 (유학생) 학력 수정하기
export const usePatchEducation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchEducation,
    onSuccess: () => {
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      console.error('학력 수정 실패', error);
    },
  });
};

// 7.14 (유학생) 언어 - ETC 수정하기
export const usePatchEtcLanguageLevel = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: AdditionalLanguageRequest;
    }) => patchEtcLanguageLevel(id, data),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('기타 언어 수정 실패', error);
    },
  });
};

// 7.15 (유학생) 자기소개 삭제하기
export const useDeleteIntroduction = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: deleteIntroduction,
    onSuccess: () => {
      window.location.reload();
      navigate('/profile/edit-resume');
    },
    onError: (error) => {
      console.error('자기소개 삭제 실패', error);
    },
  });
};

// 7.16 (유학생) 경력 삭제하기
export const useDeleteWorkExperience = () => {
  return useMutation({
    mutationFn: deleteWorkExperience,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('경력 삭제 실패', error);
    },
  });
};

// 7.17 (유학생) 학력 삭제하기
export const useDeleteEducation = () => {
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('학력 삭제 실패', error);
    },
  });
};

// 7.18 (유학생) 언어 - ETC 삭제하기
export const useDeleteEtcLanguageLevel = () => {
  return useMutation({
    mutationFn: deleteEtcLanguageLevel,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      console.error('ETC 삭제 실패', error);
    },
  });
};

// 7.19 (고용주) 이력서 조회하기 훅
export const useGetApplicantResume = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['resume', id],
    queryFn: () => getApplicantResume(id),
    enabled: isEnabled,
  });
};

// 9.1 (유학생) 학교 검색하기
export const useGetSearchSchools = (
  search: string,
  page: number,
  size: number,
) => {
  return useQuery({
    queryKey: ['searchSchools', search, page, size],
    queryFn: () =>
      getSearchSchools({
        search,
        page: page.toString(),
        size: size.toString(),
      }),
    enabled: !!search, // 검색어가 있을 때만 쿼리 활성화
  });
};
