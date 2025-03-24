export type RESTYPE<T> = {
  success: boolean;
  data: T;
  error: ErrorType | null;
};

export type ExternalRESTYPE = {
  request_cnt?: number;
  status_code: string;
  data?: BusinessInfo[];
};

export interface BusinessInfo {
  b_no: string; // 사업자등록번호
  b_stt: string; // 사업자 상태 (예: "계속사업자")
  b_stt_cd: string; // 사업자 상태 코드
  tax_type: string; // 과세 유형 (예: "부가가치세 일반과세자")
  tax_type_cd: string; // 과세 유형 코드
  end_dt: string; // 종료일자 (YYYYMMDD 형식)
  utcc_yn: 'Y' | 'N'; // 여부 필드 (Y/N)
  tax_type_change_dt: string; // 과세 유형 변경일 (YYYYMMDD 형식)
  invoice_apply_dt: string; // 세금계산서 적용일 (YYYYMMDD 형식)
  rbf_tax_type: string; // 이전 과세 유형
  rbf_tax_type_cd: string; // 이전 과세 유형 코드
}

type ErrorType = {
  code: number;
  message: string;
};
