import { Gender } from '@/types/api/users';
import { WorkDayTime } from '../api/document';

// Enums
export enum JobCategory {
  GENERAL_INTERPRETATION_TRANSLATION = 'GENERAL_INTERPRETATION_TRANSLATION',
  FOOD_SERVICE_ASSISTANT = 'FOOD_SERVICE_ASSISTANT',
  GENERAL_ADMINISTRATIVE_SUPPORT = 'GENERAL_ADMINISTRATIVE_SUPPORT',
  ENGLISH_KIDS_CAFE = 'ENGLISH_KIDS_CAFE',
  GENERAL_CAFE = 'GENERAL_CAFE',
  PART_TIME_WORK = 'PART_TIME_WORK',
  TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT = 'TOUR_GUIDE_AND_DUTY_FREE_ASSISTANT',
  MANUFACTURING = 'MANUFACTURING',
}

export enum DayOfWeek {
  WEEKDAYS = 'WEEKDAYS',
  WEEKEND = 'WEEKEND',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  NEGOTIABLE = 'NEGOTIABLE',
}

export enum WorkPeriod {
  ONE_DAY = 'ONE_DAY',
  LESS_THAN_ONE_WEEK = 'LESS_THAN_ONE_WEEK',
  ONE_WEEK_TO_ONE_MONTH = 'ONE_WEEK_TO_ONE_MONTH',
  ONE_MONTH_TO_THREE_MONTHS = 'ONE_MONTH_TO_THREE_MONTHS',
  THREE_MONTHS_TO_SIX_MONTHS = 'THREE_MONTHS_TO_SIX_MONTHS',
  SIX_MONTHS_TO_ONE_YEAR = 'SIX_MONTHS_TO_ONE_YEAR',
  MORE_THAN_ONE_YEAR = 'MORE_THAN_ONE_YEAR',
}

export enum EmploymentType {
  PARTTIME = 'PARTTIME',
  INTERNSHIP = 'INTERNSHIP',
}

export enum EducationLevel {
  BACHELOR = 'BACHELOR',
  ASSOCIATE = 'ASSOCIATE',
  HIGHSCHOOL = 'HIGHSCHOOL',
  NONE = 'NONE',
}

export enum VisaGroup {
  D_2 = 'D_2',
  D_4 = 'D_4',
  F_2 = 'F_2',
}

// Types

export type GiggleAddress = {
  address_name: string | null;
  region_1depth_name: string | null;
  region_2depth_name: string | null;
  region_3depth_name: string | null;
  region_4depth_name: string | null;
  address_detail: string | null;
  longitude: number | null;
  latitude: number | null;
};

export type Image = {
  id: number;
  img_url: string;
};

export type JobPostingForm = {
  images: (File | Image)[];
  body: {
    title: string;
    job_category: JobCategory | string;
    work_day_times: WorkDayTime[];
    work_period: WorkPeriod | string;
    hourly_rate: number;
    employment_type: EmploymentType;
    address: GiggleAddress;
    recruitment_dead_line: string | null;
    recruitment_number: number;
    gender: Gender;
    age_restriction: number | null;
    education_level: EducationLevel | string;
    visa: VisaGroup | string;
    recruiter_name: string;
    recruiter_email: string;
    recruiter_phone_number: string;
    description: string;
    preferred_conditions: string;
    deleted_img_ids?: number[];
  };
};

// Initial State
export const initialJobPostingState: JobPostingForm = {
  images: [],
  body: {
    title: '',
    job_category: '',
    work_day_times: [
      {
        day_of_week: DayOfWeek.NEGOTIABLE,
        work_start_time: '',
        work_end_time: '',
      },
    ],
    work_period: '',
    hourly_rate: 0,
    employment_type: EmploymentType.PARTTIME,
    address: {
      address_name: '',
      region_1depth_name: '',
      region_2depth_name: '',
      region_3depth_name: '',
      region_4depth_name: '',
      address_detail: '',
      longitude: 0,
      latitude: 0,
    },
    recruitment_dead_line: null,
    recruitment_number: 1,
    gender: Gender.MALE,
    age_restriction: 0,
    education_level: '',
    visa: '',
    recruiter_name: '',
    recruiter_email: '',
    recruiter_phone_number: '',
    description: '',
    preferred_conditions: '',
  },
};
