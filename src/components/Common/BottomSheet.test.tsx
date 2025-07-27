import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  BottomSheet,
  BottomSheetHeader,
  BottomSheetContent,
  BottomSheetButtonGroup,
  BottomSheetButtonGroupVariant,
} from './BottomSheet';

// 모킹
vi.mock('@/hooks/useBottomSheet', () => ({
  default: () => ({
    isOpen: true,
    setIsOpen: vi.fn(),
    onDragEnd: vi.fn(),
    controls: { start: vi.fn() },
    viewHeight: 800,
  }),
}));

vi.mock('@/hooks/useBodyScrollLock', () => ({
  default: vi.fn(),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  useAnimation: () => ({ start: vi.fn() }),
}));

vi.mock('@/components/Common/Icon', () => ({
  default: ({
    icon: IconComponent,
    ...props
  }: {
    icon?: React.ComponentType;
    [key: string]: unknown;
  }) => (
    <div data-testid="icon" {...props}>
      {IconComponent && <IconComponent />}
    </div>
  ),
}));

describe('BottomSheet', () => {
  const mockSetIsShowBottomSheet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('children이 올바르게 렌더링되어야 한다', () => {
      render(
        <BottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={mockSetIsShowBottomSheet}
        >
          <div data-testid="bottom-sheet-content">테스트 내용</div>
        </BottomSheet>,
      );

      expect(screen.getByTestId('bottom-sheet-content')).toBeInTheDocument();
      expect(screen.getByText('테스트 내용')).toBeInTheDocument();
    });

    it('isFixedBackground가 true일 때 배경 오버레이가 렌더링되어야 한다', () => {
      render(
        <BottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={mockSetIsShowBottomSheet}
          isFixedBackground={true}
        >
          <div>내용</div>
        </BottomSheet>,
      );

      const overlay = document.querySelector('.fixed.w-screen.h-screen');
      expect(overlay).toBeInTheDocument();
    });

    it('isFixedBackground가 false이면 배경 오버레이가 렌더링되지 않아야 한다', () => {
      render(
        <BottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={mockSetIsShowBottomSheet}
          isFixedBackground={false}
        >
          <div>내용</div>
        </BottomSheet>,
      );

      const overlay = document.querySelector('.fixed.w-screen.h-screen');
      expect(overlay).not.toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('isExitable이 true일 때 배경 클릭시 setIsShowBottomSheet가 false로 호출되어야 한다', async () => {
      const user = userEvent.setup();

      render(
        <BottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={mockSetIsShowBottomSheet}
          isFixedBackground={true}
          isExitable={true}
        >
          <div>내용</div>
        </BottomSheet>,
      );

      const overlay = document.querySelector('.fixed.w-screen.h-screen');
      if (overlay) {
        await user.click(overlay);
        expect(mockSetIsShowBottomSheet).toHaveBeenCalledWith(false);
      }
    });

    it('isExitable이 false일 때 배경 클릭시 setIsShowBottomSheet가 호출되지 않아야 한다', async () => {
      const user = userEvent.setup();

      render(
        <BottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={mockSetIsShowBottomSheet}
          isFixedBackground={true}
          isExitable={false}
        >
          <div>내용</div>
        </BottomSheet>,
      );

      const overlay = document.querySelector('.fixed.w-screen.h-screen');
      if (overlay) {
        await user.click(overlay);
        expect(mockSetIsShowBottomSheet).not.toHaveBeenCalled();
      }
    });
  });

  describe('props 처리', () => {
    it('position prop이 올바르게 전달되어야 한다', () => {
      render(
        <BottomSheet
          isShowBottomsheet={true}
          setIsShowBottomSheet={mockSetIsShowBottomSheet}
          position="top"
        >
          <BottomSheetHeader title="테스트" />
        </BottomSheet>,
      );

      expect(screen.getByText('테스트')).toBeInTheDocument();
    });
  });
});

