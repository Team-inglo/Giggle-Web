import { profileTranslation } from '@/constants/translation';
import { UserType } from '@/constants/user';
import { useWithdraw } from '@/hooks/api/useAuth';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { useUserStore } from '@/store/user';

type DeleteModalProps = {
  onDeleteButton: (value: boolean) => void;
};

const DeleteModal = ({ onDeleteButton }: DeleteModalProps) => {
  const { mutate: withdraw } = useWithdraw();
  const { account_type } = useUserStore();

  useBodyScrollLock(true);

  // 계정 삭제 훅
  const handleAccountDelete = () => {
    withdraw();
  };

  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center bg-[rgba(70,70,70,0.6)] z-50">
      <div className="w-[90%] max-w-[22rem] flex flex-col gap-8 bg-white rounded-[1.125rem] overflow-hidden">
        <div>
          <h1 className="pt-[1.125rem] pb-4 border-b-[0.5px] border-solid border-[#DCDCDC] text-center heading-18-semibold text-[#464646]">
            {
              profileTranslation.wantDeleteAccount[
                account_type === UserType.USER ? 'en' : 'ko'
              ]
            }
          </h1>
          <p className="pt-7 caption-12-regular text-[#656565] text-center px-14 break-keep">
            {
              profileTranslation.descriptionDelet[
                account_type === UserType.USER ? 'en' : 'ko'
              ]
            }
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg=[#F4F4F9] py-[1.125rem] w-[50%] flex justify-center items-center button-16-semibold text-[#656565]"
            onClick={() => onDeleteButton(false)}
          >
            {
              profileTranslation.cancel[
                account_type === UserType.USER ? 'en' : 'ko'
              ]
            }
          </button>
          <button
            className="bg-[#FEF387] py-[1.125rem] w-[50%] flex justify-center items-center button-16-semibold text-[#1E1926]"
            onClick={handleAccountDelete}
          >
            {
              profileTranslation.delete[
                account_type === UserType.USER ? 'en' : 'ko'
              ]
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
