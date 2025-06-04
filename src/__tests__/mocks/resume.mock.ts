export const createMockResumeData = () => ({
  success: true,
  data: {
    id: 1,
    name: '김철수',
    profile_img_url: 'https://example.com/profile.jpg',
    title: '열정적인 프론트엔드 개발자',
    introduction:
      '안녕하세요, 저는 React와 TypeScript에 경험이 있는 개발자입니다.',
    personal_information: {
      gender: 'MALE',
      nationality: 'KOREA',
      birth: '1995-01-01',
      main_address: '서울 강남구',
      detailed_address: null,
      phone_number: '010-1234-5678',
      email: 'test@example.com',
    },
    visa: {
      visa: 'D_2',
      description: '학생비자',
    },
    languages: {
      topik: 3,
      social_integration: 2,
      sejong_institute: 4,
      etc: [],
    },
    education: [
      {
        id: 1,
        school_name: '서울대학교',
        major: '컴퓨터공학과',
        education_level: 'BACHELOR',
        start_date: '2019-03-01',
        end_date: '2023-02-28',
        grade: 3.8,
      },
    ],
    work_experience: [
      {
        id: 1,
        title: '프론트엔드 개발자',
        work_place: 'ABC 회사',
        start_date: '2023-03-01',
        end_date: '2024-01-31',
        duration: 11,
        description: 'React와 TypeScript를 사용한 웹 개발',
      },
    ],
    work_preference: {
      job_categories: ['IT_TELECOMMUNICATIONS'],
      employment_types: ['FULL_TIME'],
      preference_addresses: [
        {
          region_1depth_name: '서울',
          region_2depth_name: '강남구',
          region_3depth_name: null,
          region_4depth_name: null,
        },
      ],
    },
  },
});

// 공개 설정 응답 모킹을 위한 함수 추가
export const createResumePublicResponse = (isPublic: boolean) => ({
  success: true,
  data: {
    is_public: isPublic,
  },
});
