import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { errorTranslation } from '@/constants/translation';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';

type ServerErrorBottomSheetPropsType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const ServerErrorBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: ServerErrorBottomSheetPropsType) => {
  const { account_type } = useUserStore();

  const handleContactCustomerSupport = () => {
    window.location.href = 'https://pf.kakao.com/_ixlCsn/chat';
    setIsShowBottomSheet(false);
  };

  const handleClickBackButton = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';

    setIsShowBottomSheet(false);
  };

  return (
    <BottomSheetLayout
      isAvailableHidden={false}
      isShowBottomsheet={isShowBottomsheet}
    >
      <div className="w-full pt-2 px-2 pb-6 flex flex-col gap-6 items-center text-center">
        <h3 className="heading-18-semibold text-[#252525]">
          {
            errorTranslation.serverErrorTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="body-14-regular text-[#252525]">
          {
            errorTranslation.serverErrorContent[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
      </div>
      <div className="w-full pt-3 flex flex-col gap-2">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title={
            account_type === UserType.OWNER
              ? '고객센터에 문의하기'
              : 'Contact Customer Support'
          }
          onClick={handleContactCustomerSupport}
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#F4F4F9]"
          fontColor="text-[#191919]"
          isBorder={false}
          title={account_type === UserType.OWNER ? '알겠어요' : 'Okay'}
          onClick={handleClickBackButton}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default ServerErrorBottomSheet;
