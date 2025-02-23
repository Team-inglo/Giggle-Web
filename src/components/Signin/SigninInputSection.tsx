import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/signin';
import { useGetEmailValidation, useSignIn } from '@/hooks/api/useAuth';
import { useUserInfoforSigninStore } from '@/store/signup';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { signInputTranclation } from '@/constants/translation';

const SigninInputSection = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ===== state =====
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const { mutate: signIn } = useSignIn();
  const { data: ValidationResponse } = useGetEmailValidation(emailValue);
  const { updateId, updatePassword } = useUserInfoforSigninStore();

  // ===== handler =====
  const handleIdChange = (value: string) => {
    setEmailValue(value);
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  // ====== Sign in API =======
  const handleSubmit = async () => {
    // signIn({ serial_id: idValue, password: passwordValue });
    const formData = new FormData();
    formData.append('serial_id', emailValue);
    formData.append('password', passwordValue);

    // 전역 상태 업데이트
    updateId(emailValue);
    updatePassword(passwordValue);

    // api 훅 호출
    signIn(formData);
  };

  useEffect(() => {
    const validateEmailAsync = async () => {
      if (!emailValue) return; // 이메일이 없을 경우 바로 반환

      // 이메일 형식 유효성 검사
      if (!validateEmail(emailValue, setEmailError, '/employer/signin')) {
        return;
      }

      // 이메일 중복 검사 API 호출 결과 처리
      if (ValidationResponse && ValidationResponse.data.is_valid === true) {
        setEmailError(signInputTranclation.emailWrong['ko']);
      } else if (ValidationResponse && ValidationResponse.data.is_valid) {
        setEmailError(null); // email 중복 오류 메시지 초기화
      }
    };

    validateEmailAsync();
  }, [emailValue, pathname, ValidationResponse, setEmailValue]);

  // 모든 필드의 유효성 검사 후, Sign In 버튼 활성화
  useEffect(() => {
    if (validateEmail(emailValue, setEmailError, '/employer/signin')) {
      setIsValid(true);
    }
  }, [emailValue, passwordValue]);

  return (
    <div className="w-full px-4 flex flex-grow flex-col justify-between">
      <div className="flex flex-col gap-4">
        <InputLayout isEssential title="이메일">
          <Input
            inputType="TEXT"
            placeholder="이메일을 입력해주세요"
            value={emailValue}
            onChange={handleIdChange}
            canDelete={false}
          />
          {emailError && (
            <p className="text-[#FF6F61] text-xs p-2">{emailError}</p>
          )}
        </InputLayout>
        <InputLayout isEssential title="비밀번호">
          <Input
            inputType="PASSWORD"
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
          />
        </InputLayout>
        <div className="flex w-full justify-center">
          <button
            className="flex items-center justify-center px-2 py-1 text-text-alternative body-3 bg-surface-secondary rounded"
            onClick={() => navigate('/find-password')} //TODO: 비밀번호 찾기 화면 이동
          >
            비밀번호를 모르겠어요 😓
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-[#7D8A95] text-sm font-normal">
            계정이 아직 없으신가요?
          </p>
          {/* 회원가입 화면 이동 */}
          <button
            className="flex items-center justify-center px-2 py-1.5 border-border-alternative border text-text-normal caption rounded"
            onClick={() => navigate('/signup')}
          >
            회원가입 하러가기
          </button>
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-white/80 to-white flex flex-row items-start justify-start pb-[3.125rem] pt-3 box-border text-center button-1 text-[#1e1926] z-10">
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col items-center gap-6">
            <Button
              type="large"
              bgColor={isValid ? 'bg-surface-primary' : 'bg-surface-secondary'}
              fontColor={isValid ? 'text-text-normal' : 'text-text-disabled'}
              isBorder={false}
              title="로그인"
              onClick={isValid ? handleSubmit : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninInputSection;
