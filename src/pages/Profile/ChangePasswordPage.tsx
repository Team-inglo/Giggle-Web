import { useState } from 'react';
import { usePatchPassword } from '@/hooks/api/useAuth';
import CurrentPasswordStep from '@/components/Profile/Password/CurrentPasswordStep';
import NewPasswordStep from '@/components/Profile/Password/NewPasswordStep';
import SuccessStep from '@/components/Profile/Password/SuccessStep';
import { validatedConfirmPassword, validatePassword } from '@/utils/signin';
import { useLocation } from 'react-router-dom';

type PasswordFieldType = 'currentPassword' | 'newPassword' | 'confirmPassword';

const ChangePasswordPage = () => {
  const { pathname } = useLocation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { mutate: changePassword } = usePatchPassword({
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
  });

  const handlePasswordChange = (field: PasswordFieldType, value: string) => {
    switch (field) {
      case 'currentPassword':
        setCurrentPassword(value);
        setPasswordError(null);
        break;

      case 'newPassword': {
        setNewPassword(value);
        // 새 비밀번호 유효성 검사
        const isNewPasswordValid = validatePassword(
          value,
          setNewPasswordError,
          pathname,
        );
        // 비밀번호 확인 재검증
        if (confirmPassword) {
          validatedConfirmPassword(
            value, // 새로운 비밀번호 값
            confirmPassword,
            setConfirmPasswordError,
            pathname,
          );
        }
        setIsValid(isNewPasswordValid && confirmPassword === value);
        break;
      }

      case 'confirmPassword': {
        setConfirmPassword(value);
        // 비밀번호 확인 유효성 검사
        const isConfirmValid = validatedConfirmPassword(
          newPassword,
          value,
          setConfirmPasswordError,
          pathname,
        );
        const isNewPasswordValid = validatePassword(
          newPassword,
          setNewPasswordError,
          pathname,
        );
        setIsValid(isNewPasswordValid && isConfirmValid);
        break;
      }
    }
  };

  const handleCurrentPasswordSubmit = () => {
    // 비밀번호 확인 api 호출
    // onSuccess
    setCurrentStep(2);
  };

  const handleChangePasswordSubmit = () => {
    changePassword({
      current_password: currentPassword,
      new_password: newPassword,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CurrentPasswordStep
            password={currentPassword}
            onPasswordChange={(value) =>
              handlePasswordChange('currentPassword', value)
            }
            onSubmit={handleCurrentPasswordSubmit}
            error={passwordError}
          />
        );
      case 2:
        return (
          <NewPasswordStep
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onNewPasswordChange={(value) =>
              handlePasswordChange('newPassword', value)
            }
            onConfirmPasswordChange={(value) =>
              handlePasswordChange('confirmPassword', value)
            }
            onSubmit={handleChangePasswordSubmit}
            newPasswordError={newPasswordError}
            setNewPasswordError={setNewPasswordError}
            confirmPasswordError={confirmPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
            isValid={isValid}
          />
        );
      case 3:
        return <SuccessStep />;
    }
  };

  return (
    <>
      {renderStep()}
    </>
  );
};

export default ChangePasswordPage;
