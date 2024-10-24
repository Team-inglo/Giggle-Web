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
  REGISTRATION_RESULTS = 'REGISTRATION_RESULTS',
}

export const APPLICATION_SORT_TYPE = {
  ASCENDING: 'Ascending',
  DESCENDING: 'Descending',
} as const;

export const APPLICATION_STATUS_TYPE = {
  INPROGRESS: 'Inprogress',
  APPLICATION_SUCCESSFUL: 'Applicatioin successful',
  APPLICATION_REJECTED: 'Applicatioin rejected',
  RESUME_REJECTED: 'resume rejected',
  PENDING: 'pending',
} as const;