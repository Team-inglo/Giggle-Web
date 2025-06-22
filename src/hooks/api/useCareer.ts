import {
  getCareerDetail,
  getCareerDetailGuest,
  getCareerList,
  getCareerListGuest,
  putCareerBookmark,
} from '@/api/career';
import {
  CareerDetailItemType,
  GetCareerListReqType,
  GetCareerListResponse,
} from '@/types/api/career';
import { RESTYPE } from '@/types/api/common';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// 14.1 (게스트) 커리어 리스트 조회 - 무한스크롤
export const useInfiniteGetCareerGuestList = (
  req: GetCareerListReqType,
  isEnabled: boolean,
) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['career', 'list', 'guest', req],
      queryFn: ({ pageParam = 1 }) => getCareerListGuest(req, pageParam),
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

// 14.2 (게스트) 커리어 상세 조회하기 훅
export const useGetCareerDetailGuest = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['career', 'detail', 'guest', id],
    queryFn: () => getCareerDetailGuest(id),
    enabled: isEnabled,
  });
};

// 14.3 (유학생/고용주) 커리어 리스트 조회 - 무한 스크롤
export const useInfiniteGetCareerList = (
  req: GetCareerListReqType,
  isEnabled: boolean,
) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['career', 'list', 'user', req],
      queryFn: ({ pageParam = 1 }) => getCareerList(req, pageParam), // 파라미터 단순화
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

// 14.4 (유학생/고용주) 커리어 상세 조회하기 훅
export const useGetCareerDetail = (id: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: ['career', 'detail', 'user', id],
    queryFn: () => getCareerDetail(id),
    enabled: isEnabled,
  });
};

// 14.6 (유학생) 커리어 북마크 추가/삭제 훅
export const usePutCareerBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putCareerBookmark,
    onMutate: async (careerId) => {
      // 1. 진행 중인 쿼리 취소
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ['career', 'detail', 'user', careerId],
        }),
        queryClient.cancelQueries({ queryKey: ['career', 'list', 'user'] }),
      ]);

      // 2. 이전 데이터 백업
      const previousDetail = queryClient.getQueryData([
        'career',
        'detail',
        'user',
        careerId,
      ]);
      const previousList = queryClient.getQueriesData<
        InfiniteData<GetCareerListResponse>
      >({
        queryKey: ['career', 'list', 'user'],
      });

      // 3. 상세 캐시 낙관적 업데이트
      queryClient.setQueryData(
        ['career', 'detail', 'user', careerId],
        (old: RESTYPE<CareerDetailItemType>) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              is_book_marked: !old.data.is_book_marked,
            },
          };
        },
      );

      // 4. 목록 캐시 낙관적 업데이트
      previousList.forEach(([queryKey, previousList]) => {
        if (!previousList) return;

        const newPages = previousList.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            career_list: page.data.career_list.map((career) =>
              career.id === careerId
                ? {
                    ...career,
                    is_book_marked: !career.is_book_marked,
                  }
                : career,
            ),
          },
        }));

        queryClient.setQueryData(queryKey, {
          ...previousList,
          pages: newPages,
        });
      });

      return { previousDetail, previousList, careerId };
    },
    onError: (_, __, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousDetail) {
        queryClient.setQueryData(
          ['career', 'detail', 'user', context.careerId],
          context.previousDetail,
        );
      }

      if (context?.previousList) {
        context.previousList.forEach(([queryKey, previousList]) => {
          queryClient.setQueryData(queryKey, previousList);
        });
      }
    },
    onSettled: (_, __, ___, context) => {
      // 성공/실패 관계없이 데이터 재fetch
      queryClient.invalidateQueries({
        queryKey: ['career', 'detail', 'user', context?.careerId],
      });
      queryClient.invalidateQueries({ queryKey: ['career', 'list', 'user'] });
    },
    meta: {
      skipGlobalLoading: true,
    },
  });
};
