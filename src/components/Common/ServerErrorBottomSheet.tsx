import Button from '@/components/Common/Button';
import { errorTranslation } from '@/constants/translation';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';
import { BottomSheet } from '@/components/Common/BottomSheet';

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
    <BottomSheet
      isAvailableHidden={false}
      isShowBottomsheet={isShowBottomsheet}
    >
      <BottomSheet.Header
        title={
          errorTranslation.serverErrorTitle[
            isEmployerByAccountType(account_type)
          ]
        }
        align={BottomSheet.Header.Align.CENTER}
      />
      <BottomSheet.Content>
        <p className="body-14-regular text-text-strong">
          {
            errorTranslation.serverErrorContent[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_VERTICAL}
      >
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title={
            account_type === UserType.OWNER
              ? '고객센터에 문의하기'
              : 'Contact Customer Support'
          }
          onClick={handleContactCustomerSupport}
        />
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title={account_type === UserType.OWNER ? '알겠어요' : 'Okay'}
          onClick={handleClickBackButton}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default ServerErrorBottomSheet;
