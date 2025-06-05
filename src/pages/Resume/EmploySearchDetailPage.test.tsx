import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import EmploySearchDetailPage from './EmploySearchDetailPage';
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { useGetApplicantResume } from '@/hooks/api/useResume';
import { ApplicantResumeResponse } from '@/types/api/resumes';

// Mock React Router
const mockNavigateBack = vi.fn();
vi.mock('@/hooks/useNavigateBack', () => ({
  default: () => mockNavigateBack,
}));

// Mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

// Mock API hooks
vi.mock('@/hooks/api/useResume', () => ({
  useGetApplicantResume: vi.fn(),
}));

// Mock components
vi.mock('@/components/Common/Header/BaseHeader', () => ({
  default: ({
    hasBackButton,
    onClickBackButton,
    title,
  }: {
    hasBackButton: boolean;
    onClickBackButton: () => void;
    title: string;
  }) => (
    <div data-testid="base-header">
      <h1>{title}</h1>
      {hasBackButton && (
        <button onClick={onClickBackButton} data-testid="back-button">
          뒤로가기
        </button>
      )}
    </div>
  ),
}));

vi.mock('@/components/PostApply/PostApplyResume', () => ({
  default: () => <div data-testid="post-apply-resume">PostApplyResume</div>,
}));

vi.mock('@/components/ManageResume/BookmarkContactPanel', () => ({
  default: ({
    isBookmarked,
    phoneNumber,
  }: {
    isBookmarked: boolean;
    phoneNumber: string;
  }) => (
    <div data-testid="bookmark-contact-panel">
      <button data-testid="bookmark-button">
        {isBookmarked ? '북마크됨' : '북마크'}
      </button>
      <button data-testid="contact-button">연락하기</button>
      <span data-testid="phone-number">{phoneNumber}</span>
    </div>
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

// Create a typed mock to access the mocked function
const mockUseGetApplicantResume = vi.mocked(useGetApplicantResume);

describe('EmploySearchDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock return value
    mockUseGetApplicantResume.mockReturnValue({
      data: {
        is_scraped: false,
        data: {
          personal_information: {
            phone_number: '010-1234-5678',
          },
        },
      },
      isLoading: false,
      error: null,
    } as UseQueryResult<ApplicantResumeResponse, Error>);
  });

  describe('렌더링', () => {
    it('페이지 기본 구조가 올바르게 렌더링되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByTestId('base-header')).toBeInTheDocument();
      expect(screen.getByText('이력서 조회')).toBeInTheDocument();
      expect(screen.getByTestId('post-apply-resume')).toBeInTheDocument();
      expect(screen.getByTestId('bookmark-contact-panel')).toBeInTheDocument();
    });

    it('헤더에 뒤로가기 버튼이 표시되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    it('BookmarkContactPanel의 기본 북마크 상태가 false로 설정되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByText('북마크')).toBeInTheDocument();
      expect(screen.queryByText('북마크됨')).not.toBeInTheDocument();
    });

    it('연락하기 버튼이 표시되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByTestId('contact-button')).toBeInTheDocument();
      expect(screen.getByText('연락하기')).toBeInTheDocument();
    });

    it('API에서 받은 전화번호가 BookmarkContactPanel에 전달되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByTestId('phone-number')).toHaveTextContent(
        '010-1234-5678',
      );
    });

    it('북마크 상태가 API 응답에 따라 올바르게 설정되어야 한다', () => {
      // 북마크된 상태로 모킹
      mockUseGetApplicantResume.mockReturnValue({
        data: {
          is_scraped: true,
          data: {
            personal_information: {
              phone_number: '010-1234-5678',
            },
          },
        },
        isLoading: false,
        error: null,
      } as UseQueryResult<ApplicantResumeResponse, Error>);

      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByText('북마크됨')).toBeInTheDocument();
      expect(screen.queryByText('북마크')).not.toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('뒤로가기 버튼 클릭 시 useNavigateBack이 호출되어야 한다', async () => {
      const user = userEvent.setup();
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      const backButton = screen.getByTestId('back-button');
      await user.click(backButton);

      expect(mockNavigateBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('API 연동', () => {
    it('useGetApplicantResume이 올바른 매개변수로 호출되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(mockUseGetApplicantResume).toHaveBeenCalledWith(1, true);
    });

    it('API 응답이 없을 때 기본값이 설정되어야 한다', () => {
      mockUseGetApplicantResume.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      } as UseQueryResult<ApplicantResumeResponse | null, Error>);

      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByTestId('phone-number')).toHaveTextContent('');
      expect(screen.getByText('북마크')).toBeInTheDocument();
    });

    it('전화번호 정보가 없을 때 빈 문자열이 전달되어야 한다', () => {
      mockUseGetApplicantResume.mockReturnValue({
        data: {
          is_scraped: false,
          data: {
            personal_information: {
              // phone_number가 없는 경우
            },
          },
        },
        isLoading: false,
        error: null,
      } as UseQueryResult<ApplicantResumeResponse, Error>);

      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      expect(screen.getByTestId('phone-number')).toHaveTextContent('');
    });
  });

  describe('접근성', () => {
    it('메인 콘텐츠 영역에 적절한 패딩이 적용되어야 한다', () => {
      const { container } = render(<EmploySearchDetailPage />, {
        wrapper: createWrapper(),
      });

      const mainContent = container.querySelector('.pb-28');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('레이아웃', () => {
    it('PostApplyResume이 메인 콘텐츠 영역에 렌더링되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      const postApplyResume = screen.getByTestId('post-apply-resume');
      expect(postApplyResume).toBeInTheDocument();
    });

    it('BookmarkContactPanel이 하단에 고정되어 렌더링되어야 한다', () => {
      render(<EmploySearchDetailPage />, { wrapper: createWrapper() });

      const bookmarkContactPanel = screen.getByTestId('bookmark-contact-panel');
      expect(bookmarkContactPanel).toBeInTheDocument();
    });
  });
});
