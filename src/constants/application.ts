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
      ko: '이력서 확인',
      en: 'Resume under review ✏️',
    },
    explain: {
      ko: '',
      en: '',
    },
  },
  {
    step: 2,
    title: {
      ko: '면접 진행',
      en: 'Get ready for your interview 💬',
    },
    explain: {
      ko: '지원자와 면접을 진행해요',
      en: 'Check your contract and work details before the interview.',
    },
  },
  {
    step: 3,
    title: {
      ko: '지원자서류 확인',
      en: 'Preparing your documents 📝',
    },
    explain: {
      ko: '지원자가 제출한 서류를 직접 확인해요',
      en: 'Gather all required documents for your work permit.',
    },
  },
  {
    step: 4,
    title: {
      ko: '서류 검토 진행',
      en: 'School review in progress 🔍',
    },
    explain: {
      ko: '소속 학교에서 지원자서류를 검토해요',
      en: 'Your school’s international student coordinator will review your documents.',
    },
  },
  {
    step: 5,
    title: {
      ko: '고용허가 진행',
      en: 'Work permit in progress 🇰🇷',
    },
    explain: {
      ko: '고용허가 신청을 자동으로 진행해요',
      en: 'Your application is being processed through HiKorea',
    },
  },
  {
    step: 6,
    title: {
      ko: '결과 확인',
      en: 'Last step! Register now 🎉',
    },
    explain: {
      ko: '최종 채용 여부를 확정해요',
      en: 'Submit your work permit status from HiKorea',
    },
  },
];
