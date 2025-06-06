import {
  deleteEducation,
  deleteEtcLanguageLevel,
  deleteIntroduction,
  deleteWorkExperience,
  getEducation,
  getEmployeeResumeList,
  getResume,
  getResumeDetail,
  getSearchSchools,
  getWorkExperience,
  getWorkPreference,
  patchEducation,
  patchEtcLanguageLevel,
  patchIntroduction,
  patchLanguagesLevel,
  patchResumePublic,
  patchWorkExperience,
  postEducation,
  postEtcLanguageLevel,
  postWorkExperience,
  putScrapResume,
  putWorkPreference,
} from '@/api/resumes';
import { RESTYPE } from '@/types/api/common';
import {
  AdditionalLanguageRequest,
  GetEmployeeResumeListReq,
  LanguagesLevelType,
  UserResumeDetailResponse,
} from '@/types/api/resumes';
import { WorkPreferenceType } from '@/types/postApply/resumeDetailItem';
import { smartNavigate } from '@/utils/application';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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
    enabled: !!id,
  });
};

// 7.11 (유학생) 언어 - TOPIK 레벨 수정하기
// 7.12 (유학생) 언어 - SOCIAL INTEGRATION PROGRAM 레벨 수정하기
// 7.13 (유학생) 언어 - SEJONG INSTITUTE 레벨 수정하기
export const usePatchLanguagesLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      type,
      level,
    }: {
      type: LanguagesLevelType;
      level: number;
    }) => patchLanguagesLevel({ type, level }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
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
      smartNavigate(navigate, '/profile/manage-resume');
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
      smartNavigate(navigate, '/profile/manage-resume');
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
      smartNavigate(navigate, '/profile/manage-resume');
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
      smartNavigate(navigate, '/profile/manage-resume');
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
      smartNavigate(navigate, '/profile/manage-resume');
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
      smartNavigate(navigate, '/profile/manage-resume');
    },
    onError: (error) => {
      console.error('학력 수정 실패', error);
    },
  });
};

// 7.14 (유학생) 언어 - ETC 수정하기
export const usePatchEtcLanguageLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: AdditionalLanguageRequest;
    }) => patchEtcLanguageLevel(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
    },
    onError: (error) => {
      console.error('기타 언어 수정 실패', error);
    },
  });
};

// 7.15 (유학생) 자기소개 삭제하기
export const useDeleteIntroduction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteIntroduction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
    },
    onError: (error) => {
      console.error('자기소개 삭제 실패', error);
    },
  });
};

// 7.16 (유학생) 경력 삭제하기
export const useDeleteWorkExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkExperience,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
    },
    onError: (error) => {
      console.error('경력 삭제 실패', error);
    },
  });
};

// 7.17 (유학생) 학력 삭제하기
export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
    },
    onError: (error) => {
      console.error('학력 삭제 실패', error);
    },
  });
};

// 7.18 (유학생) 언어 - ETC 삭제하기
export const useDeleteEtcLanguageLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEtcLanguageLevel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['resume'],
      });
    },
    onError: (error) => {
      console.error('ETC 삭제 실패', error);
    },
  });
};

// 7.21 (유학생) 희망 근로 조건 상세 조회하기
export const useGetWorkPreference = (isEnabled: boolean = true) => {
  return useQuery({
    queryKey: ['workPreference'],
    queryFn: getWorkPreference,
    enabled: isEnabled,
  });
};

// 7.22 (유학생) 희망 근로 조건 수정하기
export const usePutWorkPreference = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkPreferenceType) => putWorkPreference(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] });
      smartNavigate(navigate, '/profile/manage-resume', { forceSkip: true }); // 성공시 편집 페이지로 이동
    },
  });
};

// 7.23 (유학생) 이력서 공개 여부 수정하기
export const usePatchResumePublic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchResumePublic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] });
    },
  });
};

// 7.24 (고용주) 이력서 리스트 조회하기 훅
export const useInfiniteGetEmployeeResumeList = (
  req: GetEmployeeResumeListReq,
  isEnabled: boolean,
) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['resume', 'search', req],
      queryFn: ({ pageParam = 1 }) => getEmployeeResumeList(req, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.data.has_next ? allPage.length + 1 : undefined;
      },
      enabled: isEnabled,
      retry: 1,
    });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage: data?.pages[data?.pages.length - 1].data.has_next,
    isFetchingNextPage,
  };
};

// 7.25 (고용주) 이력서 상세 조회하기
export const useGetResumeDetail = (id: string, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['resume', 'detail', id],
    queryFn: () => getResumeDetail(id),
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

// 15.1 (고용주) 인재 스크랩 추가/삭제
export const usePutScrapResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putScrapResume,
    onMutate: async (resumeId) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: ['resume', 'detail', resumeId],
      });

      // 이전 데이터 백업
      const previousData = queryClient.getQueryData([
        'resume',
        'detail',
        resumeId,
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData(
        ['resume', 'detail', resumeId],
        (old: RESTYPE<UserResumeDetailResponse>) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              is_bookmarked: !old.data.is_bookmarked,
            },
          };
        },
      );

      return { previousData, resumeId };
    },
    onError: (_, __, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          ['resume', 'detail', context.resumeId],
          context.previousData,
        );
      }
    },
    meta: {
      skipGlobalLoading: true,
    },
    onSettled: (_, __, resumeId) => {
      // 성공/실패 관계없이 데이터 재fetch
      queryClient.invalidateQueries({
        queryKey: ['resume', 'detail', resumeId],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] });
    },
  });
};
