import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { patchResumePublic } from '@/api/resumes';
import { api } from '@/api';

// API 모킹
vi.mock('@/api', () => ({
  api: {
    patch: vi.fn(),
  },
}));

describe('Resumes API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 이력서 공개 설정 API 테스트
  describe('patchResumePublic', () => {
    it('이력서 공개 설정 API를 올바른 엔드포인트와 데이터로 호출해야 함', async () => {
      // Arrange
      const mockResponse = {
        data: {
          success: true,
          data: { is_public: true },
        },
      };
      (api.patch as unknown as Mock).mockResolvedValue(mockResponse);

      const requestData = { is_public: true };

      // Act
      const result = await patchResumePublic(requestData);

      // Assert
      expect(api.patch).toHaveBeenCalledWith(
        '/users/resumes/is-public',
        requestData,
      );
      expect(api.patch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse.data);
    });

    it('이력서를 비공개로 설정할 수 있어야 함', async () => {
      // Arrange
      const mockResponse = {
        data: {
          success: true,
          data: { is_public: false },
        },
      };
      (api.patch as unknown as Mock).mockResolvedValue(mockResponse);

      const requestData = { is_public: false };

      // Act
      const result = await patchResumePublic(requestData);

      // Assert
      expect(api.patch).toHaveBeenCalledWith(
        '/users/resumes/is-public',
        requestData,
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('API 호출 실패시 에러를 전파해야 함', async () => {
      // Arrange
      const mockError = new Error('API 호출 실패');
      (api.patch as unknown as Mock).mockRejectedValue(mockError);

      const requestData = { is_public: true };

      // Act & Assert
      await expect(patchResumePublic(requestData)).rejects.toThrow(
        'API 호출 실패',
      );
      expect(api.patch).toHaveBeenCalledWith(
        '/users/resumes/is-public',
        requestData,
      );
    });

    it('잘못된 데이터 타입으로 호출해도 API에 그대로 전달되어야 함', async () => {
      // Arrange
      const mockResponse = {
        data: {
          success: false,
          error: 'Invalid data type',
        },
      };
      (api.patch as unknown as Mock).mockResolvedValue(mockResponse);

      const invalidData = { is_public: 'invalid' as unknown as boolean };

      // Act
      const result = await patchResumePublic(invalidData);

      // Assert
      expect(api.patch).toHaveBeenCalledWith(
        '/users/resumes/is-public',
        invalidData,
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
