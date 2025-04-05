import {
  getDocumentsEmployee,
  getDocumentsEmployer,
  getIntegratedApplication,
  getPartTimeEmployPermit,
  getStandardLaborContract,
  patchDocumentsStatusConfirmation,
  patchStatusSubmission,
  patchStatusSubmissionEmployer,
  postIntegratedApplications,
  postPartTimeEmployPermit,
  postRequest,
  postStandardLaborContracts,
  putIntegratedApplications,
  putLaborContractEmployer,
  putPartTimeEmployPermit,
  putPartTimeEmployPermitEmployer,
  putStandardLaborContracts,
  searchSchool,
} from '@/api/document';
import {
  DocumentType,
  EmployerInformation,
  IntegratedApplicationData,
  LaborContractDataResponse,
  LaborContractEmployeeInfo,
  LaborContractEmployerInfo,
  PartTimePermitData,
  PartTimePermitFormRequest,
  SearchSchoolResponse,
} from '@/types/api/document';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { RESTYPE } from '../../types/api/common';
import { smartNavigate } from '@/utils/application';

// 8.1 (유학생) 서류 조회하기 훅
export const useGetDocumentsEmployee = (id: number) => {
  return useQuery({
    queryKey: ['application', 'documents', 'employee', id],
    queryFn: () => getDocumentsEmployee(id),
  });
};

// 8.2 (고용주) 서류 조회하기 훅
export const useGetDocumentsEmployer = (id: number) => {
  return useQuery({
    queryKey: ['application', 'documents', 'employer', id],
    queryFn: () => getDocumentsEmployer(id),
  });
};

// 시간제취업허가서 작성 api 통신 커스텀 훅
export const usePostPartTimeEmployPermit = (
  id: number,
  options?: UseMutationOptions<
    RESTYPE<{ id: number }>,
    Error,
    { id: number; document: PartTimePermitFormRequest }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postPartTimeEmployPermit,
    onSuccess: () => {
      smartNavigate(navigate, `/application-documents/${id}`, {
        forceSkip: true,
      });
    },
    onError: () =>
      smartNavigate(navigate, '/write-documents', {
        forceSkip: true,
        state: {
          type: DocumentType.PART_TIME_PERMIT,
        },
      }),
    ...options,
  });
};

// 8.10 (유학생)시간제취업허가서 수정 api 통신 커스텀 훅
export const usePutPartTimeEmployPermit = (
  id: number,
  userOwnerPostingId: number,
  options?: UseMutationOptions<
    RESTYPE<null>,
    Error,
    { id: number; document: PartTimePermitFormRequest }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: putPartTimeEmployPermit,
    onSuccess: () => {
      smartNavigate(navigate, `/application-documents/${userOwnerPostingId}`, {
        forceSkip: true,
      });
    },
    onError: () =>
      smartNavigate(navigate, `/write-documents${id}`, {
        forceSkip: true,
        state: { type: DocumentType.PART_TIME_PERMIT, isEdit: true },
      }),
    ...options,
  });
};

// 8.11 (고용주)시간제취업허가서 수정 api 통신 커스텀 훅
export const usePutPartTimeEmployPermitEmployer = (
  id: number,
  userOwnerPostingId: number,
  options?: UseMutationOptions<
    RESTYPE<null>,
    Error,
    { id: number; document: EmployerInformation }
  >,
) => {
  const navigate = useNavigate();
  console.log('userOwnerPostingId', userOwnerPostingId);
  return useMutation({
    mutationFn: putPartTimeEmployPermitEmployer,
    onSuccess: () => {
      smartNavigate(
        navigate,
        `/employer/applicant/document-detail/${userOwnerPostingId}`,
      );
    },
    onError: () =>
      smartNavigate(navigate, `/employer/write-documents/${id}`, {
        forceSkip: true,
        state: { type: DocumentType.PART_TIME_PERMIT, isEdit: true },
      }),
    ...options,
  });
};

//표준 근로계약서 작성 api 통신 커스텀 훅
export const usePostStandardLaborContracts = (
  id: number,
  options?: UseMutationOptions<
    RESTYPE<{ id: number }>,
    Error,
    { id: number; document: LaborContractEmployeeInfo }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postStandardLaborContracts,
    onSuccess: () => {
      smartNavigate(navigate, `/application-documents/${id}`, {
        forceSkip: true,
      });
    },
    onError: () =>
      smartNavigate(navigate, '/write-documents', {
        forceSkip: true,
        state: {
          type: DocumentType.LABOR_CONTRACT,
        },
      }),
    ...options,
  });
};

// 8.12 (유학생) 표준 근로계약서 수정 api 통신 커스텀 훅
export const usePutStandardLaborContracts = (
  id: number,
  userOwnerPostingId: number,
  options?: UseMutationOptions<
    RESTYPE<null>,
    Error,
    { id: number; document: LaborContractEmployeeInfo }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: putStandardLaborContracts,
    onSuccess: () => {
      smartNavigate(navigate, `/application-documents/${userOwnerPostingId}`, {
        forceSkip: true,
      });
    },
    onError: () =>
      smartNavigate(navigate, `/write-documents${id}`, {
        forceSkip: true,
        state: {
          type: DocumentType.LABOR_CONTRACT,
          isEdit: true,
        },
      }),
    ...options,
  });
};

