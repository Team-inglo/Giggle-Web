import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePatchResumePublic } from '@/hooks/api/useResume';
import { patchResumePublic } from '@/api/resumes';
import { createElement, ReactNode } from 'react';

// API 모킹
vi.mock('@/api/resumes', () => ({
  patchResumePublic: vi.fn(),
}));

// 테스트용 QueryClient 생성
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// QueryClient Provider 래퍼
const createWrapper = () => {
  const queryClient = createQueryClient();
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useResume Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 7.23 (유학생) 이력서 공개 수정 훅 테스트
  describe('usePatchResumePublic', () => {
    it('이력서 공개 설정 mutation이 성공적으로 실행되어야 함', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: { is_public: true },
      };
      (patchResumePublic as unknown as Mock).mockResolvedValue(mockResponse);

      const wrapper = createWrapper();

      // Act
      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      // Assert
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isIdle).toBe(true);
      expect(result.current.isPending).toBe(false);
    });

    it('이력서를 공개로 설정하는 mutate 함수가 올바르게 동작해야 함', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: { is_public: true },
      };
      (patchResumePublic as unknown as Mock).mockResolvedValue(mockResponse);

      const wrapper = createWrapper();
      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      const requestData = { is_public: true };

      // Act
      result.current.mutate(requestData);

      // Assert
      await waitFor(() => {
        expect(patchResumePublic).toHaveBeenCalledWith(requestData);
        expect(patchResumePublic).toHaveBeenCalledTimes(1);
      });
    });

    it('이력서를 비공개로 설정하는 mutate 함수가 올바르게 동작해야 함', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: { is_public: false },
      };
      (patchResumePublic as unknown as Mock).mockResolvedValue(mockResponse);

      const wrapper = createWrapper();
      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      const requestData = { is_public: false };

      // Act
      result.current.mutate(requestData);

      // Assert
      await waitFor(() => {
        expect(patchResumePublic).toHaveBeenCalledWith(requestData);
        expect(patchResumePublic).toHaveBeenCalledTimes(1);
      });
    });

    it('mutation 성공시 이력서 쿼리가 무효화되어야 함', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: { is_public: true },
      };
      (patchResumePublic as unknown as Mock).mockResolvedValue(mockResponse);

      const queryClient = createQueryClient();
      const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

      const wrapper = ({ children }: { children: ReactNode }) =>
        createElement(QueryClientProvider, { client: queryClient }, children);

      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      const requestData = { is_public: true };

      // Act
      result.current.mutate(requestData);

      // Assert
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      await waitFor(() => {
        expect(invalidateQueriesSpy).toHaveBeenCalledWith({
          queryKey: ['resume'],
        });
      });
    });

    it('mutation 실패시 에러 상태가 올바르게 설정되어야 함', async () => {
      // Arrange
      const mockError = new Error('이력서 공개 설정 실패');
      (patchResumePublic as unknown as Mock).mockRejectedValue(mockError);

      const wrapper = createWrapper();
      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      const requestData = { is_public: true };

      // Act
      result.current.mutate(requestData);

      // Assert
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(mockError);
      });
    });

    it('mutateAsync 함수가 올바르게 동작해야 함', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        data: { is_public: true },
      };
      (patchResumePublic as unknown as Mock).mockResolvedValue(mockResponse);

      const wrapper = createWrapper();
      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      const requestData = { is_public: true };

      // Act
      const response = await result.current.mutateAsync(requestData);

      // Assert
      expect(response).toEqual(mockResponse);
      expect(patchResumePublic).toHaveBeenCalledWith(requestData);
    });

    it('동시에 여러 번 호출해도 올바르게 처리되어야 함', async () => {
      // Arrange
      const mockResponse1 = {
        success: true,
        data: { is_public: true },
      };
      const mockResponse2 = {
        success: true,
        data: { is_public: false },
      };

      (patchResumePublic as unknown as Mock)
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const wrapper = createWrapper();
      const { result } = renderHook(() => usePatchResumePublic(), { wrapper });

      // Act
      const promise1 = result.current.mutateAsync({ is_public: true });
      const promise2 = result.current.mutateAsync({ is_public: false });

      // Assert
      const [response1, response2] = await Promise.all([promise1, promise2]);

      expect(response1).toEqual(mockResponse1);
      expect(response2).toEqual(mockResponse2);
      expect(patchResumePublic).toHaveBeenCalledTimes(2);
    });
  });
});