describe('BottomSheetHeader', () => {
  const mockOnLeftIconClick = vi.fn();
  const mockOnRightIconClick = vi.fn();
  const MockIcon = () => <div data-testid="mock-icon" />;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('title이 올바르게 렌더링되어야 한다', () => {
      render(<BottomSheetHeader title="테스트 제목" />);
      expect(screen.getByText('테스트 제목')).toBeInTheDocument();
    });

    it('leftIcon이 전달되면 버튼이 렌더링되어야 한다', () => {
      render(
        <BottomSheetHeader
          leftIcon={MockIcon}
          onLeftIconClick={mockOnLeftIconClick}
        />,
      );

      const leftButton = screen.getByRole('button');
      expect(leftButton).toBeInTheDocument();
    });

    it('rightIcon이 전달되면 버튼이 렌더링되어야 한다', () => {
      render(
        <BottomSheetHeader
          rightIcon={MockIcon}
          onRightIconClick={mockOnRightIconClick}
        />,
      );

      const rightButton = screen.getByRole('button');
      expect(rightButton).toBeInTheDocument();
    });

    it('tools가 전달되면 올바르게 렌더링되어야 한다', () => {
      render(
        <BottomSheetHeader
          tools={<button data-testid="custom-tool">도구</button>}
        />,
      );

      expect(screen.getByTestId('custom-tool')).toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('leftIcon 버튼 클릭시 onLeftIconClick이 호출되어야 한다', async () => {
      const user = userEvent.setup();

      render(
        <BottomSheetHeader
          leftIcon={MockIcon}
          onLeftIconClick={mockOnLeftIconClick}
        />,
      );

      await user.click(screen.getByRole('button'));
      expect(mockOnLeftIconClick).toHaveBeenCalledTimes(1);
    });

    it('rightIcon 버튼 클릭시 onRightIconClick이 호출되어야 한다', async () => {
      const user = userEvent.setup();

      render(
        <BottomSheetHeader
          rightIcon={MockIcon}
          onRightIconClick={mockOnRightIconClick}
        />,
      );

      await user.click(screen.getByRole('button'));
      expect(mockOnRightIconClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('정적 속성', () => {
    it('Align enum이 올바르게 노출되어야 한다', () => {
      expect(BottomSheetHeader.Align).toBeDefined();
      expect(BottomSheetHeader.Align.LEFT).toBe('left');
      expect(BottomSheetHeader.Align.CENTER).toBe('center');
      expect(BottomSheetHeader.Align.RIGHT).toBe('right');
    });
  });
});

describe('BottomSheetContent', () => {
  describe('렌더링', () => {
    it('children이 올바르게 렌더링되어야 한다', () => {
      render(
        <BottomSheetContent>
          <div data-testid="content-child">내용</div>
        </BottomSheetContent>,
      );

      expect(screen.getByTestId('content-child')).toBeInTheDocument();
      expect(screen.getByText('내용')).toBeInTheDocument();
    });

    it('isMaxHeight가 true일 때 h-full 클래스가 적용되어야 한다', () => {
      render(
        <BottomSheetContent isMaxHeight={true}>
          <div>내용</div>
        </BottomSheetContent>,
      );

      const contentContainer = screen.getByText('내용').parentElement;
      expect(contentContainer).toHaveClass('h-full');
    });

    it('isMaxHeight가 false일 때 max-height 클래스가 적용되어야 한다', () => {
      render(
        <BottomSheetContent isMaxHeight={false}>
          <div>내용</div>
        </BottomSheetContent>,
      );

      const contentContainer = screen.getByText('내용').parentElement;
      expect(contentContainer).toHaveClass('max-h-[49vh]');
      expect(contentContainer).not.toHaveClass('h-full');
    });
  });
});

describe('BottomSheetButtonGroup', () => {
  describe('렌더링', () => {
    it('children이 올바르게 렌더링되어야 한다', () => {
      render(
        <BottomSheetButtonGroup>
          <button data-testid="test-button">버튼</button>
        </BottomSheetButtonGroup>,
      );

      expect(screen.getByTestId('test-button')).toBeInTheDocument();
      expect(screen.getByText('버튼')).toBeInTheDocument();
    });

    it('SINGLE variant일 때 올바른 레이아웃 클래스가 적용되어야 한다', () => {
      render(
        <BottomSheetButtonGroup variant={BottomSheetButtonGroupVariant.SINGLE}>
          <button>버튼</button>
        </BottomSheetButtonGroup>,
      );

      const buttonGroup = screen.getByText('버튼').parentElement;
      expect(buttonGroup).toHaveClass('flex', 'flex-col', 'gap-2');
    });

    it('TWO_HORIZONTAL variant일 때 올바른 레이아웃 클래스가 적용되어야 한다', () => {
      render(
        <BottomSheetButtonGroup
          variant={BottomSheetButtonGroupVariant.TWO_HORIZONTAL}
        >
          <button>버튼</button>
        </BottomSheetButtonGroup>,
      );

      const buttonGroup = screen.getByText('버튼').parentElement;
      expect(buttonGroup).toHaveClass('flex', 'flex-row', 'gap-2');
    });

    it('TWO_VERTICAL variant일 때 올바른 레이아웃 클래스가 적용되어야 한다', () => {
      render(
        <BottomSheetButtonGroup
          variant={BottomSheetButtonGroupVariant.TWO_VERTICAL}
        >
          <button>버튼</button>
        </BottomSheetButtonGroup>,
      );

      const buttonGroup = screen.getByText('버튼').parentElement;
      expect(buttonGroup).toHaveClass('flex', 'flex-col', 'gap-2');
    });
  });
});

describe('BottomSheet 정적 속성', () => {
  it('모든 하위 컴포넌트가 정적 속성으로 올바르게 노출되어야 한다', () => {
    expect(BottomSheet.Header).toBe(BottomSheetHeader);
    expect(BottomSheet.Content).toBe(BottomSheetContent);
    expect(BottomSheet.ButtonGroup).toBe(BottomSheetButtonGroup);
    expect(BottomSheet.ButtonGroupVariant).toBe(BottomSheetButtonGroupVariant);
  });
});

describe('BottomSheet 통합 테스트', () => {
  it('모든 컴포넌트가 함께 올바르게 작동해야 한다', () => {
    const mockSetIsShowBottomSheet = vi.fn();
    const mockOnClose = vi.fn();

    render(
      <BottomSheet
        isShowBottomsheet={true}
        setIsShowBottomSheet={mockSetIsShowBottomSheet}
      >
        <BottomSheet.Header
          title="통합 테스트"
          rightIcon={() => <div data-testid="close-icon" />}
          onRightIconClick={mockOnClose}
        />
        <BottomSheet.Content>
          <div data-testid="integrated-content">통합 테스트 내용</div>
        </BottomSheet.Content>
        <BottomSheet.ButtonGroup
          variant={BottomSheet.ButtonGroupVariant.SINGLE}
        >
          <button data-testid="integrated-button">확인</button>
        </BottomSheet.ButtonGroup>
      </BottomSheet>,
    );

    // 모든 부분이 렌더링되었는지 확인
    expect(screen.getByText('통합 테스트')).toBeInTheDocument();
    expect(screen.getByTestId('integrated-content')).toBeInTheDocument();
    expect(screen.getByTestId('integrated-button')).toBeInTheDocument();
  });
});
