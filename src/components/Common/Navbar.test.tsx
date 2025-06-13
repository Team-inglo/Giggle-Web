import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Navbar from '@/components/Common/Navbar';
import { UserType } from '@/constants/user';
import { SVGProps } from 'react';

// 사용자 유형별 모킹 데이터 생성
vi.mock('@/store/user', () => ({
  useUserStore: vi.fn(),
}));

const { mockUserRoutes, mockEmployerRoutes, mockGuestRoutes } = vi.hoisted(
  () => {
    const MockIcon = (props: SVGProps<SVGSVGElement>) => (
      <svg role="img" aria-label="icon" {...props} />
    );

    return {
      mockUserRoutes: [
        { path: '/', svg: MockIcon, label: 'Home' },
        { path: '/search', svg: MockIcon, label: 'Search' },
        { path: '/application', svg: MockIcon, label: 'Applicants' },
        { path: '/resume/scrapped', svg: MockIcon, label: 'Saved' },
        { path: '/profile', svg: MockIcon, label: 'Mypage' },
      ],
      mockEmployerRoutes: [
        { path: '/', svg: MockIcon, label: '홈' },
        { path: '/search', svg: MockIcon, label: '검색' },
        { path: '/employer/post', svg: MockIcon, label: '공고관리' },
        { path: '/employer/scrapped', svg: MockIcon, label: '스크랩' },
        { path: '/employer/profile', svg: MockIcon, label: '마이페이지' },
      ],
      mockGuestRoutes: [
        { path: '/', svg: MockIcon, label: 'Home' },
        { path: '/search', svg: MockIcon, label: 'Search' },
        { path: '/signin', svg: MockIcon, label: 'Applicants' },
        { path: '/signin', svg: MockIcon, label: 'Saved' },
        { path: '/signin', svg: MockIcon, label: 'Mypage' },
      ],
    };
  },
);

// 라우트 모킹 데이터 생성
vi.mock('@/constants/routes', () => ({
  userRoutes: mockUserRoutes,
  employerRoutes: mockEmployerRoutes,
  guestRoutes: mockGuestRoutes,
}));

const { useUserStore } = await import('@/store/user');

// 라우팅 컨텍스트와 위치 표시를 포함한 Navbar 렌더링
const TestRenderer = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div data-testid="location-display">{location.pathname}</div>
    </>
  );
};

const renderWithRouter = (initialRoute: string) => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <TestRenderer />
    </MemoryRouter>,
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 사용자 유형별 테스트(유학생)
  describe('when user type is USER', () => {
    beforeEach(() => {
      (useUserStore as unknown as Mock).mockReturnValue({
        account_type: UserType.USER,
      });
    });

    it('should display navigation items for users and highlight the active route', () => {
      // Arrange: 현재 위치한 라우트 설정
      const activeRoute = mockUserRoutes[0];
      renderWithRouter(activeRoute.path);

      // Assert: mockUserRoutes에 정의된 각 라우트 확인
      mockUserRoutes.forEach((route) => {
        const navButton = screen.getByRole('button', {
          name: `icon ${route.label}`,
        });
        expect(navButton).toBeInTheDocument();

        const icon = within(navButton).getByRole('img');
        const label = within(navButton).getByText(route.label);

        // Assert: 현재 위치한 라우트와 비교하여 클래스 이름 확인
        if (route.path === activeRoute.path) {
          expect(icon).toHaveClass('text-neutral-900');
          expect(label).toHaveClass('text-text-normal');
        } else {
          expect(icon).toHaveClass('text-neutral-400');
          expect(label).toHaveClass('text-text-alternative');
        }
      });
    });

    it('should navigate to the correct URL upon clicking a navigation item', async () => {
      // Arrange: 현재 위치한 라우트 설정
      const user = userEvent.setup();
      renderWithRouter('/');
      const targetRoute = mockUserRoutes[1]; // Navigate to 'Search' page

      // Act: 네비게이션 아이템 클릭
      const searchButton = screen.getByRole('button', {
        name: `icon ${targetRoute.label}`,
      });
      await user.click(searchButton);

      // Assert: 네비게이션 아이템 클릭 후 위치 표시 확인
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        targetRoute.path,
      );
    });
  });

  // 사용자 유형별 테스트(고용주)
  describe('when user type is OWNER', () => {
    beforeEach(() => {
      (useUserStore as unknown as Mock).mockReturnValue({
        account_type: UserType.OWNER,
      });
    });

    it('should display navigation items for employers and highlight the active route', () => {
      // Arrange: 현재 위치한 라우트 설정
      const activeRoute = mockEmployerRoutes[0];
      renderWithRouter(activeRoute.path);

      // Assert: mockEmployerRoutes에 정의된 각 라우트 확인
      mockEmployerRoutes.forEach((route) => {
        const navButton = screen.getByRole('button', {
          name: `icon ${route.label}`,
        });
        expect(navButton).toBeInTheDocument();

        const icon = within(navButton).getByRole('img');
        const label = within(navButton).getByText(route.label);

        if (route.path === activeRoute.path) {
          expect(icon).toHaveClass('text-neutral-900');
          expect(label).toHaveClass('text-text-normal');
        } else {
          expect(icon).toHaveClass('text-neutral-400');
          expect(label).toHaveClass('text-text-alternative');
        }
      });
    });
  });

  // 사용자 유형별 테스트(비회원)
  describe('when user is a GUEST', () => {
    beforeEach(() => {
      (useUserStore as unknown as Mock).mockReturnValue({
        account_type: undefined,
      });
    });

    it('should display navigation items for guests and highlight the active route', () => {
      // Arrange: 현재 위치한 라우트 설정
      const activeRoute = mockGuestRoutes[0];
      renderWithRouter(activeRoute.path);

      // Assert: mockGuestRoutes에 정의된 각 라우트 확인
      mockGuestRoutes.forEach((route) => {
        const navButton = screen.getAllByRole('button', {
          name: `icon ${route.label}`,
        })[0];
        expect(navButton).toBeInTheDocument();
        const icon = within(navButton).getByRole('img');
        const label = within(navButton).getByText(route.label);

        if (route.path === activeRoute.path) {
          expect(icon).toHaveClass('text-neutral-900');
          expect(label).toHaveClass('text-text-normal');
        } else {
          expect(icon).toHaveClass('text-neutral-400');
          expect(label).toHaveClass('text-text-alternative');
        }
      });
    });

    it('should navigate to the sign-in page for protected routes', async () => {
      // Arrange: 현재 위치한 라우트 설정
      const user = userEvent.setup();
      renderWithRouter('/');
      const targetRoute = mockGuestRoutes[2]; // 'Applicants' 비회원일 경우 로그인 페이지로 이동

      // Act: 네비게이션 아이템 클릭
      const applicantsButton = screen.getByRole('button', {
        name: `icon ${targetRoute.label}`,
      });
      await user.click(applicantsButton);

      // Assert: 네비게이션 아이템 클릭 후 위치 표시 확인
      expect(screen.getByTestId('location-display')).toHaveTextContent(
        targetRoute.path,
      );
    });
  });
});
