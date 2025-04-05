export type PatchResumeAcceptedRequest = {
  is_accepted: boolean;
};

export type PatchHiKoreaResultRequest = {
  is_approval: boolean;
  feedback: string;
};

export type ApplicationDetailItem = {
  id: number;
  title: string;
  company_name: string;
  address_name: string;
  hourly_rate: number;
  work_days_per_week: string;
  work_period: string;
  step: string;
};
