import { ApplicationStepExplainType } from '@/types/application/applicationItem';

export const enum APPLICATION_STEP {
  RESUME_UNDER_REVIEW = 'RESUME_UNDER_REVIEW',
  WAITING_FOR_INTERVIEW = 'WAITING_FOR_INTERVIEW',
  FILLING_OUT_DOCUMENTS = 'FILLING_OUT_DOCUMENTS',
  DOCUMENT_UNDER_REVIEW = 'DOCUMENT_UNDER_REVIEW',
  APPLICATION_IN_PROGRESS = 'APPLICATION_IN_PROGRESS',
  APPLICATION_SUCCESS = 'APPLICATION_SUCCESS',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED',
  RESUME_REJECTED = 'RESUME_REJECTED',
  PENDING = 'PENDING',
  REGISTERING_RESULTS = 'REGISTERING_RESULTS',
}

export const APPLICATION_STATUS_TYPE = {
  APPLICATION_IN_PROGRESS: 'In Progress',
  APPLICATION_SUCCESS: 'Success',
  APPLICATION_REJECTED: 'Resubmit',
  RESUME_REJECTED: 'Rejected',
  //PENDING: 'pending',
} as const;

export const KO_APPLICATION_STATUS_TYPE = {
  APPLICATION_IN_PROGRESS: '진행 중',
  APPLICATION_SUCCESS: '채용 성공',
  APPLICATION_REJECTED: '확인 필요',
  RESUME_REJECTED: '서류 탈락',
  //PENDING: '대기',
} as const;

export const EN_APPLICATION_STATUS_TYPE = {
  ['진행 중']: 'Application in progress',
  ['채용 성공']: 'Application success',
  ['확인 필요']: 'Application rejected',
  ['서류 탈락']: 'resume rejected',
  //['대기']: 'pending',
} as const;

// 지원 상태 단계별 문구
export const APPLICATION_STEP_EXPLAIN_DATA: ApplicationStepExplainType[] = [
  {
    step: 1,
    title: 'Resume Verification',
    explain: 'The employer is currently reviewing your resume.',
  },
  {
    step: 2,
    title: 'Interview Preparation',
    explain: 'Please check the employment contract and work conditions.',
  },
  {
    step: 3,
    title: 'Document Preparation',
    explain:
      'Please prepare the documents required for a part-time work permit.',
  },
  {
    step: 4,
    title: 'Document Review by the International Student Coordinator',
    explain:
      'Get the documents reviewed by the international student coordinator at your school.',
  },
  {
    step: 5,
    title: 'HiKorea e-Government Applica',
    explain: 'Apply for a part-time work permit through HiKorea.',
  },
  {
    step: 6,
    title: 'Result Registration',
    explain: 'Please register the results.',
  },
];

export const KO_APPLICATION_STEP_EXPLAIN_DATA: ApplicationStepExplainType[] = [
  {
    step: 1,
    title: '이력서 확인',
    explain: '이력서를 확인하고 승인해주세요.',
  },
  {
    step: 2,
    title: '면접 진행',
    explain: '면접을 동해 지원자를 확인하고 근무 조건에 대해 이야기하세요.',
  },
  {
    step: 3,
    title: '서류 작성',
    explain: '유학생의 시간제 취업허가를 위해 필요한 서류를 준비해주세요.',
  },
  {
    step: 4,
    title: '유학생의 서류 검토',
    explain: '유학생이 서류를 검토받고 있어요.',
  },
  {
    step: 5,
    title: '유학생의 하이코리아 전자민원 신청',
    explain: '유학생이 하이코리아에 시간제 취업허가를 신청했어요.',
  },
  {
    step: 6,
    title: '결과 확인',
    explain: '결과를 확인하세요.',
  },
];
