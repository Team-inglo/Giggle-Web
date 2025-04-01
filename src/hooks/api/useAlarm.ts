import { getAlarms, patchReadAlarm } from '@/api/alarm';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// 10.1 (유학생/고용주) 알림 조회 훅
export const useGetAlarms = (
  page: number,
  size: number,
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: ['alarm', page, size],
    queryFn: () => getAlarms(page, size),
    enabled: isEnabled,
  });
};

export const useInfiniteGetAlarms = (size: number) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['alarm', size],
      queryFn: ({ pageParam = 1 }) => getAlarms(pageParam, size),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage) => {
        return lastPage.data.has_next ? allPage.length + 1 : undefined;
      },
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

// 10.2 (유학생/고용주) 알림 읽음 상태 변경 훅
export const usePatchReadAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchReadAlarm,
    onError: async (error) => {
      await queryClient.invalidateQueries({
        queryKey: ['alarm'],
      });
      console.error('알림 읽음 상태 변경 실패', error);
    },
    meta: { skipGlobalLoading: true },
  });
};
