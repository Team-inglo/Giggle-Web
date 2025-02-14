export const enum IconType {
  PROFILE = 'PROFILE',
  MANAGE = 'MANAGE',
  SCRAPPED = 'SCRAPPED',
  NOTIFICATION = 'NOTIFICATION',
  LANGUAGE = 'LANGUAGE',
  LOGOUT = 'LOGOUT',
}

export const enum GenderType {
  MALE = 'Male',
  FEMALE = 'Female',
  NONE = 'None',
}

export const enum VisaType {
  D_2_1 = 'D-2-1',
  D_2_2 = 'D-2-2',
  D_2_3 = 'D-2-3',
  D_2_4 = 'D-2-4',
  D_2_6 = 'D-2-6',
  D_2_7 = 'D-2-7',
  D_2_8 = 'D-2-8',
  D_4_1 = 'D-4-1',
  D_4_7 = 'D-4-7',
  F_2 = 'F-2',
}

export const enum NationalityType {
  SOUTH_KOREA = 'South Korea',
  JAPAN = 'Japan',
  CHINA = 'China',
  VIETNAME = 'Vietname',
  UZBEKISTAN = 'Uzbekistan',
}

// 더미데이터
export const EmployerSummaryData = {
  success: true,
  data: {
    icon_img_url:
      'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',

    company_name: '회사 이름',
    is_notification_allowed: true,
  },
};

export const EmployerInfoData = {
  success: true,
  data: {
    job_postings_counts: 7,
    applicants_counts: 2,
    successful_hire_counts: 10,
  },
};

export const UserProfileSummaryData = {
  success: true,
  data: {
    user_information: {
      profile_img_url:
        'https://images.pexels.com/photos/1458926/pexels-photo-1458926.jpeg?cs=srgb&dl=pexels-poodles2doodles-1458926.jpg&fm=jpg',
      first_name: 'Hyeona',
      last_name: 'Seol',
      birth: '0000-00-00',
      school_name: 'Dongguk University',
      grade: 3,
      gpa: 3.5,
      is_notification_allowed: true,
    },
    language_level: {
      topik_level: 4,
      kiip_level: 4,
      sejong_level: 4,
    },
    meta_data: {
      weekend_work_hour: 20,
      weekday_work_hour: 30,
      is_language_skill_4_or_more: true,
      is_metropolitan_area: true,
    },
  },
};

export const EDUCATION_PERIOD = {
  BACHELOR: 4,
  ASSOCIATE: 2,
  HIGHSCHOOL: 3,
} as const;
