import { render, screen } from '@/__tests__/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { useGetResumeProgress } from '@/hooks/api/useResume';
import { UserType } from '@/constants/user';
import ResumeHelperBanner from './ResumeHelperBanner';
import { Mock } from 'vitest';

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});
vi.mock('@/store/user');
vi.mock('@/hooks/api/useResume');

// Type casting mocks for intellisense
const mockedUseLocation = useLocation as Mock;
const mockedUseNavigate = useNavigate as Mock;
const mockedUseUserStore = useUserStore as unknown as Mock;
const mockedUseGetResumeProgress = useGetResumeProgress as Mock;

describe('ResumeHelperBanner', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseNavigate.mockReturnValue(mockNavigate);
  });

  describe('조건부 렌더링', () => {
    it('유학생 유저가 아닐 경우 렌더링되지 않아야 한다', () => {
      mockedUseUserStore.mockReturnValue({ account_type: UserType.OWNER });
      mockedUseGetResumeProgress.mockReturnValue({
        data: {
          data: { completion_rate: 50, completion_text: 'test' },
        },
        isLoading: false,
      });
      mockedUseLocation.mockReturnValue({ pathname: '/' });

      const { container } = render(<ResumeHelperBanner />);

      expect(container).toBeEmptyDOMElement();
    });

    it('이력서가 100% 완성된 경우 렌더링되지 않아야 한다', () => {
      mockedUseUserStore.mockReturnValue({ account_type: UserType.USER });
      mockedUseGetResumeProgress.mockReturnValue({
        data: {
          data: { completion_rate: 100, completion_text: 'test' },
        },
        isLoading: false,
      });
      mockedUseLocation.mockReturnValue({ pathname: '/' });

      const { container } = render(<ResumeHelperBanner />);

      expect(container).toBeEmptyDOMElement();
    });

    it('유학생 유저이고 이력서가 미완성인 경우 렌더링되어야 한다', () => {
      mockedUseUserStore.mockReturnValue({ account_type: UserType.USER });
      mockedUseGetResumeProgress.mockReturnValue({
        data: {
          data: { completion_rate: 80, completion_text: 'test' },
        },
        isLoading: false,
      });
      mockedUseLocation.mockReturnValue({ pathname: '/' });

      render(<ResumeHelperBanner />);

      expect(screen.getByText("Let's finish your resume")).toBeInTheDocument();
    });
  });

  describe('경로 기반 렌더링 및 상호작용', () => {
    beforeEach(() => {
      mockedUseUserStore.mockReturnValue({ account_type: UserType.USER });
      mockedUseGetResumeProgress.mockReturnValue({
        data: {
          data: { completion_rate: 60, completion_text: 'test' },
        },
        isLoading: false,
      });
    });

    describe("홈페이지('/')에 있을 때", () => {
      beforeEach(() => {
        mockedUseLocation.mockReturnValue({ pathname: '/' });
      });

      it('오른쪽 화살표 아이콘과 함께 렌더링되어야 한다', () => {
        render(<ResumeHelperBanner />);
        expect(
          screen.getByLabelText('go to manage resume page'),
        ).toBeInTheDocument();
      });

      it('배너를 클릭하면 이력서 관리 페이지(/profile/manage-resume)로 이동해야 한다', async () => {
        const user = userEvent.setup();
        render(<ResumeHelperBanner />);

        await user.click(screen.getByText("Let's finish your resume"));

        expect(mockNavigate).toHaveBeenCalledWith('/profile/manage-resume');
      });
    });

    describe("프로필 페이지('/profile')에 있을 때", () => {
      beforeEach(() => {
        mockedUseLocation.mockReturnValue({ pathname: '/profile' });
      });

      it('"Manage your Resume" 버튼을 렌더링해야 하며, 배너 클릭 시에는 이동하지 않아야 한다', async () => {
        const user = userEvent.setup();
        const { container } = render(<ResumeHelperBanner />);

        expect(
          screen.getByRole('button', { name: 'Manage your Resume' }),
        ).toBeInTheDocument();

        await user.click(container.firstChild! as Element);
        expect(mockNavigate).not.toHaveBeenCalled();
      });

      it('버튼을 클릭하면 이력서 관리 페이지(/profile/manage-resume)로 이동해야 한다', async () => {
        const user = userEvent.setup();
        render(<ResumeHelperBanner />);

        const button = screen.getByRole('button', {
          name: 'Manage your Resume',
        });
        await user.click(button);

        expect(mockNavigate).toHaveBeenCalledWith('/profile/manage-resume');
      });
    });

    describe("이력서 관리 페이지('/profile/manage-resume')에 있을 때", () => {
      beforeEach(() => {
        mockedUseLocation.mockReturnValue({
          pathname: '/profile/manage-resume',
        });
      });

      it('파란색 배경과 테두리 없이 렌더링되어야 한다', () => {
        const { container } = render(<ResumeHelperBanner />);

        const bannerElement = container.firstChild!;
        expect(bannerElement).toHaveClass('bg-blue-50');
        expect(bannerElement).not.toHaveClass('border rounded-xl');
      });

      it('우측 상단에 진행률 퍼센트를 표시해야 한다', () => {
        render(<ResumeHelperBanner />);

        const header = screen.getByText("Let's finish your resume")
          .parentElement?.parentElement;
        const percentageText = screen.getByText('60%');

        expect(header).toContainElement(percentageText);
      });
    });
  });
});
