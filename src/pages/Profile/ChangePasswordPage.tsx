import { useState } from 'react';
import { usePatchPassword, usePostValidatePassword } from '@/hooks/api/useAuth';
import CurrentPasswordStep from '@/components/Profile/Password/CurrentPasswordStep';
import NewPasswordStep from '@/components/Profile/Password/NewPasswordStep';
import SuccessStep from '@/components/Profile/Password/SuccessStep';
import { validatedConfirmPassword, validatePassword } from '@/utils/signin';
import { profileTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';

type PasswordFieldType = 'currentPassword' | 'newPassword' | 'confirmPassword';

const ChangePasswordPage = () => {
  const { account_type } = useUserStore();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isValidStep1, setIsValidStep1] = useState<boolean>(false);
  const [isValidStep2, setIsValidStep2] = useState<boolean>(false);

  const { mutateAsync: validateCurrentPassword } = usePostValidatePassword();

  const { mutate: changePassword } = usePatchPassword({
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
  });

  const handlePasswordChange = (field: PasswordFieldType, value: string) => {
    switch (field) {
      case 'currentPassword': {
        setCurrentPassword(value);
        const isNewPasswordValid = validatePassword(
          value,
          setPasswordError,
          isEmployerByAccountType(account_type),
        );
        setIsValidStep1(isNewPasswordValid);
        break;
      }
      case 'newPassword': {
        setNewPassword(value);
        // 새 비밀번호 유효성 검사
        const isNewPasswordValid = validatePassword(
          value,
          setNewPasswordError,
          isEmployerByAccountType(account_type),
        );
        // 비밀번호 확인 재검증
        if (confirmPassword) {
          validatedConfirmPassword(
            value, // 새로운 비밀번호 값
            confirmPassword,
            setConfirmPasswordError,
            isEmployerByAccountType(account_type),
          );
        }
        setIsValidStep2(isNewPasswordValid && confirmPassword === value);
        break;
      }

      case 'confirmPassword': {
        setConfirmPassword(value);
        // 비밀번호 확인 유효성 검사
        const isConfirmValid = validatedConfirmPassword(
          newPassword,
          value,
          setConfirmPasswordError,
          isEmployerByAccountType(account_type),
        );
        const isNewPasswordValid = validatePassword(
          newPassword,
          setNewPasswordError,
          isEmployerByAccountType(account_type),
        );
        setIsValidStep2(isNewPasswordValid && isConfirmValid);
        break;
      }
    }
  };

  const handleCurrentPasswordSubmit = async () => {
    const result = await validateCurrentPassword({
      password: currentPassword,
    });

    if (result.data.is_valid) setCurrentStep((prev) => prev + 1);
    else
      alert(
        profileTranslation.wrongPassword[isEmployerByAccountType(account_type)],
      );
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
            isValid={isValidStep1}
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
            isValid={isValidStep2}
          />
        );
      case 3:
        return <SuccessStep />;
    }
  };

  return <>{renderStep()}</>;
};

export default ChangePasswordPage;
