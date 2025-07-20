import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import BookmarkContactPanel from './BookmarkContactPanel';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUserStore } from '@/store/user';
import { usePutScrapResume } from '@/hooks/api/useResume';

// Mock sendReactNativeMessage
vi.mock('@/utils/reactNativeMessage', () => ({
  sendReactNativeMessage: vi.fn(),
}));

// Mock hooks and stores
vi.mock('@/store/user', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('@/hooks/api/useResume', () => ({
  usePutScrapResume: vi.fn(),
}));

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

// Mock components
vi.mock('@/components/Common/Button', () => {
  const MockButton = ({
    title,
    onClick,
    type,
    size,
    layout,
    isFullWidth,
    ...restProps
  }: {
    title: string;
    onClick: () => void;
    type?: string;
    size?: string;
    layout?: string;
    isFullWidth?: boolean;
    [key: string]: unknown;
  }) => (
    <button
      onClick={onClick}
      data-testid="contact-button"
      data-type={type}
      data-size={size}
      data-layout={layout}
      data-is-full-width={isFullWidth}
      {...restProps}
    >
      {title}
    </button>
  );

  // Button 컴포넌트의 정적 속성들 모킹
  MockButton.Type = {
    PRIMARY: 'primary',
    NEUTRAL: 'neutral',
    TERTIARY: 'tertiary',
    DISABLED: 'disabled',
    INACTIVE: 'inactive',
    BACK: 'back',
    CONTINUE: 'continue',
    SCRAP: 'scrap',
    LARGE: 'large',
    SMALL: 'small',
    APPLY: 'applyNow',
    SMALLAPPLY: 'smallApply',
  };

  MockButton.Size = {
    MD: 'md',
    LG: 'lg',
  };

  MockButton.Layout = {
    DEFAULT: 'default',
    SMALL_BUTTON: 'small-button',
    FLEX_BUTTON: 'flex-button',
  };

  return {
    default: MockButton,
  };
});

vi.mock('@/components/Common/BottomButtonPanel', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="bottom-button-panel">{children}</div>
  ),
}));

vi.mock('@/components/PostDetail/PostDetailConfirmBottomSheet', () => ({
  default: ({
    isShowBottomsheet,
    setIsShowBottomSheet,
  }: {
    isShowBottomsheet: boolean;
    setIsShowBottomSheet: (value: boolean) => void;
  }) =>
    isShowBottomsheet ? (
      <div data-testid="confirm-bottom-sheet">
        <button onClick={() => setIsShowBottomSheet(false)}>Close</button>
      </div>
    ) : null,
}));

vi.mock('@/components/Common/LoginBottomSheet', () => ({
  default: ({
    isShowBottomsheet,
    setIsShowBottomSheet,
  }: {
    isShowBottomsheet: boolean;
    setIsShowBottomSheet: (value: boolean) => void;
  }) =>
    isShowBottomsheet ? (
      <div data-testid="login-bottom-sheet">
        <button onClick={() => setIsShowBottomSheet(false)}>Close</button>
      </div>
    ) : null,
}));

// Mock Icons
vi.mock('@/assets/icons/BookmarkIcon.svg?react', () => ({
  default: () => <div data-testid="bookmark-icon">BookmarkIcon</div>,
}));

vi.mock('@/assets/icons/BookmarkCheckedIcon.svg?react', () => ({
  default: () => (
    <div data-testid="bookmark-checked-icon">BookmarkCheckedIcon</div>
  ),
}));

// Test utility function
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('BookmarkContactPanel', () => {
  const mockMutate = vi.fn();
  const mockPhoneNumber = '010-1234-5678';

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks using vi.mocked
    vi.mocked(useUserStore).mockReturnValue({ account_type: 'OWNER' });
    vi.mocked(usePutScrapResume).mockReturnValue({
      mutate: mockMutate,
      data: undefined,
      error: null,
      isError: false,
      isIdle: true,
      isPending: false,
      isSuccess: false,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      variables: undefined,
      context: undefined,
      submittedAt: 0,
      mutateAsync: vi.fn(),
      reset: vi.fn(),
      status: 'idle',
    } as ReturnType<typeof usePutScrapResume>);
  });

  describe('렌더링', () => {
    it('연락하기 버튼이 렌더링되어야 한다', () => {
      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      expect(screen.getByTestId('contact-button')).toBeInTheDocument();
      expect(screen.getByText('연락하기')).toBeInTheDocument();
    });

    it('로그인된 기업 회원일 때 북마크 버튼이 표시되어야 한다', () => {
      vi.mocked(useUserStore).mockReturnValue({ account_type: 'OWNER' });

      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
    });

    it('로그인되지 않은 사용자일 때 북마크 버튼이 표시되지 않아야 한다', () => {
      vi.mocked(useUserStore).mockReturnValue({ account_type: null });

      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      expect(screen.queryByTestId('bookmark-icon')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('bookmark-checked-icon'),
      ).not.toBeInTheDocument();
    });

    it('북마크 상태에 따라 올바른 아이콘이 표시되어야 한다', () => {
      const { rerender } = render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      // 북마크되지 않은 상태
      expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
      expect(
        screen.queryByTestId('bookmark-checked-icon'),
      ).not.toBeInTheDocument();

      // 북마크된 상태로 변경
      rerender(
        <BookmarkContactPanel
          isBookmarked={true}
          phoneNumber={mockPhoneNumber}
        />,
      );

      expect(screen.getByTestId('bookmark-checked-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('bookmark-icon')).not.toBeInTheDocument();
    });
  });

  describe('연락하기 기능', () => {
    it('연락하기 버튼 클릭 시 sendReactNativeMessage가 올바른 매개변수로 호출되어야 한다', async () => {
      const user = userEvent.setup();
      // ReactNativeWebView 환경을 시뮬레이션
      Object.defineProperty(window, 'ReactNativeWebView', {
        value: {},
        writable: true,
      });

      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      const contactButton = screen.getByTestId('contact-button');
      await user.click(contactButton);

      expect(sendReactNativeMessage).toHaveBeenCalledWith({
        type: 'SEND_MESSAGE_TO_USER',
        payload: '01012345678', // 하이픈이 제거된 전화번호
      });
    });
  });

  describe('북마크 기능', () => {
    it('북마크 버튼 클릭 시 API가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      vi.mocked(useUserStore).mockReturnValue({ account_type: 'OWNER' });

      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      const bookmarkButton = screen.getByRole('button', {
        name: 'BookmarkIcon',
      });
      await user.click(bookmarkButton);

      expect(mockMutate).toHaveBeenCalledWith('1');
    });

    it('props 변경 시 북마크 상태가 업데이트되어야 한다', () => {
      const { rerender } = render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        { wrapper: createWrapper() },
      );

      expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();

      rerender(
        <BookmarkContactPanel
          isBookmarked={true}
          phoneNumber={mockPhoneNumber}
        />,
      );

      expect(screen.getByTestId('bookmark-checked-icon')).toBeInTheDocument();
    });

    it('로그인하지 않은 사용자는 북마크 기능을 사용할 수 없어야 한다', () => {
      vi.mocked(useUserStore).mockReturnValue({ account_type: null });

      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      // 북마크 버튼이 표시되지 않음
      expect(screen.queryByTestId('bookmark-icon')).not.toBeInTheDocument();
      // API가 호출되지 않음
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });
});
