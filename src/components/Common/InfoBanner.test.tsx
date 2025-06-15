import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import InfoBanner from './InfoBanner';
import { InfoBannerSize, InfoBannerState } from '@/types/common/infoBanner';

// 아이콘 컴포넌트 Mocking
vi.mock('@/assets/icons/InfoCircle.svg?react', () => ({
  default: () => <div data-testid="info-icon" />,
}));
vi.mock('@/assets/icons/Warning.svg?react', () => ({
  default: () => <div data-testid="warning-icon" />,
}));
vi.mock('@/assets/icons/BottomSheetCheckIcon.svg?react', () => ({
  default: () => <div data-testid="check-icon" />,
}));

describe('InfoBanner', () => {
  const defaultProps = {
    state: InfoBannerState.INFO,
    size: InfoBannerSize.MD,
    text: '테스트 메시지입니다.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('기본 텍스트를 올바르게 렌더링해야 한다', () => {
      render(<InfoBanner {...defaultProps} />);
      expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
    });

    it('props가 전달되지 않았을 때 기본값으로 렌더링되어야 한다', () => {
      render(
        <InfoBanner
          state={InfoBannerState.INFO}
          size={InfoBannerSize.MD}
          text="기본값 테스트"
        />,
      );

      const banner = screen.getByText('기본값 테스트').closest('section');

      // Default state: INFO
      expect(banner).toHaveClass('bg-neutral-100', 'text-text-normal');
      // Default size: MD
      expect(banner).toHaveClass('min-h-10', 'p-2', 'body-14-medium');
      // Default hasIcon: true
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
      // Default hasButton: false
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    describe.each([
      {
        state: InfoBannerState.INFO,
        expectedClasses: 'bg-neutral-100 text-text-normal',
        iconTestId: 'info-icon',
      },
      {
        state: InfoBannerState.NEGATIVE,
        expectedClasses: 'bg-status-red-100 text-status-red-400',
        iconTestId: 'warning-icon',
      },
      {
        state: InfoBannerState.POSITIVE,
        expectedClasses: 'bg-status-green-100 text-status-green-300',
        iconTestId: 'check-icon',
      },
      {
        state: InfoBannerState.SUCCESS,
        expectedClasses: 'bg-status-blue-100 text-status-blue-300',
        iconTestId: 'check-icon',
      },
    ])('state=$state', ({ state, expectedClasses, iconTestId }) => {
      it(`${state} 상태에 맞는 스타일과 아이콘을 렌더링해야 한다`, () => {
        render(<InfoBanner {...defaultProps} state={state} hasIcon />);
        const banner = screen.getByText(defaultProps.text).closest('section');

        expectedClasses.split(' ').forEach((className) => {
          expect(banner).toHaveClass(className);
        });
        expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
      });
    });

    describe.each([
      {
        size: InfoBannerSize.SM,
        expectedClasses: 'min-h-8 p-[0.375rem] caption-12-semibold',
      },
      {
        size: InfoBannerSize.MD,
        expectedClasses: 'min-h-10 p-2 body-14-medium',
      },
    ])('size=$size', ({ size, expectedClasses }) => {
      it(`${size} 사이즈에 맞는 스타일을 렌더링해야 한다`, () => {
        render(<InfoBanner {...defaultProps} size={size} />);
        const banner = screen.getByText(defaultProps.text).closest('section');

        expectedClasses.split(' ').forEach((className) => {
          expect(banner).toHaveClass(className);
        });
      });
    });
  });

  describe('상호작용', () => {
    it('버튼을 클릭하면 onClickButton 함수가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      const onClickButton = vi.fn();
      const buttonText = '클릭';

      render(
        <InfoBanner
          {...defaultProps}
          hasButton
          buttonText={buttonText}
          onClickButton={onClickButton}
        />,
      );

      const button = screen.getByRole('button', { name: buttonText });
      await user.click(button);

      expect(onClickButton).toHaveBeenCalledTimes(1);
    });
  });

  describe('조건부 렌더링', () => {
    it('hasIcon이 false일 때 아이콘을 렌더링하지 않아야 한다', () => {
      render(<InfoBanner {...defaultProps} hasIcon={false} />);
      expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('warning-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument();
    });

    it('hasButton이 false일 때 버튼을 렌더링하지 않아야 한다', () => {
      render(<InfoBanner {...defaultProps} hasButton={false} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('hasButton이 true일 때 버튼과 버튼 텍스트를 렌더링해야 한다', () => {
      const buttonText = '버튼';
      render(
        <InfoBanner {...defaultProps} hasButton buttonText={buttonText} />,
      );
      expect(
        screen.getByRole('button', { name: buttonText }),
      ).toBeInTheDocument();
    });
  });
});
