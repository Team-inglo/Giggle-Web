import {
  getEmailValidation,
  getIdValidation,
  getUserType,
  logout,
  patchAuthentication,
  reIssueAuthentication,
  reIssueToken,
  signIn,
  signUp,
  tempSignUp,
  withdraw,
  signUpEmployer,
  getPolicy,
  reIssuePassword,
  patchPassword,
  postRegistrationNumberValidation,
  patchDeviceToken,
  postValidatePassword,
} from '@/api/auth';
import {
  AuthenticationResponse,
  ChangePasswordRequest,
  PolicyResponse,
  SignInResponse,
  SignUpResponse,
  TempSignUpResponse,
} from '@/types/api/auth';
import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteTemporaryToken,
  setAccessToken,
  setRefreshToken,
  setTemporaryToken,
} from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import { useUserInfoforSigninStore } from '@/store/signup';
import { useEmailTryCountStore } from '@/store/signup';
import { ExternalRESTYPE, RESTYPE } from '@/types/api/common';
import { clearAllStore } from '@/utils/clearAllStore';
import { TermType } from '@/types/api/users';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { smartNavigate } from '@/utils/application';

/**
 * 로그인 프로세스를 처리하는 커스텀 훅
 *
 * @function useSignIn
 * @returns {UseMutationResult} Tanstack Query의 useMutation 결과
 *
 * @description
 * 이 훅은 로그인 과정을 관리하며 다음과 같은 기능을 수행합니다:
 * 1. signIn 함수를 사용하여 로그인 요청을 보냅니다.
 * 2. 로그인 성공 시 액세스 토큰을 저장하고 홈페이지로 이동합니다.
 * 3. 로그인 실패 시 로그인 페이지로 리다이렉트합니다.
 *
 * @example
 * const { mutate: signIn, isLoading } = useSignIn();
 *
 * const handleSubmit = (data) => {
 *   signIn(data);
 * };
 *
 * if (isLoading) return <LoadingSpinner />;
 *
 * return <LoginForm onSubmit={handleSubmit} />;
 */

// 1.1 사용자 로그인 훅
export const useSignIn = () => {
  const navigate = useNavigate();
  const { updateId, updatePassword } = useUserInfoforSigninStore();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);

        updateId('');
        updatePassword('');

        // 앱에서 FCM 토큰 요청
        sendReactNativeMessage({ type: 'RECEIVE_TOKEN' });

        // 새로고침 전에 지연 추가
        smartNavigate(navigate, '/splash');
      }
    },
    onError: () => {
      alert('아이디 혹은 비밀번호를 다시 확인해주세요.');
    },
  });
};

// 1.2 사용자 로그아웃 훅
export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: (data: RESTYPE<null>) => {
      if (data.success) {
        // 토큰 삭제
        deleteAccessToken();
        deleteRefreshToken();
        // store 전역 변수 초기화
        clearAllStore();
        // 스플래시 이동
        smartNavigate(navigate, '/splash');
      }
    },
    onError: () => {
      alert('로그아웃을 다시 시도해주세요.');
      smartNavigate(navigate, '/profile');
    },
  });
};

// 1.3 JWT 재발급 훅
export const useReIssueToken = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: reIssueToken,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
        // 앱에서 FCM 토큰 요청
        sendReactNativeMessage({ type: 'RECEIVE_TOKEN' });
        smartNavigate(navigate, '/splash');
      }
    },
    onError: () => {
      alert('만료되었습니다. 다시 로그인해주세요.');
      navigate('/signin');
    },
  });
};

// 1.4 디바이스 토큰 갱신 훅
export const usePatchDeviceToken = () => {
  return useMutation({
    mutationFn: patchDeviceToken,
    onError: (error: Error) => {
      console.error('디바이스 토큰 갱신에 실패했습니다.');
      console.log(error);
    },
  });
};

// 2.1 아이디 중복검사 훅
export const useGetIdValidation = (userId: string) => {
  return useQuery({
    queryKey: ['validId', userId],
    queryFn: () => getIdValidation(userId),
  });
};

// 2.2 이메일 중복검사 훅
export const useGetEmailValidation = (userEmail: string) => {
  return useQuery({
    queryKey: ['validEmail', userEmail],
    queryFn: () => getEmailValidation(userEmail),
  });
};

// 2.3 유학생/고용주 판단 훅 ** 로그인 이후 호출
export const useGetUserType = () => {
  return useQuery({
    queryKey: ['userType'],
    queryFn: getUserType,
  });
};

