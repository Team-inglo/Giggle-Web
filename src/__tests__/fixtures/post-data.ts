export const TEST_POST_DATA = {
  step1: {
    type: '알바',
    industry: '외식/음료',
    title: '카페 아르바이트 구인합니다',
  },
  step2: {
    hourlyWage: '10030',
    workPeriod: '3개월 ~ 6개월',
    workTime: '09:00-18:00',
    address: {
      address_name: '서울특별시 강남구 테헤란로 101',
      region_1depth_name: '서울특별시',
      region_2depth_name: '강남구',
      region_3depth_name: '테헤란로',
      region_4depth_name: '',
      address_detail: '123번길 45 1층',
      longitude: 127.027583,
      latitude: 37.501021,
    },
  },
  step3: {
    recruitCount: '2',
    gender: '남자',
    ageLimit: '18',
    visa: 'F-4 : 재외동포 자유 취업 비자',
    education: '고등학교졸업',
  },
  step4: {
    managerName: '김매니저',
    managerEmail: 'manager@example.com',
    managerPhone: '1234-5678',
  },
  step5: {
    description:
      '친절하고 성실한 분을 찾고 있습니다. 카페 업무 전반을 담당하게 됩니다.',
    preferredConditions: '카페 경험자 우대',
  },
  validation: {
    longTitle: 'a'.repeat(101), // 100자 초과
    longDetailAddress: 'a'.repeat(60), // 50자 초과
    longManagerName: 'a'.repeat(11), // 10자 초과
    longManagerEmail: 'test' + 'a'.repeat(315) + '.com', // 320자 초과
    longDescription: 'a'.repeat(1001), // 1000자 초과
    longPreferredConditions: 'a'.repeat(51), // 50자 초과
  },
};
