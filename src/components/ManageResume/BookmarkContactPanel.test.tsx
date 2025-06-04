import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import BookmarkContactPanel from './BookmarkContactPanel';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, useParams } from 'react-router-dom';
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
vi.mock('@/components/Common/Button', () => ({
  default: ({
    title,
    onClick,
    ...props
  }: {
    title: string;
    onClick: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} data-testid="contact-button" {...props}>
      {title}
    </button>
  ),
}));

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
    it('기본 구조가 올바르게 렌더링되어야 한다', () => {
      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      expect(screen.getByTestId('bottom-button-panel')).toBeInTheDocument();
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

    it('로그인되지 않은 사용자이거나 유학생 회원일 때 북마크 버튼이 표시되지 않아야 한다', () => {
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

    it('북마크되지 않은 상태일 때 빈 북마크 아이콘이 표시되어야 한다', () => {
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
      expect(
        screen.queryByTestId('bookmark-checked-icon'),
      ).not.toBeInTheDocument();
    });

    it('북마크된 상태일 때 채워진 북마크 아이콘이 표시되어야 한다', () => {
      render(
        <BookmarkContactPanel
          isBookmarked={true}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
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

    it('연락하기 버튼이 올바른 스타일과 속성을 가져야 한다', () => {
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
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveTextContent('연락하기');
    });
  });

  describe('스크랩 기능', () => {
    it('북마크 버튼 클릭 시 스크랩 API가 호출되어야 한다', async () => {
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
      }); // 아이콘 버튼
      await user.click(bookmarkButton);

      expect(mockMutate).toHaveBeenCalled();
    });

    it('북마크 상태가 토글되어야 한다', async () => {
      const user = userEvent.setup();
      render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        {
          wrapper: createWrapper(),
        },
      );

      // 초기 상태: 북마크되지 않음
      expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();

      const bookmarkButton = screen.getByRole('button', {
        name: 'BookmarkIcon',
      });
      await user.click(bookmarkButton);

      // 클릭 후: 북마크됨 (상태가 즉시 변경됨)
      await waitFor(() => {
        expect(screen.getByTestId('bookmark-checked-icon')).toBeInTheDocument();
      });
    });

    it('로그인하지 않은 사용자는 스크랩할 수 없어야 한다', async () => {
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

      // 따라서 스크랩 API도 호출되지 않음
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe('상태 관리', () => {
    it('isBookmarked prop 변경 시 북마크 상태가 업데이트되어야 한다', () => {
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
  });

  describe('에러 처리', () => {
    it('잘못된 ID 파라미터일 때 스크랩 API가 호출되지 않아야 한다', async () => {
      const user = userEvent.setup();

      // Mock useParams to return invalid ID
      vi.mocked(useParams).mockReturnValue({ id: 'invalid' });

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

      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe('레이아웃', () => {
    it('버튼들이 올바른 레이아웃으로 배치되어야 한다', () => {
      const { container } = render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        { wrapper: createWrapper() },
      );

      const footer = container.querySelector('footer.w-full.flex.gap-2.z-20');
      expect(footer).toBeInTheDocument();
    });

    it('북마크 버튼이 적절한 크기와 스타일을 가져야 한다', () => {
      const { container } = render(
        <BookmarkContactPanel
          isBookmarked={false}
          phoneNumber={mockPhoneNumber}
        />,
        { wrapper: createWrapper() },
      );

      const bookmarkButton = container.querySelector(
        'button.flex.justify-center.items-center.min-w-\\[3\\.25rem\\]',
      );
      expect(bookmarkButton).toBeInTheDocument();
    });
  });
});
