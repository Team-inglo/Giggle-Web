import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';

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
      hasHandlebar={false}
      isAvailableHidden={false}
      isShowBottomsheet={isShowBottomsheet}
    >
      <div className="w-full pt-2 px-2 pb-6 flex flex-col gap-6 items-center text-center">
        {account_type === UserType.OWNER ? (
          <>
            <h3 className="head-3 text-[#252525]">
              서버가 커피 타러 갔어요! ☕
            </h3>
            <p className="body-2 text-[#252525]">
              현재 서버가 원활하지 않습니다. <br />
              급한 일이시면 고객센터에 문의해 주세요!
            </p>
          </>
        ) : (
          <>
            <h3 className="head-3 text-[#252525]">
              The server went to grab a coffee! ☕
            </h3>
            <p className="body-2 text-[#252525]">
              The server is currently unavailable.
              <br />
              If it's urgent, please contact customer support.
            </p>
          </>
        )}
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
