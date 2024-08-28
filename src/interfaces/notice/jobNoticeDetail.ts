export interface JobNoticeDetail {
  title: string; // 제목
  deadLine: string; // 공고 마감기한
  hourlyWage: number; // 시급
  workStartDate: string; // 근무 시작일
  workingPeriod: number; // 근무 기간
  workDays: string; // 문자열로 전송
  workTime: string; // 문자열로 전송
  age: number; // 나이
  gender: string; // MALE, FEMALE, ANY
  education: string; // HIGH_SCHOLL_GRADUATION, TWO_YEAR_COLLEGE_GRADUATION, FOUR_YEAR_COLLEGE_GRADUATION, ANY
  addressName: string; // 공고 주소
  numberRecruited: number; // 모집 인원
  content: string; // 내용
}
