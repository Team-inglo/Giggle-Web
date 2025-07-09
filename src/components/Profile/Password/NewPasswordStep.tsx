import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useUserStore } from '@/store/user';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/constants/user';
import {
  profileTranslation,
  signInputTranslation,
} from '@/constants/translation';
import InputLayout from '@/components/WorkExperience/InputLayout';
import Input from '@/components/Common/Input';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import { InputType } from '@/types/common/input';
import { isEmployerByAccountType } from '@/utils/signup';

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
  const navigate = useNavigate();

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
        <div className="heading-28-semibold break-keep my-[3.125rem] w-full">
          <p className="h-20">
            {
              profileTranslation.enterYourPassword[
                isEmployerByAccountType(account_type)
              ]
            }
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <InputLayout
            title={
              profileTranslation.newPassword[
                isEmployerByAccountType(account_type)
              ]
            }
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                profileTranslation.enterNewPassword[
                  isEmployerByAccountType(account_type)
                ]
              }
              value={newPassword}
              onChange={onNewPasswordChange}
              canDelete={false}
            />
            {newPasswordError && (
              <p className="text-[#FF6F61] text-xs p-2">{newPasswordError}</p>
            )}
          </InputLayout>
          <InputLayout
            title={
              profileTranslation.confirmPassword[
                isEmployerByAccountType(account_type)
              ]
            }
          >
            <Input
              inputType={InputType.PASSWORD}
              placeholder={
                profileTranslation.enterConfirmPassword[
                  isEmployerByAccountType(account_type)
                ]
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
              title={
                signInputTranslation.continue[
                  isEmployerByAccountType(account_type)
                ]
              }
              onClick={isValid ? onSubmit : undefined}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default NewPasswordStep;
