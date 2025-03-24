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
    title: {
      ko: '지원자의 이력서가 도착했어요! ✏️',
      en: 'Resume under review ✏️',
    },
    explain: {
      ko: '지원자의 이력서를 살펴보고, 채용 가능 여부를 결정해 주세요!',
      en: 'The employer is reviewing your resume. We’ll let you know!',
    },
  },
  {
    step: 2,
    title: {
      ko: '면접 일정 조율하기 💬',
      en: 'Get ready for your interview 💬',
    },
    explain: {
      ko: '지원자와 면접 날짜를 잡고, 근무 조건도 확인해 보세요.',
      en: 'Check your contract and work details before the interview.',
    },
  },
  {
    step: 3,
    title: {
      ko: '지원자가 근로계약서를 작성했어요 📝',
      en: 'Preparing your documents 📝',
    },
    explain: {
      ko: '지원자의 근로계약서를 확인하고, 취업허가서도 준비해 주세요.',
      en: 'Gather all required documents for your work permit.',
    },
  },
  {
    step: 4,
    title: {
      ko: '학교에서 서류 검토 중이에요 🔍',
      en: 'School review in progress 🔍',
    },
    explain: {
      ko: '지원자의 학교 담당자가 서류를 확인하고 있어요. 검토가 끝나면 다음 단계로 넘어갑니다!',
      en: 'Your school’s international student coordinator will review your documents.',
    },
  },
  {
    step: 5,
    title: {
      ko: '취업허가 승인을 기다리고 있어요 🇰🇷',
      en: 'Work permit in progress 🇰🇷',
    },
    explain: {
      ko: '지원자가 작성된 서류를 기반으로 민원을 신청하였어요. 승인이 허가될 때까지 잠시 기다려주세요!',
      en: 'Your application is being processed through HiKorea',
    },
  },
  {
    step: 6,
    title: {
      ko: '취업허가 결과를 확인해 주세요 🎉',
      en: 'Last step! Register now 🎉',
    },
    explain: {
      ko: '취업허가가 승인되었는지 확인하고, 최종 결과를 등록해주세요.',
      en: 'Submit your work permit status from HiKorea',
    },
  },
];
