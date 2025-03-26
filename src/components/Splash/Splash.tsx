import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SplashIcon from '@/assets/icons/GiggleSplash.svg?react';
import { getAccessToken, getRefreshToken } from '@/utils/auth';
import {
  useGetUserType,
  useReIssueToken,
  useSignIn,
} from '@/hooks/api/useAuth';
import { useUserStore } from '@/store/user';
import { useUserInfoforSigninStore } from '@/store/signup';

const Splash = () => {
  const navigate = useNavigate();
  const { updateAccountType, updateName } = useUserStore();
  const { id, password } = useUserInfoforSigninStore();

  const { data: userTypeResponse } = useGetUserType();
  const { mutate: reIssueToken } = useReIssueToken();
  const { mutate: signin } = useSignIn();

  // 회원가입 직후 이동된 user의 경우 signin 수행
  useEffect(() => {
    if (id && password) {
      console.log('스플래시 id, password 존재');

      const signinData = new FormData();
      signinData.append('serial_id', id);
      signinData.append('password', password);

      signin(signinData);
    }
  }, [id, password]);

  // 로그인/로그아웃/탈퇴시 유저 상태 확인
  useEffect(() => {
    const handleApiCall = async () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      try {
        if (!access && !refresh) {
          setGuest();
        }

        if (!access && refresh) {
          if (userTypeResponse?.error?.code === 401) {
            reIssueToken(refresh);
          } else {
            setGuest();
          }
        }

        if (access && refresh) {
          if (userTypeResponse?.success) {
            const { account_type, name } = userTypeResponse.data;
            updateAccountType(account_type);
            updateName(name);
            console.log('유저 정보 업데이트');
          } else {
            setGuest();
          }
        }
      } catch (error) {
        console.error(error);
        alert('로그인 오류입니다 다시 시도해주세요');
        setGuest();
      } finally {
        // 스플래시 화면 2초간 유지 후 홈으로 이동
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate('/');
      }
    };

    handleApiCall();
  }, [userTypeResponse]);

  // 비로그인 상태 설정 함수
  const setGuest = () => {
    updateAccountType(undefined);
    updateName('');
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#FEF387] flex justify-center items-center">
      <SplashIcon />
    </div>
  );
};

export default Splash;
