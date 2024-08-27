export interface applicantStatus {
  applyId: number;
  name: string; // 지원자 이름
  dateOfApplication: string; // 지원날짜
  statusComment: string; // 상태 메시지
  employmentContractUrl: string; // 근로계약서 확인 url
}
