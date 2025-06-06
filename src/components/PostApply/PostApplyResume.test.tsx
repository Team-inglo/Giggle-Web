import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PostApplyResume from './PostApplyResume';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { createMockResumeData } from '@/__tests__/mocks/resume.mock';

// Mock all hooks directly
const mockUseGetResume = vi.fn();
const mockUseGetApplicantResume = vi.fn();
const mockUseUserStore = vi.fn();
const mockUseCurrentApplicantIdStore = vi.fn();

vi.mock('@/hooks/api/useResume', () => ({
  useGetResume: () => mockUseGetResume(),
  useGetResumeDetail: () => mockUseGetApplicantResume(),
}));

vi.mock('@/store/user', () => ({
  useUserStore: () => mockUseUserStore(),
}));

vi.mock('@/store/url', () => ({
  useCurrentApplicantIdStore: () => mockUseCurrentApplicantIdStore(),
}));

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/resume/employer/search/1' }),
  };
});

// Mock components
vi.mock('@/components/ManageResume/ResumeProfileCard', () => ({
  default: ({
    name,
    nationality,
    gender,
    birth,
  }: {
    name: string;
    nationality?: string | null;
    gender?: string;
    birth?: string | null;
  }) => (
    <div data-testid="resume-profile-card">
      <h2>{name}</h2>
      <span data-testid="nationality">{nationality}</span>
      <span data-testid="gender">{gender}</span>
      <span data-testid="birth">{birth}</span>
    </div>
  ),
}));

vi.mock('@/components/ManageResume/MypageCard', () => ({
  default: ({
    type,
    introductionData,
    workExperienceData,
    educationData,
    languageData,
    workPreferencesData,
  }: {
    type: string;
    introductionData?: { title: string; content: string };
    workExperienceData?: Array<{ title: string }>;
    educationData?: Array<{ school_name: string }>;
    languageData?: {
      topik: number;
      social_integration: number;
      sejong_institute: number;
    };
    workPreferencesData?: { job_categories?: string[] };
  }) => (
    <div data-testid={`mypage-card-${type}`}>
      {introductionData && (
        <div data-testid="introduction-data">
          <h3>{introductionData.title}</h3>
          <p>{introductionData.content}</p>
        </div>
      )}
      {workExperienceData && (
        <div data-testid="work-experience-data">
          {workExperienceData.map((work, index) => (
            <div key={index}>{work.title}</div>
          ))}
        </div>
      )}
      {educationData && (
        <div data-testid="education-data">
          {educationData.map((edu, index) => (
            <div key={index}>{edu.school_name}</div>
          ))}
        </div>
      )}
      {languageData && (
        <div data-testid="language-data">
          <span data-testid="topik-level">TOPIK: {languageData.topik}</span>
          <span data-testid="kiip-level">
            KIIP: {languageData.social_integration}
          </span>
          <span data-testid="sejong-level">
            Sejong: {languageData.sejong_institute}
          </span>
        </div>
      )}
      {workPreferencesData && (
        <div data-testid="work-preferences-data">
          <span>{workPreferencesData.job_categories?.join(', ')}</span>
        </div>
      )}
    </div>
  ),
}));

vi.mock('@/components/ManageResume/InfoCard', () => ({
  default: () => <div data-testid="info-card">InfoCard</div>,
}));

vi.mock('@/components/Common/LoadingItem', () => ({
  LoadingItem: () => <div data-testid="loading-item">Loading...</div>,
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

describe('PostApplyResume', () => {
  const mockResumeData = createMockResumeData();

  beforeEach(() => {
    vi.clearAllMocks();

    // Set default returns
    mockUseUserStore.mockReturnValue({ account_type: 'OWNER' });
    mockUseCurrentApplicantIdStore.mockReturnValue({ currentApplicantId: '1' });
  });

  describe('렌더링', () => {
    it('로딩 중일 때 LoadingItem이 표시되어야 한다', () => {
      mockUseGetApplicantResume.mockReturnValue({
        data: null,
        isPending: true,
      });
      mockUseGetResume.mockReturnValue({
        data: null,
        isPending: false,
      });

      render(<PostApplyResume />, { wrapper: createWrapper() });

      expect(screen.getByTestId('loading-item')).toBeInTheDocument();
    });

    it('지원자 기본 정보가 올바르게 표시되어야 한다', () => {
      mockUseGetApplicantResume.mockReturnValue({
        data: mockResumeData,
        isPending: false,
      });
      mockUseGetResume.mockReturnValue({
        data: null,
        isPending: false,
      });

      render(<PostApplyResume />, { wrapper: createWrapper() });

      expect(screen.getByText(mockResumeData.data.name)).toBeInTheDocument();
      expect(screen.getByTestId('nationality')).toHaveTextContent(
        mockResumeData.data.personal_information.nationality || '',
      );
    });

    it('자기소개 정보가 올바르게 표시되어야 한다', () => {
      mockUseGetApplicantResume.mockReturnValue({
        data: mockResumeData,
        isPending: false,
      });
      mockUseGetResume.mockReturnValue({
        data: null,
        isPending: false,
      });

      render(<PostApplyResume />, { wrapper: createWrapper() });

      expect(
        screen.getByTestId('mypage-card-Introduction'),
      ).toBeInTheDocument();
      expect(screen.getByText(mockResumeData.data.title)).toBeInTheDocument();
    });
  });
});
