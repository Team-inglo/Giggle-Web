import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation } from 'react-router-dom';
import { validateEmail } from '@/utils/signin';
import { signInputTranclation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useGetEmailValidation } from '@/hooks/api/useAuth';
import BottomButtonPanel from '../Common/BottomButtonPanel';
import { InputType } from '@/types/common/input';

type EmailInputProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

const EmailInput = ({ email, onEmailChange, onSubmit }: EmailInputProps) => {
  const { pathname } = useLocation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const { data: ValidationResponse } = useGetEmailValidation(email);

  useEffect(() => {
    const validateEmailAsync = async () => {
      if (!email) return; // 이메일이 없을 경우 바로 반환

      onEmailChange(email);

      // 이메일 형식 유효성 검사
      if (!validateEmail(email, setEmailError, pathname)) {
        setIsValid(false); // 유효성 검사 실패 시 버튼 비활성화
        return;
      }

      // 이메일 중복 검사 API 호출 결과 처리
      if (ValidationResponse && ValidationResponse.data.is_valid === false) {
        setEmailError(
          signInputTranclation.emailAvailability[isEmployer(pathname)],
        );
        setIsValid(false); // 중복 검사 실패 시 버튼 비활성화
      } else if (ValidationResponse && ValidationResponse.data.is_valid) {
        setEmailError(null); // email 중복 오류 메시지 초기화
        setIsValid(true); // 중복 검사 통과 시 버튼 활성화
      } else {
        setIsValid(false); // 예외처리
      }
    };

    validateEmailAsync();
  }, [email, pathname, ValidationResponse, onEmailChange]);

  const handleSignupClick = () => {
    if (!isValid) return;
    onSubmit();
  };

  return (
    <div className="w-full">
      <div className="title-1 pb-12">
        {signInputTranclation.enterEmail[isEmployer(pathname)]}
      </div>
      <div className="flex flex-col py-6">
        <div>
          <p className="py-2 px-1 text-sm font-normal text-[#171719]">
            {signInputTranclation.email[isEmployer(pathname)]}
          </p>
          <Input
            inputType={InputType.TEXT}
            placeholder={signInputTranclation.enterEmail[isEmployer(pathname)]}
            value={email}
            onChange={onEmailChange}
            canDelete={false}
            isInvalid={!isValid}
          />
          {emailError && (
            <p className="text-[#FF6F61] text-xs p-2">{emailError}</p>
          )}
        </div>
      </div>
      <BottomButtonPanel>
        <div className="w-full">
          <Button
            type="large"
            bgColor={isValid ? 'bg-[#1E1926]' : 'bg-[#F4F4F9]'}
            fontColor={isValid ? 'text-[#FEF387]' : 'text-[#BDBDBD]'}
            isBorder={false}
            title={signInputTranclation.continue[isEmployer(pathname)]}
            onClick={isValid ? handleSignupClick : undefined}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default EmailInput;
