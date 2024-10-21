import { signIn, signUp } from '@/api/auth';
import { SignInResponse } from '@/types/api/auth';
import { setAccessToken } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

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

export const useSignIn = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: SignInResponse) => {
      setAccessToken(data.access_token);
      navigate('/');
    },
    onError: () => {
      navigate('/signin');
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data: SignInResponse) => {
      setAccessToken(data.access_token);
      navigate('/information');
    },
    onError: () => {
      navigate('/signin');
    },
  });
};