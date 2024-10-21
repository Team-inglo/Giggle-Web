import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@/types/api/auth';
import { api } from './index.ts';

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

export const signIn = async (
  signinInfo: SignInRequest,
): Promise<SignInResponse> => {
  const response = await api.post(`/auth/sign-in`, signinInfo);
  return response.data;
};

export const signUp = async (signupInfo : SignUpRequest): Promise<SignUpResponse> => {
  const response = await api.post(`/auth/users`, signupInfo);
  return response.data;
}