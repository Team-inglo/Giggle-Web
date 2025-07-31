import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SelectListItem from '@/components/Common/Select/SelectListItem';
import { ComponentType } from 'react';

// 모든 모킹을 최상단으로 이동 (호이스팅 보장)
vi.mock('@/assets/icons/BottomSheetCheckIcon.svg?react', () => ({
  default: () => <div data-testid="single-check-icon" />,
}));

vi.mock('@/assets/icons/CheckIconWithFill.svg?react', () => ({
  default: () => <div data-testid="multiple-check-icon" />,
}));

vi.mock('@/components/Common/Icon', () => {
  const MockIcon = ({
    icon: IconComponent,
    ...props
  }: {
    icon: ComponentType;
    [key: string]: unknown;
  }) => (
    <div data-testid="icon-wrapper" {...props}>
      <IconComponent />
    </div>
  );

  MockIcon.Size = {
    XSM: 'xsm',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  };

  return {
    default: MockIcon,
  };
});

vi.mock('@/components/Common/PressedOverlay', () => {
  const MockPressOverlay = ({ isPressed }: { isPressed: boolean }) =>
    isPressed ? <div data-testid="press-overlay" /> : null;

  MockPressOverlay.pressStrengthKeys = {
    EXTRA_STRONG: 'extra-strong',
    STRONG: 'strong',
    NORMAL: 'normal',
    LIGHT: 'light',
  };

  return {
    default: MockPressOverlay,
  };
});

vi.mock('@/hooks/usePress', () => ({
  usePress: () => ({
    isPressed: false,
    pressHandlers: {
      onMouseDown: vi.fn(),
      onMouseUp: vi.fn(),
      onTouchStart: vi.fn(),
      onTouchEnd: vi.fn(),
    },
  }),
}));

describe('SelectListItem', () => {
  const defaultProps = {
    selectionType: SelectListItem.SelectionType.SINGLE,
    title: '테스트 항목',
    isSelected: false,
    iconPosition: SelectListItem.IconPosition.RIGHT,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('기본 텍스트를 올바르게 렌더링해야 한다', () => {
      render(<SelectListItem {...defaultProps} />);
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    });

    it('button role과 tabIndex가 설정되어야 한다', () => {
      render(<SelectListItem {...defaultProps} />);
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('상호작용', () => {
    it('클릭 시 onClick 핸들러가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      const onClickMock = vi.fn();

      render(<SelectListItem {...defaultProps} onClick={onClickMock} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('SelectionType별 아이콘 렌더링', () => {
    it('SINGLE 타입일 때 적절한 아이콘을 렌더링해야 한다', () => {
      render(
        <SelectListItem
          {...defaultProps}
          selectionType={SelectListItem.SelectionType.SINGLE}
        />,
      );

      expect(screen.getByTestId('single-check-icon')).toBeInTheDocument();
      expect(
        screen.queryByTestId('multiple-check-icon'),
      ).not.toBeInTheDocument();
    });

    it('MULTIPLE 타입일 때 적절한 아이콘을 렌더링해야 한다', () => {
      render(
        <SelectListItem
          {...defaultProps}
          selectionType={SelectListItem.SelectionType.MULTIPLE}
        />,
      );

      expect(screen.getByTestId('multiple-check-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('single-check-icon')).not.toBeInTheDocument();
    });
  });

  describe('IconPosition별 아이콘 위치', () => {
    it('LEFT 위치일 때 텍스트 앞에 아이콘이 렌더링되어야 한다', () => {
      const { container } = render(
        <SelectListItem
          {...defaultProps}
          iconPosition={SelectListItem.IconPosition.LEFT}
        />,
      );

      const button = container.querySelector('[role="button"]');
      const children = Array.from(button?.children || []);

      // 첫 번째 자식이 아이콘 wrapper여야 함
      expect(children[0]).toHaveAttribute('data-testid', 'icon-wrapper');
      // 두 번째 자식이 텍스트(p 태그)여야 함
      expect(children[1].tagName).toBe('P');
    });

    it('RIGHT 위치일 때 텍스트 뒤에 아이콘이 렌더링되어야 한다', () => {
      const { container } = render(
        <SelectListItem
          {...defaultProps}
          iconPosition={SelectListItem.IconPosition.RIGHT}
        />,
      );

      const button = container.querySelector('[role="button"]');
      const children = Array.from(button?.children || []);

      // 첫 번째 자식이 텍스트(p 태그)여야 함
      expect(children[0].tagName).toBe('P');
      // 두 번째 자식이 아이콘 wrapper여야 함
      expect(children[1]).toHaveAttribute('data-testid', 'icon-wrapper');
    });
  });

  describe('조건부 텍스트 스타일링', () => {
    it('isAssistive=true이고 isSelected=false일 때 assistive 색상을 적용해야 한다', () => {
      render(
        <SelectListItem
          {...defaultProps}
          isAssistive={true}
          isSelected={false}
        />,
      );

      const text = screen.getByText(defaultProps.title);
      expect(text).toHaveClass('text-text-assistive');
    });

    it('isAssistive=true이지만 isSelected=true일 때 일반 색상을 적용해야 한다', () => {
      render(
        <SelectListItem
          {...defaultProps}
          isAssistive={true}
          isSelected={true}
        />,
      );

      const text = screen.getByText(defaultProps.title);
      expect(text).toHaveClass('text-text-strong');
      expect(text).not.toHaveClass('text-text-assistive');
    });

    it('isAssistive=false일 때 항상 일반 색상을 적용해야 한다', () => {
      render(
        <SelectListItem
          {...defaultProps}
          isAssistive={false}
          isSelected={false}
        />,
      );

      const text = screen.getByText(defaultProps.title);
      expect(text).toHaveClass('text-text-strong');
      expect(text).not.toHaveClass('text-text-assistive');
    });
  });

  describe('선택 상태에 따른 동작', () => {
    it('선택된 상태와 선택되지 않은 상태 모두에서 클릭이 동작해야 한다', async () => {
      const user = userEvent.setup();
      const onClickMock = vi.fn();

      // 선택되지 않은 상태에서 클릭
      const { rerender } = render(
        <SelectListItem
          {...defaultProps}
          isSelected={false}
          onClick={onClickMock}
        />,
      );

      await user.click(screen.getByRole('button'));
      expect(onClickMock).toHaveBeenCalledTimes(1);

      // 선택된 상태에서 클릭
      rerender(
        <SelectListItem
          {...defaultProps}
          isSelected={true}
          onClick={onClickMock}
        />,
      );

      await user.click(screen.getByRole('button'));
      expect(onClickMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('에지 케이스', () => {
    it('title이 빈 문자열이어도 렌더링되어야 한다', () => {
      render(<SelectListItem {...defaultProps} title="" />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('title이 매우 긴 텍스트여도 렌더링되어야 한다', () => {
      const longTitle = 'A'.repeat(100);
      render(<SelectListItem {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe('정적 속성', () => {
    it('SelectionType enum이 올바르게 export되어야 한다', () => {
      expect(SelectListItem.SelectionType.SINGLE).toBe('single');
      expect(SelectListItem.SelectionType.MULTIPLE).toBe('multiple');
    });

    it('IconPosition enum이 올바르게 export되어야 한다', () => {
      expect(SelectListItem.IconPosition.LEFT).toBe('left');
      expect(SelectListItem.IconPosition.RIGHT).toBe('right');
    });
  });
});
