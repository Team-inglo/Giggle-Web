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
        <InputLayout
          title={
            profileTranslation.currentPassword[
              isEmployerByAccountType(account_type)
            ]
          }
        >
          <Input
            inputType={InputType.PASSWORD}
            placeholder={
              profileTranslation.enterCurrentPassword[
                isEmployerByAccountType(account_type)
              ]
            }
            value={password}
            onChange={onPasswordChange}
            canDelete={false}
          />
          {error && <p className="text-text-error text-xs p-2">{error}</p>}
        </InputLayout>
        <div className="flex flex-col gap-4 px-4 pb-4 bg-white rounded-md">
          <div className="flex flex-col divide-y divide-gray-200"></div>
        </div>
        <BottomButtonPanel>
          <div className="w-full">
            <Button
              type={
                password?.length > 0
                  ? Button.Type.PRIMARY
                  : Button.Type.DISABLED
              }
              size={Button.Size.LG}
              isFullWidth
              title={
                signInputTranslation.continue[
                  isEmployerByAccountType(account_type)
                ]
              }
              onClick={onSubmit}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default CurrentPasswordStep;