// 8.13 (고용주) 표준 근로계약서 수정 api 통신 커스텀 훅
export const usePutLaborContractEmployer = (
  id: number,
  userOwnerPostingId: number,
  options?: UseMutationOptions<
    RESTYPE<null>,
    Error,
    {
      id: number;
      document: LaborContractEmployerInfo;
    }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: putLaborContractEmployer,
    onSuccess: () => {
      smartNavigate(
        navigate,
        `/employer/applicant/document-detail/${userOwnerPostingId}`,
        {
          forceSkip: true,
        },
      );
    },
    onError: () =>
      smartNavigate(navigate, `/employer/write-documents/${id}`, {
        forceSkip: true,
        state: { type: DocumentType.LABOR_CONTRACT, isEdit: true },
      }),
    ...options,
  });
};

// 8.8 통합신청서 생성 api 통신 커스텀 훅
export const usePostIntegratedApplicants = (
  postId: number,
  options?: UseMutationOptions<
    RESTYPE<{ id: number }>,
    Error,
    { id: number; document: IntegratedApplicationData }
  >,
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postIntegratedApplications,
    onSuccess: () => {
      smartNavigate(navigate, `/application-documents/${postId}`, {
        forceSkip: true,
      });
    },
    onError: () =>
      smartNavigate(navigate, '/write-documents', {
        forceSkip: true,
        state: {
          type: DocumentType.INTEGRATED_APPLICATION,
        },
      }),
    ...options,
  });
};

// 8.14 (유학생) 통합신청서 수정 api 통신 커스텀 훅
export const usePutIntegratedApplicants = (
  id: number,
  userOwnerPostingId: number,
  options?: UseMutationOptions<
    RESTYPE<null>,
    Error,
    { id: number; document: IntegratedApplicationData }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: putIntegratedApplications,
    onSuccess: () => {
      smartNavigate(navigate, `/application-documents/${userOwnerPostingId}`, {
        forceSkip: true,
      });
    },
    onError: () =>
      smartNavigate(navigate, `/write-documents${id}`, {
        forceSkip: true,
        state: {
          type: DocumentType.INTEGRATED_APPLICATION,
          isEdit: true,
        },
      }),
    ...options,
  });
};

// 8.15 (유학생) 서류 (근로계약서, 시간제 취업허가서, 통합 신청서) 제출하기 api hook
export const usePatchStatusSubmission = (
  options?: UseMutationOptions<RESTYPE<null>, Error, number>,
) => {
  return useMutation({
    mutationFn: patchStatusSubmission,
    onError: (error) => {
      console.error('유학생의 서류 제출 실패', error);
    },
    ...options,
  });
};

// 8.16 (고용주) 서류 (근로계약서, 시간제 취업허가서, 통합 신청서) 제출하기 api hook
export const usePatchStatusSubmissionEmployer = (
  options?: UseMutationOptions<RESTYPE<null>, Error, number>,
) => {
  return useMutation({
    mutationFn: patchStatusSubmissionEmployer,
    onError: (error) => {
      console.error('고용주의 서류 제출 실패', error);
    },
    ...options,
  });
};

// 8.17 (유학생) 서류 (근로계약서, 시간제 취업허가서) 컨펌하기
export const usePatchDocumentsStatusConfirmation = (
  id: number,
  options?: UseMutationOptions<RESTYPE<null>, Error, number>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchDocumentsStatusConfirmation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['application', 'documents', 'employee', id],
      });
    },
    onError: (error) => {
      console.error('유학생의 서류 컨펌 실패', error);
    },
    ...options,
  });
};

// 9.1 (유학생) 학교 검색하기 api 통신 커스텀 훅
export const useSearchSchool = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RESTYPE<SearchSchoolResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: searchSchool,
    onSuccess,
    onError: (error) => {
      console.error('학교 검색 중 오류 발생:', error);
      onError?.(error);
    },
  });
  return { searchSchool: mutate, ...rest };
};

// 8.9 (유학생) 서류 재검토 요청 api 통신 커스텀 훅
export const usePostRequest = (
  id: number,
  options?: UseMutationOptions<
    RESTYPE<{ id: number }>,
    Error,
    { id: number; reason: string }
  >,
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postRequest,
    onError: () => smartNavigate(navigate, `/request-modify/${id}`),
    ...options,
  });
};

// 8.3 (유학생/고용주) 시간제 취업허가서 조회 api 통신 커스텀 훅
export const useGetPartTimeEmployPermit = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RESTYPE<PartTimePermitData>) => void;
  onError?: (error: unknown) => void;
}) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: getPartTimeEmployPermit,
    onSuccess,
    onError: (error) => {
      console.error('시간제 취업 허가서 조회 중 에러 발생:', error);
      onError?.(error);
    },
  });
  return { mutate, ...rest };
};

// 8.4 (유학생/고용주) 근로계약서 조회 api 통신 커스텀 훅
export const useGetStandardLaborContract = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RESTYPE<LaborContractDataResponse>) => void;
  onError?: (error: unknown) => void;
}) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: getStandardLaborContract,
    onSuccess,
    onError: (error) => {
      console.error('근로계약서 조회 중 에러 발생:', error);
      onError?.(error);
    },
  });
  return { mutate, ...rest };
};

// 8.5 (유학생/고용주) 통합신청서 조회 api 통신 커스텀 훅
export const useGetIntegratedApplication = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RESTYPE<IntegratedApplicationData>) => void;
  onError?: (error: unknown) => void;
}) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: getIntegratedApplication,
    onSuccess,
    onError: (error) => {
      console.error('통합신청서 조회 중 에러 발생:', error);
      onError?.(error);
    },
  });
  return { mutate, ...rest };
};
