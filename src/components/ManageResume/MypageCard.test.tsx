import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  BrowserRouter,
  Location,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MypageCard from './MypageCard';
import { ManageResumeType } from '@/constants/manageResume';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { getKoreanAbilityLevel } from '@/utils/resume';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mocks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('@/store/user');
vi.mock('@/utils/resume');

vi.mock('@/components/ManageResume/WorkExperienceDetail', () => ({
  default: () => (
    <div data-testid="work-experience-detail">Work Experience Detail</div>
  ),
}));

describe('MypageCard', () => {
  const mockNavigate = vi.fn();
  const mockedUseUserStore = vi.mocked(useUserStore);
  const mockedUseLocation = vi.mocked(useLocation);
  const mockedUseNavigate = vi.mocked(useNavigate);
  const mockedGetKoreanAbilityLevel = vi.mocked(getKoreanAbilityLevel);

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

  beforeEach(() => {
    mockedUseNavigate.mockReturnValue(mockNavigate);
    mockedGetKoreanAbilityLevel.mockReturnValue({
      level: 4,
      label: '업무 능숙',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('USER role', () => {
    beforeEach(() => {
      mockedUseUserStore.mockReturnValue({ account_type: UserType.USER });
      mockedUseLocation.mockReturnValue({ pathname: '/resume' } as Location);
    });

    it('데이터가 없을 때 "Add" 버튼이 보여야 한다', () => {
      render(
        <MypageCard
          type={ManageResumeType.WORKEXPERIENCE}
          workExperienceData={[]}
        />,
        { wrapper: createWrapper() },
      );

      const addButton = screen.getByRole('button', {
        name: /Add Work Experience/i,
      });
      expect(addButton).toBeInTheDocument();
    });

    it('"Add" 버튼을 클릭하면 해당 경로로 이동해야 한다', async () => {
      const user = userEvent.setup();
      render(
        <MypageCard
          type={ManageResumeType.WORKEXPERIENCE}
          workExperienceData={[]}
        />,
        { wrapper: createWrapper() },
      );

      const addButton = screen.getByRole('button', {
        name: /Add Work Experience/i,
      });
      await user.click(addButton);

      expect(mockNavigate).toHaveBeenCalledWith('/resume/work-experience');
    });

    it('데이터가 있을 때 상세 정보 컴포넌트와 "Edit/Add" 버튼이 보여야 한다', () => {
      const mockWorkExperience = [
        {
          company_name: 'Test Corp',
          start_date: '2022-01-01',
          id: 1,
          title: 'Test',
          description: 'Test',
          duration: 1,
        },
      ];
      const editButton = <button>Edit</button>;

      render(
        <MypageCard
          type={ManageResumeType.WORKEXPERIENCE}
          workExperienceData={mockWorkExperience}
          rightElement={editButton}
        />,
        { wrapper: createWrapper() },
      );

      expect(screen.getByTestId('work-experience-detail')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /Add Work Experience/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Employer role (ko)', () => {
    beforeEach(() => {
      mockedUseUserStore.mockReturnValue({ account_type: 'OWNER' });
      mockedUseLocation.mockReturnValue({
        pathname: '/employer/search',
      } as Location);
    });

    it('데이터가 없을 때 "Add" 버튼이 보이지 않아야 한다', () => {
      render(
        <MypageCard
          type={ManageResumeType.WORKEXPERIENCE}
          workExperienceData={[]}
        />,
        { wrapper: createWrapper() },
      );

      expect(
        screen.queryByRole('button', { name: /Add Work Experience/i }),
      ).not.toBeInTheDocument();
    });

    it('데이터가 있을 때 상세 정보는 보이지만 "Edit" 버튼은 보이지 않아야 한다', () => {
      const mockWorkExperience = [
        {
          company_name: 'Test Corp',
          start_date: '2022-01-01',
          id: 1,
          title: 'Test',
          description: 'Test',
          duration: 1,
        },
      ];
      const editButton = <button>Edit</button>;

      render(
        <MypageCard
          type={ManageResumeType.WORKEXPERIENCE}
          workExperienceData={mockWorkExperience}
          rightElement={editButton}
        />,
        { wrapper: createWrapper() },
      );

      expect(screen.getByTestId('work-experience-detail')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /Edit/i }),
      ).not.toBeInTheDocument();
    });

    it('Language 카드일 때 Korean Ability Level이 보여야 한다', () => {
      const languageData = {
        topik: 4,
        social_integration: 0,
        sejong_institute: 0,
        etc: [],
      };
      render(
        <MypageCard
          type={ManageResumeType.LANGUAGE}
          languageData={languageData}
        />,
        { wrapper: createWrapper() },
      );

      expect(screen.getByText('업무 능숙')).toBeInTheDocument();
    });
  });
});
