import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';
import {
  profileTranslation,
  signInputTranclation,
} from '@/constants/translation';
import InputLayout from '@/components/WorkExperience/InputLayout';
import Input from '@/components/Common/Input';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { InputType } from '@/types/common/input';

interface NewPasswordStepProps {
  newPassword: string;
  confirmPassword: string;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: () => void;
  newPasswordError: string | null;
  setNewPasswordError: (value: string | null) => void;
  confirmPasswordError: string | null;
  setConfirmPasswordError: (value: string | null) => void;
  isValid: boolean;
}

const NewPasswordStep = ({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  newPasswordError,
  confirmPasswordError,
  isValid,
}: NewPasswordStepProps) => {
  const { account_type } = useUserStore();
  const userLanguage = account_type === UserType.USER ? 'en' : 'ko';
  const navigate = useNavigate();
  // password 유효성 검사
  return (
    <>
      <BaseHeader
        hasBackButton
        onClickBackButton={() => navigate('/profile/account')}
        hasMenuButton={false}
        title={
          account_type === UserType.USER ? 'Change Password' : '비밀번호 변경'
        }
      />
      <div className="w-full h-full min-h-[100vh] px-4 ">
        <div className="title-1 break-keep my-[3.125rem] w-full">
          <p className="h-20">
            {profileTranslation.enterYourPassword[userLanguage]}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <InputLayout
            isEssential
            title={profileTranslation.newPassword[userLanguage]}
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={profileTranslation.enterNewPassword[userLanguage]}
              value={newPassword}
              onChange={onNewPasswordChange}
              canDelete={false}
            />
            {newPasswordError && (
              <p className="text-[#FF6F61] text-xs p-2">{newPasswordError}</p>
            )}
          </InputLayout>
          <InputLayout
            isEssential
            title={profileTranslation.confirmPassword[userLanguage]}
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                profileTranslation.enterConfirmPassword[userLanguage]
              }
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              canDelete={false}
            />
            {confirmPasswordError && (
              <p className="text-[#FF6F61] text-xs p-2">
                {confirmPasswordError}
              </p>
            )}
          </InputLayout>
        </div>

        <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-md">
          <div className="flex flex-col divide-y divide-gray-200"></div>
        </div>
        <BottomButtonPanel>
          <div className="w-full">
            <Button
              type="large"
              bgColor={isValid ? 'bg-surface-primary' : 'bg-surface-secondary'}
              fontColor={isValid ? 'text-text-normal' : 'text-text-disabled'}
              isBorder={false}
              title={signInputTranclation.continue[userLanguage]}
              onClick={isValid ? onSubmit : undefined}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default NewPasswordStep;
