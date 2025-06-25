import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import {
  profileTranslation,
  signInputTranclation,
} from '@/constants/translation';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';
import CompleteModal from '@/components/Common/CompleteModal';
import { useLogout } from '@/hooks/api/useAuth';

const SuccessStep = () => {
  const { account_type } = useUserStore();
  const userLanguage = account_type === UserType.USER ? 'en' : 'ko';
  const { mutate: signout } = useLogout();

  return (
    <>
      <div className="w-full h-full min-h-[100vh]">
        <CompleteModal
          title={profileTranslation.completeTitle[userLanguage]}
          content={profileTranslation.completeContent[userLanguage]}
        />
        <BottomButtonPanel>
          <div className="w-full">
            <Button
              type="large"
              bgColor={'bg-surface-primary'}
              fontColor={'text-text-normal'}
              title={signInputTranclation.continue[userLanguage]}
              onClick={signout}
            />
          </div>
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default SuccessStep;
