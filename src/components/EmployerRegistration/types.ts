export type partTimeRecruitPostRequest = {
  title: string; // 제목
  job_type: workType;
  dead_line: DateString | undefined; // 공고 마감기한
  hourly_wage: number; // 시급
  work_start_date: DateString | undefined; // 근무 시작일
  working_period: number; // 근무 기간
  work_days: workDay[] | [];
  age: number; // 나이
  gender: gender; // MALE, FEMALE, ANY
  education: education; // HIGH_SCHOLL_GRADUATION, TWO_YEAR_COLLEGE_GRADUATION, FOUR_YEAR_COLLEGE_GRADUATION, ANY
  number_recruited: number; // 모집 인원
  content: string; // 내용
};

export type DateString =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
export type TimeString = `${number}${number}:${number}${number}`;

export type workDay = {
  day: weekDay; // MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
  workStartTime: TimeString | undefined;
  workEndTime: TimeString | undefined;
};

export type gender = "MALE" | "FEMALE" | "ANY";

export type education =
  | "HIGH_SCHOLL_GRADUATION"
  | "TWO_YEAR_COLLEGE_GRADUATION"
  | "FOUR_YEAR_COLLEGE_GRADUATION"
  | "ANY";

export type weekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type workType = "ANY"| "FOOD_INDUSTRY"| "OFFICE"| "ENGLISH"| "TOURIST_INFORMATION"| "MANUDACTURING_INDUSTRY"| "DAY_WORK"| "INTERNSHIP";