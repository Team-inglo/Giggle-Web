import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateId, validatePassword } from '@/utils/signin';
import { useSignIn } from '@/hooks/api/useAuth';
import { useUserInfoforSigninStore } from '@/store/signup';
import BottomButtonPanel from '../Common/BottomButtonPanel';

const SigninInputSection = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ===== state =====
  const [idValue, setIdValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [idError, setIdError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const { mutate: signIn } = useSignIn();
  const { updateId, updatePassword } = useUserInfoforSigninStore();

  // ===== handler =====
  const handleIdChange = (value: string) => {
    setIdValue(value);
    validateId(value, setIdError, pathname); // ID 입력 시 유효성 검사
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
    validatePassword(value, setPasswordError, pathname); // 비밀번호 입력 시 유효성 검사
  };

  // ====== Sign in API =======
  const handleSubmit = async () => {
    // signIn({ serial_id: idValue, password: passwordValue });
    const formData = new FormData();
    formData.append('serial_id', idValue);
    formData.append('password', passwordValue);

    // 전역 상태 업데이트
    updateId(idValue);
    updatePassword(passwordValue);

    // api 훅 호출
    signIn(formData);
  };

  // 모든 필드의 유효성 검사 후, Sign In 버튼 활성화
  useEffect(() => {
    if (
      validateId(idValue, setIdError, pathname) &&
      validatePassword(passwordValue, setPasswordError, pathname)
    ) {
      setIsValid(true);
    }
  }, [idValue, passwordValue]);

  return (
    <div className="w-full px-6 flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">ID</p>
          <Input
            inputType="TEXT"
            placeholder="Enter ID"
            value={idValue}
            onChange={handleIdChange}
            canDelete={false}
            isInvalid={!!idError} // 오류가 있으면 Input 컴포넌트에 반영
          />
          {idError && <p className="text-[#FF6F61] text-xs p-2">{idError}</p>}
        </div>
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">
            Password
          </p>
          <Input
            inputType="PASSWORD"
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
            isInvalid={!!passwordError} // 오류가 있으면 Input 컴포넌트에 반영
          />
          {passwordError && (
            <p className="text-[#FF6F61] text-xs p-2">{passwordError}</p>
          )}
        </div>
        {/* TODO: 비밀번호 찾기 화면 이동 (아직 구현 안 해서 가림) */}
        {/* 
        <button className="w-full text-end text-[#1E1926] text-xs font-normal">
          Forgot Password?
        </button>
        */}
      </div>
      <BottomButtonPanel>
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[#7D8A95] text-sm font-normal">
              Don't have an account?
            </p>
            {/* 회원가입 화면 이동 */}
            <button
              className="text-[#000] text-sm font-semibold"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </button>
          </div>
          <Button
            type="large"
            bgColor={isValid ? 'bg-[#000]' : 'bg-[#F4F4F9]'}
            fontColor={isValid ? 'text-[#FEF387]' : 'text-[#BDBDBD]'}
            isBorder={false}
            title="Sign In"
            onClick={isValid ? handleSubmit : undefined}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default SigninInputSection;