// 2.4 기본 임시회원가입 훅
export const useTempSignUp = () => {
  const { updateTryCnt } = useEmailTryCountStore();
  return useMutation({
    mutationFn: tempSignUp,
    onSuccess: (data: RESTYPE<TempSignUpResponse>) => {
      if (data.success) {
        updateTryCnt(data.data.tryCnt);
      }
    },
    onError: (error) => {
      console.log('임시 회원가입 실패 : ', error.message);
    },
  });
};

// 2.5  기본 유저 회원가입 훅
export const useSignUp = (setSuccess: () => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data: RESTYPE<SignInResponse>) => {
      if (data.success) {
        deleteTemporaryToken();
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
        setSuccess();
      }
    },
    onError: () => {
      smartNavigate(navigate, '/splash');
    },
  });
};

// 2.6 고용주 회원가입 훅
export const useSignupEmployer = (setSuccess: () => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpEmployer,
    onSuccess: (data: RESTYPE<SignUpResponse>) => {
      if (data.success) {
        deleteTemporaryToken();
        setAccessToken(data.data.access_token);
        setRefreshToken(data.data.refresh_token);
        setSuccess();
      }
    },
    onError: () => {
      smartNavigate(navigate, '/splash');
    },
  });
};

// 2.7 이메일 인증코드 검증 훅
export const usePatchAuthentication = () => {
  return useMutation({
    mutationFn: patchAuthentication,
    onSuccess: (data: RESTYPE<AuthenticationResponse>) => {
      if (data.success) {
        setTemporaryToken(data.data.temporary_token);
      }
    },
    onError: (error) => {
      alert('인증코드를 다시 확인해주세요.');
      console.log(error);
    },
  });
};

// 2.8 이메일 인증코드 재전송 훅
export const useReIssueAuthentication = () => {
  const navigate = useNavigate();
  const { updateTryCnt } = useEmailTryCountStore();
  return useMutation({
    mutationFn: reIssueAuthentication,
    onSuccess: (data: RESTYPE<TempSignUpResponse>) => {
      if (data.success) {
        // 이메일 재발송 횟수 업데이트
        updateTryCnt(data.data.tryCnt);
      }
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: { code: number } }>;
      if (axiosError.response?.data.error.code === 42900) {
        alert('너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert(
          '인증코드 재발송이 실패하였습니다. 회원가입을 다시 시도해주세요.',
        );
      }
      smartNavigate(navigate, '/signup');
    },
  });
};

// 2.9 탈퇴하기 훅
export const useWithdraw = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: withdraw,
    onSuccess: (data: RESTYPE<null>) => {
      if (data.success) {
        // 토큰 삭제
        deleteAccessToken();
        deleteRefreshToken();
        // store 전역 변수 초기화
        clearAllStore();
        // 스플래시 이동
        navigate('/splash');
      }
    },
    onError: () => {
      alert('탈퇴에 실패하였습니다.');
      navigate('/splash');
    },
  });
};

// 2.10 임시 비밀번호 발급 및 메일 전송 훅
export const usePostReissuePassword = (
  options?: UseMutationOptions<RESTYPE<null>, Error>,
) => {
  return useMutation({
    mutationFn: reIssuePassword,
    onError: () => {
      alert('임시 비밀번호 발급에 실패하였습니다.');
    },
    ...options,
  });
};

// 2.11 비밀번호 변경 훅
export const usePatchPassword = (
  options?: UseMutationOptions<RESTYPE<null>, Error, ChangePasswordRequest>,
) => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  return useMutation({
    ...options,
    mutationFn: (passwords: ChangePasswordRequest) => {
      return patchPassword(passwords);
    },
    onError: () => {
      if (account_type === UserType.USER) {
        alert('현재 비밀번호를 다시 확인해주세요.');
        smartNavigate(navigate, '/profile/account');
      } else {
        alert('Wrong current password input. Try again.');
        smartNavigate(navigate, '/employer/profile/account');
      }
    },
  });
};

// 2.12 현재 비밀번호 확인
export const usePostValidatePassword = () => {
  return useMutation({
    mutationFn: postValidatePassword,
  });
};

// 11.1 약관 종류별 상세 조회하기
export const useGetPolicy = (
  options?: UseMutationOptions<
    RESTYPE<PolicyResponse>,
    Error,
    TermType // mutationFn의 parameter 타입
  >,
) => {
  return useMutation({
    mutationFn: getPolicy,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('약관 조회 중 에러 발생:', error);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

export const usePostRegistrationNumberValidation = (
  options?: UseMutationOptions<ExternalRESTYPE, Error, string>,
) => {
  return useMutation({
    mutationFn: (registrationNum: string) =>
      postRegistrationNumberValidation(registrationNum),
    ...options,
  });
};
