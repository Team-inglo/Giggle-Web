import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createResumePublicResponse } from '@/__tests__/mocks/resume.mock';
import { patchResumePublic } from '@/api/resumes';
import { createElement, ReactNode } from 'react';
import ResumeProfileCard from '@/components/ManageResume/ResumeProfileCard';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { GenderType } from '@/constants/profile';

// API 모킹
vi.mock('@/api/resumes', () => ({
  patchResumePublic: vi.fn(),
}));

// 스토어 모킹
vi.mock('@/store/user', () => ({
  useUserStore: vi.fn(),
}));

// React Router 모킹
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    BrowserRouter: ({ children }: { children: ReactNode }) =>
      createElement('div', null, children),
  };
});

// ProfileImage 컴포넌트 모킹
vi.mock('@/components/Common/ProfileImage', () => ({
  default: ({ src, alt }: { src: string; alt: string }) =>
    createElement('img', { src, alt, 'data-testid': 'profile-image' }),
}));

// ToggleButton 컴포넌트 모킹
vi.mock('@/components/Common/ToggleButton', () => ({
  default: ({ isOn, onChange }: { isOn: boolean; onChange: () => void }) =>
    createElement('button', {
      'data-testid': 'toggle-button',
      onClick: onChange,
      'aria-pressed': isOn,
      children: isOn ? 'ON' : 'OFF',
    }),
}));

// 테스트 래퍼
const TestWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('ResumeProfileCard Public Setting Integration', () => {
  const user = userEvent.setup();

  // 기본 props
  const defaultProps = {
    profileImgUrl: 'https://example.com/profile.jpg',
    name: '김테스트',
    gender: GenderType.MALE,
    nationality: '한국',
    birth: '1995-01-01',
    main_address: '서울시 강남구',
    phone: '010-1234-5678',
    email: 'test@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // 기본적으로 USER 타입으로 설정
    vi.mocked(useUserStore).mockReturnValue({
      account_type: UserType.USER,
    });
  });

  it('공개 이력서에서 토글 버튼이 ON 상태로 표시되어야 함', async () => {
    // Given
    const props = { ...defaultProps, isPublic: true };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    // Then
    expect(screen.getByText('Make Resume Public')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-button')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByTestId('toggle-button')).toHaveTextContent('ON');
  });

  it('비공개 이력서에서 토글 버튼이 OFF 상태로 표시되어야 함', async () => {
    // Given
    const props = { ...defaultProps, isPublic: false };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    // Then
    expect(screen.getByText('Make Resume Public')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-button')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByTestId('toggle-button')).toHaveTextContent('OFF');
  });

  it('토글 버튼 클릭시 공개 설정이 변경되어야 함', async () => {
    // Given
    vi.mocked(patchResumePublic).mockResolvedValue(
      createResumePublicResponse(false),
    );

    const props = { ...defaultProps, isPublic: true };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton).toHaveTextContent('ON');

    // 토글 버튼 클릭
    await user.click(toggleButton);

    // Then
    expect(patchResumePublic).toHaveBeenCalledWith({ is_public: false });

    // 로컬 상태가 변경되어 UI가 업데이트됨
    await waitFor(() => {
      expect(toggleButton).toHaveTextContent('OFF');
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('비공개에서 공개로 토글시 올바른 API가 호출되어야 함', async () => {
    // Given
    vi.mocked(patchResumePublic).mockResolvedValue(
      createResumePublicResponse(true),
    );

    const props = { ...defaultProps, isPublic: false };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    const toggleButton = screen.getByTestId('toggle-button');
    expect(toggleButton).toHaveTextContent('OFF');

    // 토글 버튼 클릭
    await user.click(toggleButton);

    // Then
    expect(patchResumePublic).toHaveBeenCalledWith({ is_public: true });

    // 로컬 상태가 변경되어 UI가 업데이트됨
    await waitFor(() => {
      expect(toggleButton).toHaveTextContent('ON');
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('OWNER 타입 사용자에게는 토글 버튼이 표시되지 않아야 함', async () => {
    // Given
    vi.mocked(useUserStore).mockReturnValue({
      account_type: UserType.OWNER,
    });

    const props = { ...defaultProps, isPublic: true };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    // Then
    expect(screen.queryByText('Make Resume Public')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toggle-button')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('Edit Profile 버튼 클릭시 올바른 경로로 이동해야 함', async () => {
    // Given
    const props = { ...defaultProps, isPublic: true };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    const editButton = screen.getByText('Edit Profile');
    await user.click(editButton);

    // Then
    expect(mockNavigate).toHaveBeenCalledWith('/profile/edit');
  });

  it('사용자 정보가 올바르게 표시되어야 함', async () => {
    // Given
    const props = {
      ...defaultProps,
      name: '홍길동',
      nationality: 'south_korea',
      gender: GenderType.FEMALE,
      birth: '1990-05-15',
      main_address: '부산시 해운대구',
      phone: '010-9876-5432',
      email: 'hong@example.com',
      isPublic: true,
    };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    // Then
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('South Korea')).toBeInTheDocument();
    expect(screen.getByText('female')).toBeInTheDocument();
    expect(screen.getByText('1990-05-15')).toBeInTheDocument();
    expect(screen.getByText('부산시 해운대구')).toBeInTheDocument();
    expect(screen.getByText('010-9876-5432')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
  });

  it('프로필 이미지가 올바르게 렌더링되어야 함', async () => {
    // Given
    const props = {
      ...defaultProps,
      profileImgUrl: 'https://example.com/test-profile.jpg',
      isPublic: true,
    };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    // Then
    const profileImage = screen.getByTestId('profile-image');
    expect(profileImage).toHaveAttribute(
      'src',
      'https://example.com/test-profile.jpg',
    );
    expect(profileImage).toHaveAttribute('alt', 'profile');
  });

  it('선택적 필드가 없을 때도 올바르게 렌더링되어야 함', async () => {
    // Given
    const props = {
      profileImgUrl: 'https://example.com/profile.jpg',
      name: '김테스트',
      gender: GenderType.MALE,
      nationality: '',
      birth: '',
      main_address: '',
      phone: '',
      email: 'test@example.com',
      isPublic: true,
    };

    // When
    render(
      createElement(TestWrapper, null, createElement(ResumeProfileCard, props)),
    );

    // Then
    expect(screen.getByText('김테스트')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();

    // 빈 필드들은 표시되지 않아야 함
    expect(screen.queryByText('|')).not.toBeInTheDocument();
  });
});
