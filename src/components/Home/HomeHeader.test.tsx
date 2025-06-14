/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import HomeHeader from './HomeHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import React from 'react';
import { useUserStore } from '@/store/user';
import { useGetAlarms } from '@/hooks/api/useAlarm';

vi.mock('@/hooks/api/useAlarm');
vi.mock('@/store/user');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock Child Components
vi.mock('./LoginBottomSheet', () => ({
  default: ({ isShowBottomsheet }: { isShowBottomsheet: boolean }) =>
    isShowBottomsheet ? <div>로그인 바텀시트</div> : null,
}));

vi.mock('./LanguageBottomSheet', () => ({
  default: ({ isShowBottomsheet }: { isShowBottomsheet: boolean }) =>
    isShowBottomsheet ? <h2>언어 선택</h2> : null,
}));

const mockNavigate = vi.fn();
const mockUseGetAlarms = useGetAlarms as unknown as Mock;
const mockUseUserStore = useUserStore as unknown as Mock;

const customRender = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('HomeHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
  });

  describe('렌더링 및 핵심 UI', () => {
    it('로고와 네비게이션 아이콘들이 정상적으로 렌더링되어야 한다', () => {
      // Arrange
      mockUseUserStore.mockReturnValue({ account_type: 'user' });
      mockUseGetAlarms.mockReturnValue({ data: undefined });

      // Act
      customRender(<HomeHeader />);

      // Assert
      expect(
        screen.getByRole('button', { name: '언어 번역' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /알림/ })).toBeInTheDocument();
    });

    it('읽지 않은 알림이 있을 경우, 빨간 점이 표시되어야 한다', () => {
      // Arrange
      mockUseUserStore.mockReturnValue({ account_type: 'user' });
      mockUseGetAlarms.mockReturnValue({
        data: {
          success: true,
          data: {
            notification_list: [{ id: 1, is_read: false }],
          },
        },
      });

      // Act
      customRender(<HomeHeader />);

      // Assert
      const alarmButton = screen.getByRole('button', { name: /알림/ });
      // 빨간 점이 표시되어야 한다
      expect(alarmButton.querySelector('div')).toBeInTheDocument();
    });

    it('읽지 않은 알림이 없을 경우, 빨간 점이 표시되지 않아야 한다', () => {
      // Arrange
      mockUseUserStore.mockReturnValue({ account_type: 'user' });
      mockUseGetAlarms.mockReturnValue({
        data: {
          success: true,
          data: {
            notification_list: [{ id: 1, is_read: true }],
          },
        },
      });

      // Act
      customRender(<HomeHeader />);

      // Assert
      const alarmButton = screen.getByRole('button', { name: /알림/ });
      expect(alarmButton.querySelector('div')).not.toBeInTheDocument();
    });
  });

  describe('사용자 상호작용', () => {
    it('번역 아이콘을 클릭하면 언어 선택 바텀시트가 열려야 한다', async () => {
      // Arrange
      const user = userEvent.setup();
      mockUseUserStore.mockReturnValue({});
      mockUseGetAlarms.mockReturnValue({});
      customRender(<HomeHeader />);
      expect(screen.queryByText('언어 선택')).not.toBeInTheDocument();

      // Act
      const translateButton = screen.getByRole('button', { name: '언어 번역' });
      await user.click(translateButton);

      // Assert
      expect(await screen.findByText('언어 선택')).toBeInTheDocument();
    });

    describe('알림 아이콘 클릭', () => {
      it('로그인한 사용자가 클릭하면 /alarm 페이지로 이동해야 한다', async () => {
        // Arrange
        const user = userEvent.setup();
        mockUseUserStore.mockReturnValue({ account_type: 'user' });
        mockUseGetAlarms.mockReturnValue({});
        customRender(<HomeHeader />);

        // Act
        const alarmButton = screen.getByRole('button', { name: /알림/ });
        await user.click(alarmButton);

        // Assert
        expect(mockNavigate).toHaveBeenCalledWith('/alarm');
      });

      it('로그인하지 않은 사용자가 클릭하면 로그인 바텀시트가 열려야 한다', async () => {
        // Arrange
        const user = userEvent.setup();
        mockUseUserStore.mockReturnValue({ account_type: null });
        mockUseGetAlarms.mockReturnValue({});
        customRender(<HomeHeader />);
        expect(screen.queryByText('로그인 바텀시트')).not.toBeInTheDocument();

        // Act
        const alarmButton = screen.getByRole('button', { name: /알림/ });
        await user.click(alarmButton);

        // Assert
        expect(await screen.findByText('로그인 바텀시트')).toBeInTheDocument();
      });
    });
  });
});
