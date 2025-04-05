import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import { usePatchApplyHiKorea } from '@/hooks/api/useApplication';
import { useParams } from 'react-router-dom';
import { handleGoExternalWeb } from '@/utils/application';

type ContactHikoreaBottomSheetProps = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const ContactHikoreaBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: ContactHikoreaBottomSheetProps) => {
  const { id } = useParams();

  const { mutate } = usePatchApplyHiKorea(Number(id));

  const handleCompleteApplyHikorea = () => {
    if (isNaN(Number(id))) return;
    mutate(Number(id));
  };

  return (
    <BottomSheetLayout
      hasHandlebar={false}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <main className="p-3 w-full flex flex-col items-center text-center">
        <h3 className="pb-6 head-3 text-text-normal">
          {`Please prepare the following documents\n before making contact`}
        </h3>
        <ul className="w-full p-4 flex flex-col gap-1 bg-primary-neutral rounded-lg text-start">
          <li className="caption text-text-alternative">📌 Work Permit Form</li>
          <li className="caption text-text-alternative">
            📌 Employment Contract
          </li>
          <li className="caption text-text-alternative">
            📌 Integrated Application Form
          </li>
          <li className="caption text-text-alternative">📌 Residence Card</li>
          <li className="caption text-text-alternative">📌 Passport</li>
          <li className="caption text-text-alternative">
            📌 Business Registration Certificate
          </li>
        </ul>
      </main>
      <footer className="w-full pt-6 flex flex-col gap-2">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-normal'}
          fontColor="text-surface-invert"
          title={'Go to Hikorea'}
          isBorder={false}
          onClick={() => handleGoExternalWeb('hikorea')}
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-neutral'}
          fontColor="text-surface-invert"
          title={'Completed'}
          isBorder={false}
          onClick={handleCompleteApplyHikorea}
        />
      </footer>
    </BottomSheetLayout>
  );
};

export default ContactHikoreaBottomSheet;
