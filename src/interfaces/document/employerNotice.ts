export interface EmployerNotice {
  announcementId: number; // id
  title: string; // 제목
  addressName: string; // 위치
  completor: number; // 서류완료자 수
  applicant: number; // 지원자 수
  deadLine: string; // 모집 마감일
  numberRecruited: number; // 마감까지 남은 일자
}
