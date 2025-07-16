import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@/hooks/api/useAuth';
import { useUserInfoforSigninStore } from '@/store/signup';
import InputLayout from '@/components/WorkExperience/InputLayout';
import { InputType } from '@/types/common/input';
import ButtonText from '@/components/Common/ButtonText';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { Language } from '@/components/Common/HelperLabel';

const SigninInputSection = () => {
  const navigate = useNavigate();

  // ===== state =====
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isValid, setIsValid] = useState(false);

  const { mutate: signIn } = useSignIn();
  const { updateId, updatePassword } = useUserInfoforSigninStore();

  // useEmailVerification 훅 사용
  const {
    email: emailValue,
    emailError,
    handleEmailInput,
  } = useEmailVerification({
    language: Language.KO,
    context: 'signin',
  });

  // ===== handler =====
  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  // ====== Sign in API =======
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('serial_id', emailValue);
    formData.append('password', passwordValue);

    // 전역 상태 업데이트
    updateId(emailValue);
    updatePassword(passwordValue);

    // api 훅 호출
    signIn(formData);
  };

  // 폼 유효성 검사
  useEffect(() => {
    setIsValid(!emailError && !!passwordValue);
  }, [emailError, passwordValue]);

  return (
    <div className="w-full px-4 flex flex-grow flex-col justify-between">
      <div className="flex flex-col gap-6 relative">
        <InputLayout title="이메일">
          <Input
            inputType={InputType.TEXT}
            placeholder="이메일을 입력해주세요"
            value={emailValue}
            onChange={handleEmailInput}
            canDelete={false}
          />
          {emailError && (
            <p className="absolute text-text-error caption-12-semibold px-1 py-2">
              {emailError}
            </p>
          )}
        </InputLayout>
        <InputLayout title="비밀번호">
          <Input
            inputType={InputType.PASSWORD}
            placeholder="Enter password"
            value={passwordValue}
            onChange={handlePasswordChange}
            canDelete={false}
          />
        </InputLayout>
        <div className="flex items-center justify-center mt-6 h-3">
          <ButtonText
            text="계정을 잊었어요"
            variant={ButtonText.Variant.ALTERNATIVE}
            onClick={() => navigate('/find-password')}
          />
          <span className="mx-6 bg-border-alternative h-3 w-[0.0625rem] align-middle inline-block" />
          {/* 회원가입 화면 이동 */}

          <ButtonText
            text="회원가입 하러가기"
            variant={ButtonText.Variant.PRIMARY}
            onClick={() => navigate('/signup')}
          />
        </div>
      </div>
      <BottomButtonPanel>
        <Button
          type={isValid ? Button.Type.PRIMARY : Button.Type.DISABLED}
          size={Button.Size.LG}
          isFullWidth={true}
          title="로그인"
          onClick={isValid ? handleSubmit : undefined}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default SigninInputSection;
