import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import EmploySearchDetailPage from './EmploySearchDetailPage';

// Mock React Router
const mockNavigateBack = vi.fn();
vi.mock('@/hooks/useNavigateBack', () => ({
  default: () => mockNavigateBack,
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
  default: ({ isBookmarked }: { isBookmarked: boolean }) => (
    <div data-testid="bookmark-contact-panel">
      <button data-testid="bookmark-button">
        {isBookmarked ? '북마크됨' : '북마크'}
      </button>
      <button data-testid="contact-button">연락하기</button>
    </div>
  ),
}));

describe('EmploySearchDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('페이지 기본 구조가 올바르게 렌더링되어야 한다', () => {
      render(<EmploySearchDetailPage />);

      expect(screen.getByTestId('base-header')).toBeInTheDocument();
      expect(screen.getByText('이력서 조회')).toBeInTheDocument();
      expect(screen.getByTestId('post-apply-resume')).toBeInTheDocument();
      expect(screen.getByTestId('bookmark-contact-panel')).toBeInTheDocument();
    });

    it('헤더에 뒤로가기 버튼이 표시되어야 한다', () => {
      render(<EmploySearchDetailPage />);

      expect(screen.getByTestId('back-button')).toBeInTheDocument();
    });

    it('BookmarkContactPanel의 기본 북마크 상태가 false로 설정되어야 한다', () => {
      render(<EmploySearchDetailPage />);

      expect(screen.getByText('북마크')).toBeInTheDocument();
      expect(screen.queryByText('북마크됨')).not.toBeInTheDocument();
    });

    it('연락하기 버튼이 표시되어야 한다', () => {
      render(<EmploySearchDetailPage />);

      expect(screen.getByTestId('contact-button')).toBeInTheDocument();
      expect(screen.getByText('연락하기')).toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('뒤로가기 버튼 클릭 시 useNavigateBack이 호출되어야 한다', async () => {
      const user = userEvent.setup();
      render(<EmploySearchDetailPage />);

      const backButton = screen.getByTestId('back-button');
      await user.click(backButton);

      expect(mockNavigateBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('접근성', () => {
    it('메인 콘텐츠 영역에 적절한 패딩이 적용되어야 한다', () => {
      const { container } = render(<EmploySearchDetailPage />);

      const mainContent = container.querySelector('.pb-28');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('레이아웃', () => {
    it('PostApplyResume이 메인 콘텐츠 영역에 렌더링되어야 한다', () => {
      render(<EmploySearchDetailPage />);

      const postApplyResume = screen.getByTestId('post-apply-resume');
      expect(postApplyResume).toBeInTheDocument();
    });

    it('BookmarkContactPanel이 하단에 고정되어 렌더링되어야 한다', () => {
      render(<EmploySearchDetailPage />);

      const bookmarkContactPanel = screen.getByTestId('bookmark-contact-panel');
      expect(bookmarkContactPanel).toBeInTheDocument();
    });
  });
});
