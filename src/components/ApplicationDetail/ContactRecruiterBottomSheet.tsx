import Button from '@/components/Common/Button';
import { useGetRecruiterInfo } from '@/hooks/api/useApplication';
import RecruiterIcon from '@/assets/icons/ApplicationDetail/RecruiterIcon.svg?react';
import { useParams } from 'react-router-dom';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { BottomSheet } from '@/components/Common/BottomSheet';

type ContactRecruiterBottomSheetProps = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const ContactRecruiterBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: ContactRecruiterBottomSheetProps) => {
  const { id } = useParams();

  const { data } = useGetRecruiterInfo(Number(id));

  const sendPhoneNumberToApp = (phoneNumber: number) => {
    const message = {
      type: 'CALL_PHONE',
      payload: String(phoneNumber).replace(/-/g, ''),
    };
    sendReactNativeMessage(message);
  };

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="Need to reach the recruiter? 📞" />
      <BottomSheet.Content>
        <main className="p-3 w-full flex flex-col items-center text-center">
          <p className="pb-4 body-14-regular text-text-normal">
            If you haven’t received a response,
            <br />
            you can follow up directly.
          </p>
          <button className="w-full p-4 flex items-center gap-4 bg-surface-secondary rounded-lg text-start">
            <RecruiterIcon />
            <div>
              <p className="pb-1 button-16-semibold text-text-strong">
                {data?.data?.recruiter_name}
              </p>
              <p className="body-14-regular text-text-alternative">
                {data?.data?.recruiter_phone_number}
              </p>
            </div>
          </button>
        </main>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_HORIZONTAL}
      >
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title={'Contact'}
          onClick={() =>
            sendPhoneNumberToApp(data?.data?.recruiter_phone_number)
          }
        />
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title={'Maybe later'}
          onClick={() => setIsShowBottomSheet(false)}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default ContactRecruiterBottomSheet;
