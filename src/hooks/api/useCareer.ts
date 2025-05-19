import {
  getCareerDetail,
  getCareerDetailGuest,
  getCareerList,
  getCareerListGuest,
  putCareerBookmark,
} from '@/api/career';
import { GetCareerListReqType } from '@/types/api/career';
import {
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
      queryKey: ['career', 'guest', req],
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
    queryKey: ['career', 'guest', id],
    queryFn: () => getCareerDetailGuest(id),
    enabled: isEnabled,
  });
};

// 14.3 (유학생/고용주) 커리어 리스트 조회 - 무한 스크롤
export const useInfiniteGetCareerList = (
  req: GetCareerListReqType,
  isEnabled: boolean,
  is_book_marked: boolean = false,
) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['career', req],
      queryFn: ({ pageParam = 1 }) =>
        getCareerList(req, pageParam, is_book_marked),
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
    queryKey: ['career', 'detail', id],
    queryFn: () => getCareerDetail(id),
    enabled: isEnabled,
  });
};

// 14.6 (유학생) 커리어 북마크 추가/삭제 훅
export const usePutCareerBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putCareerBookmark,
    onError: (error) => {
      console.error('북마크 추가/삭제 실패', error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['career'],
      });
    },
    meta: { skipGlobalLoading: true },
  });
};
