import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import { useGetRecruiterInfo } from '@/hooks/api/useApplication';
import RecruiterIcon from '@/assets/icons/ApplicationDetail/RecruiterIcon.svg?react';
import { useParams } from 'react-router-dom';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';

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
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <main className="p-3 w-full flex flex-col items-center text-center">
        <h3 className="pb-6 heading-18-semibold text-text-normal">
          Need to reach the recruiter? 📞
        </h3>
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
      <footer className="w-full pt-6 flex flex-col gap-2">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-normal'}
          fontColor="text-surface-invert"
          title={'Contact'}
          isBorder={false}
          onClick={() =>
            sendPhoneNumberToApp(data?.data?.recruiter_phone_number)
          }
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-neutral'}
          fontColor="text-surface-invert"
          title={'Maybe later'}
          isBorder={false}
          onClick={() => setIsShowBottomSheet(false)}
        />
      </footer>
    </BottomSheetLayout>
  );
};

export default ContactRecruiterBottomSheet;
