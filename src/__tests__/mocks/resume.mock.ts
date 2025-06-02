import { UserResumeDetailResponse } from '@/types/api/resumes';
import type {
  EducationType,
  LanguageListType,
  PersonalInformationType,
  WorkExperienceType,
  WorkPreferenceType,
  AreaType,
} from '@/types/postApply/resumeDetailItem';
import type { VisaType } from '@/types/postDetail/postDetailItem';
import type {
  EmploymentType,
  JobCategory,
} from '@/types/postCreate/postCreate';

// 이력서 공개 여부를 포함한 확장 타입
export type ResumeWithPublicStatus = UserResumeDetailResponse & {
  is_public: boolean;
};

// 기본 이력서 mock 데이터
export const createMockResumeDetail = (
  overrides?: Partial<ResumeWithPublicStatus>,
): ResumeWithPublicStatus => ({
  profile_img_url: 'https://example.com/profile.jpg',
  name: '김테스트',
  visa: {
    visa: 'D_2',
    description: '유학생 비자',
  },
  personal_information: {
    email: 'test@example.com',
    phone_number: '010-1234-5678',
    birth: '1995-01-01',
    gender: 'MALE',
    nationality: '한국',
    main_address: '서울시 강남구',
    detailed_address: '강남구 역삼동',
  },
  introduction: '안녕하세요. 열정적인 개발자입니다.',
  work_experience: [
    {
      id: 1,
      title: '프론트엔드 개발자',
      work_place: 'ABC 테크',
      start_date: '2022-01',
      end_date: '2023-12',
      description: 'React를 이용한 웹 애플리케이션 개발',
      duration: 1,
    },
  ],
  education: [
    {
      id: 1,
      education_level: 'BACHELOR',
      school_name: '테스트 대학교',
      major: '컴퓨터공학과',
      start_date: '2018-03',
      end_date: '2022-02',
      grade: 4,
    },
  ],
  languages: {
    topik: 5,
    social_integration: 3,
    sejong_institute: 4,
    etc: [
      {
        id: 1,
        level: 3,
        language_name: 'ENGLISH',
      },
    ],
  },
  is_public: true,
  ...overrides,
});

// 공개 이력서 mock 데이터
export const createPublicResumeDetail = (): ResumeWithPublicStatus =>
  createMockResumeDetail({ is_public: true });

// 비공개 이력서 mock 데이터
export const createPrivateResumeDetail = (): ResumeWithPublicStatus =>
  createMockResumeDetail({ is_public: false });

// 빈 이력서 mock 데이터 (새 사용자)
export const createEmptyResumeDetail = (): ResumeWithPublicStatus =>
  createMockResumeDetail({
    introduction: '',
    work_experience: [],
    education: [],
    languages: {
      topik: 0,
      social_integration: 0,
      sejong_institute: 0,
      etc: [],
    },
  });

// 이력서 공개 설정 응답 mock 데이터
export const createResumePublicResponse = (is_public: boolean) => ({
  success: true,
  data: {
    is_public,
    message: is_public
      ? '이력서가 공개로 설정되었습니다.'
      : '이력서가 비공개로 설정되었습니다.',
  },
});

// 이력서 공개 설정 에러 응답 mock 데이터
export const createResumePublicErrorResponse = () => ({
  success: false,
  error: {
    code: 'RESUME_UPDATE_FAILED',
    message: '이력서 공개 설정을 변경하는 중 오류가 발생했습니다.',
  },
});

// 다양한 언어 레벨을 가진 이력서 mock 데이터
export const createMultiLanguageResumeDetail = (): ResumeWithPublicStatus =>
  createMockResumeDetail({
    languages: {
      topik: 6,
      social_integration: 5,
      sejong_institute: 5,
      etc: [
        {
          id: 1,
          language_name: 'ENGLISH',
          level: 5,
        },
        {
          id: 2,
          language_name: 'JAPANESE',
          level: 3,
        },
        {
          id: 3,
          language_name: 'CHINESE',
          level: 2,
        },
      ],
    },
  });

// 여러 경력을 가진 이력서 mock 데이터
export const createMultiExperienceResumeDetail = (): ResumeWithPublicStatus =>
  createMockResumeDetail({
    work_experience: [
      {
        id: 1,
        title: '프론트엔드 개발자',
        work_place: 'ABC 테크',
        start_date: '2022-01',
        end_date: '2023-12',
        description: 'React를 이용한 웹 애플리케이션 개발',
        duration: 1,
      },
      {
        id: 2,
        title: '풀스택 개발자',
        work_place: 'XYZ 스타트업',
        start_date: '2021-03',
        end_date: '2021-12',
        description: 'Node.js와 React를 이용한 서비스 개발',
        duration: 1,
      },
      {
        id: 3,
        title: '시니어 개발자',
        work_place: '현재 회사',
        start_date: '2024-01',
        end_date: '',
        description: '팀 리딩 및 아키텍처 설계',
        duration: 1,
      },
    ],
  });

// 학력 정보가 풍부한 이력서 mock 데이터
export const createDetailedEducationResumeDetail = (): ResumeWithPublicStatus =>
  createMockResumeDetail({
    education: [
      {
        id: 1,
        education_level: 'BACHELOR',
        school_name: '테스트 대학교',
        major: '컴퓨터공학과',
        start_date: '2018-03',
        end_date: '2022-02',
        grade: 4,
      },
      {
        id: 2,
        education_level: 'BACHELOR',
        school_name: '한국과학기술원',
        major: '전산학부',
        start_date: '2022-03',
        end_date: '2024-02',
        grade: 4,
      },
    ],
  });

