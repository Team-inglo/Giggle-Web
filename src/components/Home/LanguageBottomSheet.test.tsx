/// <reference types="vitest/globals" />

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import LanguageBottomSheet from './LanguageBottomSheet';
import { changeLanguage, getCurrentLanguage } from '@/utils/translate';

vi.mock('@/utils/translate', () => ({
  changeLanguage: vi.fn(),
  getCurrentLanguage: vi.fn(),
}));

vi.mock('@/assets/icons/BottomSheetCheckIcon.svg?react', () => ({
  default: () => <div data-testid="check-icon" />,
}));

const mockChangeLanguage = changeLanguage as Mock;
const mockGetCurrentLanguage = getCurrentLanguage as Mock;

describe('LanguageBottomSheet', () => {
  let setIsShowBottomSheetMock: Mock;

  beforeEach(() => {
    setIsShowBottomSheetMock = vi.fn();
    mockChangeLanguage.mockResolvedValue(undefined); // 기본값 성공
    mockGetCurrentLanguage.mockReturnValue('ko'); // 기본값 한국어

    // 전역 google translate 환경 모킹
    window.google = {
      translate: {
        TranslateElement: vi.fn(),
      },
    };

    // 컴포넌트가 이 함수를 할당하므로, 스크립트의 콜백을 시뮬레이션하기 위해 호출 가능
    window.googleTranslateElementInit = () => {
      if (window.google) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'ko', autoDisplay: false },
          'google_translate_element',
        );
      }
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete window.google;
    delete window.googleTranslateElementInit;
  });

  describe('렌더링 및 초기화', () => {
    it('컴포넌트가 열리면 언어 목록이 표시되어야 하며, 버튼은 초기화 전까지 비활성화되어야 한다', () => {
      // Arrange & Act
      render(
        <LanguageBottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={setIsShowBottomSheetMock}
        />,
      );

      // Assert
      expect(screen.getByText('언어 선택')).toBeInTheDocument();
      const englishButton = screen.getByRole('button', {
        name: 'English로 언어 변경',
      });
      expect(englishButton).toBeInTheDocument();
      expect(englishButton).toBeDisabled();
    });

    it('Google Translate 스크립트가 초기화되면 버튼이 활성화되어야 한다', async () => {
      // Arrange
      render(
        <LanguageBottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={setIsShowBottomSheetMock}
        />,
      );
      const englishButton = screen.getByRole('button', {
        name: 'English로 언어 변경',
      });

      // Act: 스크립트 콜백 실행 시뮬레이션
      window.googleTranslateElementInit?.();

      // Assert
      await waitFor(() => {
        expect(englishButton).not.toBeDisabled();
      });
      expect(mockGetCurrentLanguage).toHaveBeenCalled();
    });
  });

  describe('언어 선택 및 상태 표시', () => {
    it('현재 선택된 언어에 체크 아이콘이 표시되어야 한다', async () => {
      // Arrange
      mockGetCurrentLanguage.mockReturnValue('en'); // 현재 선택된 언어: 영어
      render(
        <LanguageBottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={setIsShowBottomSheetMock}
        />,
      );

      // Act: Simulate initialization
      window.googleTranslateElementInit?.();

      // Assert
      const englishButton = await screen.findByRole('button', {
        name: 'English로 언어 변경',
      });
      const listItem = englishButton.closest('li');
      expect(listItem).not.toBeNull();
      const checkIcon = listItem
        ? listItem.querySelector('[data-testid="check-icon"]')
        : null;
      expect(checkIcon).toBeInTheDocument();
    });

    it('다른 언어를 선택하면 changeLanguage가 호출되고 바텀시트가 닫혀야 한다', async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <LanguageBottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={setIsShowBottomSheetMock}
        />,
      );
      window.googleTranslateElementInit?.(); // 초기화

      // Act
      const englishButton = await screen.findByRole('button', {
        name: 'English로 언어 변경',
      });
      await user.click(englishButton);

      // Assert
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
      await waitFor(() => {
        expect(setIsShowBottomSheetMock).toHaveBeenCalledWith(false);
      });
    });

    it('현재와 동일한 언어를 선택하면 바텀시트만 닫혀야 한다', async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <LanguageBottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={setIsShowBottomSheetMock}
        />,
      );
      window.googleTranslateElementInit?.(); // 초기화

      // Act
      const koreanButton = await screen.findByRole('button', {
        name: '한국어로 언어 변경',
      });
      await user.click(koreanButton);

      // Assert
      expect(mockChangeLanguage).not.toHaveBeenCalled();
      expect(setIsShowBottomSheetMock).toHaveBeenCalledWith(false);
    });
  });
});
