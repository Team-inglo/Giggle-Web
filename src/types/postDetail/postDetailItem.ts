export type VisaType =
  | 'D_2'
  | 'D_4'
  | 'D_10'
  | 'C_4'
  | 'F_2'
  | 'F_4'
  | 'F_5'
  | 'F_6'
  | 'H_1';

type JobCategoryType =
  | 'GENERAL_INTERPRETATION_TRANSLATION'
  | 'FOOD_SERVICE_ASSISTANT'
  | 'GENERAL_ADMINISTRATIVE_SUPPORT'
  | 'ENGLISH_KIDS_CAFE'
  | 'GENERAL_CAFE'
  | 'PART_TIME_WORK'
  | 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT'
  | 'MANUFACTURING';

type WorkPeriodType =
  | 'ONE_DAY'
  | 'LESS_THAN_ONE_WEEK'
  | 'ONE_WEEK_TO_ONE_MONTH'
  | 'ONE_MONTH_TO_THREE_MONTHS'
  | 'THREE_MONTHS_TO_SIX_MONTHS'
  | 'SIX_MONTHS_TO_ONE_YEAR'
  | 'MORE_THAN_ONE_YEAR';

type GenderType = 'MALE' | 'FEMALE' | 'NONE';

type EducationType = 'BACHELOR' | 'ASSOCIATE' | 'HIGHSCHOOL';

type DayOfWeekType =
  | 'WEEKDAYS'
  | 'WEEKEND'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'
  | 'NEGOTIABLE';

type EmploymentType = 'PARTTIME' | 'INTERNSHIP';

export type CompanyImageUrlType = {
  id: number;
  img_url: string;
};

export type TagType = {
  is_recruiting: boolean;
  visa: VisaType[];
  job_category: JobCategoryType;
};

export type SummariesType = {
  address: string;
  hourly_rate: number;
  work_period: WorkPeriodType;
  work_days_per_week: number;
};

type RecruitmentConditionsType = {
  recruitment_deadline: string;
  age_restriction: number | null;
  education: EducationType;
  number_of_recruits: number;
  visa: VisaType[];
  gender: GenderType;
  preferred_conditions: string;
};

type WorkplaceInformationType = {
  main_address: string;
  detailed_address: string;
  distance?: number;
  latitude: number;
  longitude: number;
};

type WorkDayTimesType = {
  day_of_week: DayOfWeekType;
  work_start_time: string; // 'HH:mm'
  work_end_time: string; // 'HH:mm'
};

type WorkingConditionsType = {
  hourly_rate: number;
  work_period: WorkPeriodType;
  work_day_times: WorkDayTimesType[];
  job_category: JobCategoryType;
  employment_type: EmploymentType;
};

type CompanyInformationType = {
  company_address: string;
  representative_name: string;
  recruiter: string;
  contact: string;
  email: string;
};

export type PostDetailItemType = {
  id: number;
  is_my_post?: boolean;
  is_book_marked?: boolean;
  company_name: string;
  title: string;
  icon_img_url: string;
  company_img_url_list: CompanyImageUrlType[];
  tags: TagType;
  summaries: SummariesType;
  recruitment_conditions: RecruitmentConditionsType;
  detailed_overview: string;
  workplace_information: WorkplaceInformationType;
  working_conditions: WorkingConditionsType;
  company_information: CompanyInformationType;
  created_at: string; // 'yyyy-MM-ddTHH:mm:ss'
};
