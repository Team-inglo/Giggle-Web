import { UserResumeDetailResponse } from '@/types/api/resumes';

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
