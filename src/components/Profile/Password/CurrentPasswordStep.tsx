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

interface CurrentPasswordStepProps {
  password: string;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  error: string | null;
}

const CurrentPasswordStep = ({
  password,
  onPasswordChange,
  onSubmit,
  error,
}: CurrentPasswordStepProps) => {
  const { account_type } = useUserStore();
  const userLanguage = account_type === UserType.USER ? 'en' : 'ko';
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
        <div className="title-1 break-keep my-[3.125rem] w-full">
          <p className="h-20">
            {profileTranslation.enterYourPassword[userLanguage]}
          </p>
        </div>
        <InputLayout
          isEssential
          title={profileTranslation.currentPassword[userLanguage]}
        >
          <Input
            inputType={InputType.PASSWORD}
            placeholder={profileTranslation.enterCurrentPassword[userLanguage]}
            value={password}
            onChange={onPasswordChange}
            canDelete={false}
          />
          {error && <p className="text-[#FF6F61] text-xs p-2">{error}</p>}
        </InputLayout>
        <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-md">
          <div className="flex flex-col divide-y divide-gray-200"></div>
        </div>
        <BottomButtonPanel>
          <div className="w-full">
            <Button
              type="large"
              bgColor={
                password !== '' ? 'bg-surface-primary' : 'bg-surface-secondary'
              }
              fontColor={
                password !== '' ? 'text-text-normal' : 'text-text-disabled'
              }
              isBorder={false}
              title={signInputTranclation.continue[userLanguage]}
              onClick={password !== '' ? onSubmit : undefined}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default CurrentPasswordStep;