// 테스트용 이력서 목록 생성
export const createMockResumeList = (
  count: number = 5,
): ResumeWithPublicStatus[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockResumeDetail({
      is_public: index % 2 === 0, // 짝수 인덱스는 공개, 홀수는 비공개
    }),
  );
};

export const createMockPersonalInformation = (
  overrides: Partial<PersonalInformationType> = {},
): PersonalInformationType => ({
  gender: 'FEMALE',
  nationality: 'SWEDEN',
  birth: '2001-08-06',
  main_address: '서울 강남구',
  detailed_address: null,
  phone_number: '010-7764-0596',
  email: 'fredrick0411@cgsu.ac.kr',
  ...overrides,
});

type VisaInfo = {
  visa: VisaType;
  description: string;
};

export const createMockVisaType = (
  overrides: Partial<VisaInfo> = {},
): VisaInfo => ({
  visa: 'D_2',
  description: 'International Student',
  ...overrides,
});

export const createMockLanguageList = (
  overrides: Partial<LanguageListType> = {},
): LanguageListType => ({
  topik: 4,
  social_integration: 4,
  sejong_institute: 4,
  etc: [
    {
      id: 1,
      language_name: 'English',
      level: 8,
    },
  ],
  ...overrides,
});

export const createMockWorkExperience = (
  overrides: Partial<WorkExperienceType> = {},
): WorkExperienceType => ({
  id: 1,
  title: 'Restaurant Work 1',
  description: 'Served customers and managed orders',
  start_date: '2021-03-01',
  end_date: '2021-08-31',
  duration: 6,
  work_place: 'Restaurant ABC',
  ...overrides,
});

export const createMockEducation = (
  overrides: Partial<EducationType> = {},
): EducationType => ({
  id: 1,
  education_level: 'BACHELOR',
  school_name: 'Dongguk University',
  major: 'Business Administration',
  start_date: '2021-03-01',
  end_date: '2025-08-31',
  grade: 4.2,
  ...overrides,
});

export const createMockArea = (
  overrides: Partial<AreaType> = {},
): AreaType => ({
  region_1depth_name: '서울특별시',
  region_2depth_name: '강남구',
  region_3depth_name: null,
  region_4depth_name: null,
  ...overrides,
});

export const createMockWorkPreference = (
  overrides: Partial<WorkPreferenceType> = {},
): WorkPreferenceType => ({
  preference_addresses: [
    createMockArea(),
    createMockArea({
      region_2depth_name: '서초구',
    }),
  ],
  employment_types: ['PART_TIME' as EmploymentType],
  job_categories: ['RESTAURANT' as JobCategory, 'SERVICE' as JobCategory],
  ...overrides,
});

type MockResumeData = {
  success: boolean;
  data: {
    id: number;
    name: string;
    profile_img_url: string;
    title: string;
    introduction: string;
    personal_information: PersonalInformationType;
    visa: VisaInfo;
    languages: LanguageListType;
    work_experience: WorkExperienceType[];
    education: EducationType[];
    work_preference: WorkPreferenceType;
    is_public: boolean;
  };
};

export const createMockResumeData = (
  overrides: Partial<MockResumeData['data']> = {},
): MockResumeData => ({
  success: true,
  data: {
    id: 1,
    name: '한은서',
    profile_img_url: 'https://example.com/profile.jpg',
    title: 'Passionate about learning & growing in a new environment!',
    introduction:
      '안녕하세요. 한국에서 공부하고 있는 스웨덴 출신 유학생입니다. 새로운 환경에서 배우고 성장하는 것을 좋아하며, 다양한 사람들과 소통하는 것을 즐깁니다. 비즈니스 전공이며 한국어에 능통하고 다국어 회화가 가능합니다. 파트타임 업무를 통해 제 능력을 향상시키고 역동적인 팀에 기여하고 싶습니다. 배우려는 의지가 강하고 적응력이 뛰어납니다!',
    personal_information: createMockPersonalInformation(),
    visa: createMockVisaType(),
    languages: createMockLanguageList(),
    work_experience: [
      createMockWorkExperience(),
      createMockWorkExperience({
        id: 2,
        title: 'Restaurant Work 2',
        work_place: 'Restaurant DEF',
        start_date: '2021-09-01',
        end_date: '2021-12-31',
        duration: 4,
      }),
      createMockWorkExperience({
        id: 3,
        title: 'Restaurant Work 3',
        work_place: 'Restaurant GHI',
        start_date: '2022-01-01',
        end_date: '2022-04-30',
        duration: 4,
      }),
    ],
    education: [createMockEducation()],
    work_preference: createMockWorkPreference(),
    is_public: true,
    ...overrides,
  },
});

export const createMockResumeDataWithoutOptional = () =>
  createMockResumeData({
    title: '',
    introduction: '',
    work_experience: [],
    education: [],
    languages: {
      topik: 0,
      social_integration: 0,
      sejong_institute: 0,
      etc: [],
    },
  });

export const createMockResumeDataHighLevel = () =>
  createMockResumeData({
    languages: createMockLanguageList({
      topik: 6,
      social_integration: 5,
      sejong_institute: 6,
    }),
  });

export const createMockResumeDataLowLevel = () =>
  createMockResumeData({
    languages: createMockLanguageList({
      topik: 1,
      social_integration: 1,
      sejong_institute: 1,
    }),
  });

export const createMockUserResumeData = () =>
  createMockResumeData({
    // 일반 사용자용 데이터
  });

export const createMockApplicantResumeData = () =>
  createMockResumeData({
    // 지원자용 데이터
  });
