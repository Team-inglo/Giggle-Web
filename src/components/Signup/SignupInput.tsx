import { useEffect, useState } from 'react';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import { useLocation } from 'react-router-dom';
import {
  validatedConfirmPassword,
  validateId,
  validatePassword,
} from '@/utils/signin';
import { isEmployer } from '@/utils/signup';
import { signInputTranclation } from '@/constants/translation';
import { useGetIdValidation } from '@/hooks/api/useAuth';
import BottomButtonPanel from '../Common/BottomButtonPanel';

type signupInputProps = {
  id: string;
  password: string;
  onIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignUpClick: () => void;
};

const SignupInput = ({
  onSignUpClick,
  id,
  password,
  onIdChange,
  onPasswordChange,
}: signupInputProps) => {
  const { pathname } = useLocation();

  // // ===== state =====
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [idError, setIdError] = useState<string | null>();
  const [passwordError, setPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isValid, setIsValid] = useState(false);
  const [idValid, setIdValid] = useState(false);

  const { data: validationResponse } = useGetIdValidation(id);

  // ID 검사
  useEffect(() => {
    if (!id) {
      setIdError(null);
      setIdValid(false);
      return;
    }
    onIdChange(id);

    // ID 유효성 검사
    if (validateId(id, setIdError, pathname)) {
      setIdValid(true);
    }

    // ID 중복 검사
    const validateIdAsync = async () => {
      if (validationResponse && validationResponse.data.is_valid === false) {
        setIdError(signInputTranclation.idAvailability[isEmployer(pathname)]);
        setIdValid(false);
      }
    };

    validateIdAsync();
  }, [id, onIdChange, validationResponse, idError, idValid]);

  // password 유효성 검사
  useEffect(() => {
    if (password) {
      onPasswordChange(password);
      validatePassword(password, setPasswordError, pathname);
    }
  }, [password, pathname, onPasswordChange]);

  // password 일치 유효성 검사
  useEffect(() => {
    if (confirmPasswordValue) {
      validatedConfirmPassword(
        password,
        confirmPasswordValue,
        setConfirmPasswordError,
        pathname,
      );
    }
  }, [password, confirmPasswordValue, pathname]);

  // 모든 필드의 유효성 검사 후, Continue 버튼 활성화
  useEffect(() => {
    if (
      validateId(id, setIdError, pathname) &&
      validatePassword(password, setPasswordError, pathname) &&
      confirmPasswordValue == password
    ) {
      setIsValid(true);
    }
  }, [id, password, confirmPasswordValue]);

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPasswordValue(value);
  };

  return (
    <div className="w-full">
      <div className="title-1 pb-12">
        {signInputTranclation.signup[isEmployer(pathname)]}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div>
            <p className="py-2 px-1 body-2 text-[#656565]">
              {signInputTranclation.id[isEmployer(pathname)]}
            </p>
            <Input
              inputType="TEXT"
              placeholder={signInputTranclation.enterId[isEmployer(pathname)]}
              value={id}
              onChange={onIdChange}
              canDelete={false}
              isInvalid={!idValid}
            />
            {!idValid && (
              <p className="text-[#FF6F61] text-xs p-2">{idError}</p>
            )}
          </div>
          <div>
            <p className="py-2 px-1 body-2 text-[#656565]">
              {signInputTranclation.password[isEmployer(pathname)]}
            </p>
            <Input
              inputType="PASSWORD"
              placeholder={
                signInputTranclation.enterPassword[isEmployer(pathname)]
              }
              value={password}
              onChange={onPasswordChange}
              canDelete={false}
              isInvalid={passwordError ? true : false}
            />
            {passwordError && (
              <p className="text-[#FF6F61] text-xs p-2">{passwordError}</p>
            )}
          </div>
          <div>
            <p className="py-2 px-1 body-2 text-[#656565]">
              {signInputTranclation.confirmPassword[isEmployer(pathname)]}
            </p>
            <Input
              inputType="PASSWORD"
              placeholder={
                signInputTranclation.enterConfirmPassword[isEmployer(pathname)]
              }
              value={confirmPasswordValue}
              onChange={handleConfirmPasswordChange}
              canDelete={false}
              isInvalid={confirmPasswordError ? true : false}
            />
            {confirmPasswordError && (
              <p className="text-[#FF6F61] text-xs p-2">
                {confirmPasswordError}
              </p>
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
              onClick={isValid ? onSignUpClick : undefined}
            />
          </div>
        </BottomButtonPanel>
      </div>
      {/* 소셜은 잠깐 제외 */}
      {/* 
      <SigninSocialButtons />
      */}
    </div>
  );
};

export default SignupInput;
