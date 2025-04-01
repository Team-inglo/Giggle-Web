import {
  AuthenticationRequest,
  AuthenticationResponse,
  ChangePasswordRequest,
  CurrentPasswordRequest,
  PolicyResponse,
  ReIssueAuthenticationRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  TempSignUpRequest,
  TempSignUpResponse,
  UserTypeResponse,
  ValidationResponse,
} from '@/types/api/auth';
import { api, externalAPI } from '@/api/index.ts';
import { apiWithoutAuth } from '@/api/index.ts';
import { ExternalRESTYPE, RESTYPE } from '@/types/api/common';
import axios from 'axios';
import { TermType } from '@/types/api/users';

/**
 * 사용자 로그인을 처리하는 함수
 *
 * @async
 * @function signIn
 * @param {SignInRequest} signinInfo - 로그인에 필요한 사용자 정보
 * @returns {Promise<SignInResponse>} 로그인 결과 및 사용자 정보
 * @throws {Error} API 요청 실패 시 에러를 throw
 *
 * @description
 * 이 함수는 주로 useSignIn 커스텀 훅 내부에서 사용됩니다.
 * 직접 호출하기보다는 useSignIn 훅을 통해 사용하는 것이 권장됩니다.
 *
 * @see useSignIn
 *
 * @example useSignIn 훅을 통한 사용 (권장)
 * const { mutate: signIn } = useSignIn();
 * signIn({ email: 'user@example.com', password: 'password123' });
 */

// 1.1 사용자 로그인
export const signIn = async (
  signinInfo: SignInRequest,
): Promise<RESTYPE<SignInResponse>> => {
  const response = await apiWithoutAuth.post('/auth/login', signinInfo);
  return response.data;
};

// 1.2 사용자 로그아웃
export const logout = async (): Promise<RESTYPE<null>> => {
  const response = await api.post('/auth/logout');
  return response.data;
};

// 1.3 JWT 재발급
// (1) refresh token을 헤더에 포함하여 axios instance 생성
const apiWithRefreshToken = axios.create({
  baseURL: import.meta.env.VITE_APP_API_GIGGLE_API_BASE_URL, // 기본 URL을 api와 동일하게 설정
});
// (2) 재발급 api 호출
export const reIssueToken = async (
  refreshToken: string,
): Promise<RESTYPE<SignInResponse>> => {
  //
  const response = await apiWithRefreshToken.post(
    '/auth/reissue/token',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return response.data;
};

// 1.4 (유학생/고용주) 디바이스 토큰 갱신하기
export const patchDeviceToken = async ({
  deviceToken,
  deviceId,
}: {
  deviceToken: string;
  deviceId: string;
}): Promise<RESTYPE<null>> => {
  try {
    const response = await api.patch('/auth/device-token', {
      device_token: deviceToken,
      device_id: deviceId,
    });
    return response.data;
  } catch (error: unknown) {
    // 에러 타입 명시적 처리
    if (axios.isAxiosError(error)) {
      // Axios 에러인 경우
      console.error('디바이스 토큰 갱신 API 오류:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else if (error instanceof Error) {
      // 일반 Error 객체인 경우
      console.error('디바이스 토큰 갱신 일반 오류:', error.message);
    } else {
      // 기타 알 수 없는 오류
      console.error('디바이스 토큰 갱신 알 수 없는 오류:', error);
    }
    throw error; // 오류 다시 던지기
  }
};

// 2.1 아이디 중복검사
export const getIdValidation = async (
  userId: string,
): Promise<RESTYPE<ValidationResponse>> => {
  const response = await apiWithoutAuth.get(
    `/auth/validations/id?id=${userId}`,
  );
  return response.data;
};

// 2.2 이메일 중복검사
export const getEmailValidation = async (
  userEmail: string,
): Promise<RESTYPE<ValidationResponse>> => {
  const response = await apiWithoutAuth.get(
    `/auth/validations/email?email=${userEmail}`,
  );
  return response.data;
};

// 2.3 유학생/고용주 판단 ** 로그인 이후 호출
export const getUserType = async (): Promise<RESTYPE<UserTypeResponse>> => {
  const response = await api.get('/auth/briefs');
  return response.data;
};

// 2.4 기본 임시회원가입
export const tempSignUp = async (
  signupInfo: TempSignUpRequest,
): Promise<RESTYPE<TempSignUpResponse>> => {
  const response = await apiWithoutAuth.post('/auth/sign-up', signupInfo);
  return response.data;
};

// 2.5  기본 유저 회원가입
export const signUp = async (
  signupInfo: SignUpRequest,
): Promise<RESTYPE<SignUpResponse>> => {
  const response = await apiWithoutAuth.post('/auth/users', signupInfo);
  return response.data;
};

// 2.7 이메일 인증코드 검증
export const patchAuthentication = async (
  info: AuthenticationRequest,
): Promise<RESTYPE<AuthenticationResponse>> => {
  const response = await apiWithoutAuth.patch(
    '/auth/validations/authentication-code',
    info,
  );
  return response.data;
};

// 2.8 이메일 인증코드 재전송
export const reIssueAuthentication = async (
  info: ReIssueAuthenticationRequest,
): Promise<RESTYPE<TempSignUpResponse>> => {
  const response = await apiWithoutAuth.patch(
    '/auth/reissue/authentication-code',
    info,
  );
  return response.data;
};

// 2.9 탈퇴하기
export const withdraw = async (): Promise<RESTYPE<null>> => {
  const response = await api.delete('/auth');
  return response.data;
};

// 2.10 임시 비밀번호 발급 및 메일 전송
export const reIssuePassword = async (): Promise<RESTYPE<null>> => {
  const temporaryToken = localStorage.getItem('temporary_token'); // 로컬 스토리지에서 토큰 가져오기

  const response = await apiWithoutAuth.post(
    '/auth/reissue/password',
    {}, // 빈 객체로 request body 유지
    {
      headers: {
        Authorization: `Bearer ${temporaryToken}`, // 헤더에 토큰 추가
      },
    },
  );
  return response.data;
};

// 2.11 비밀번호 변경
export const patchPassword = async (
  passwords: ChangePasswordRequest,
): Promise<RESTYPE<null>> => {
  const response = await api.patch('/auth/password', passwords);
  return response.data;
};

// 2.12 현재 비밀번호 확인
export const postValidatePassword = async (
  password: CurrentPasswordRequest,
): Promise<RESTYPE<ValidationResponse>> => {
  const response = await api.post('/auth/validations/password', password);
  return response.data;
};

// 고용주 회원가입
export const signUpEmployer = async (
  signupInfo: FormData,
): Promise<RESTYPE<SignUpResponse>> => {
  const response = await api.post(`/auth/owners`, signupInfo);
  return response.data;
};

// 11.1 약관 상세조회
export const getPolicy = async (
  termType: TermType,
): Promise<RESTYPE<PolicyResponse>> => {
  const response = await apiWithoutAuth.get(`/terms/${termType}/details`);
  return response.data;
};

export const postRegistrationNumberValidation = async (
  registrationNumber: string,
): Promise<ExternalRESTYPE> => {
  const response = await externalAPI.post(
    `/status?serviceKey=${import.meta.env.VITE_APP_EXTERNAL_API_KEY}`,
    {
      b_no: [registrationNumber], // registrationNumber를 배열 형태로 b_no 속성에 담아 전송
    },
  );
  return response.data;
};
