import Button from '@/components/Common/Button';
import { usePatchApplyHiKorea } from '@/hooks/api/useApplication';
import { useParams } from 'react-router-dom';
import { handleGoExternalWeb } from '@/utils/application';
import { BottomSheet } from '@/components/Common/BottomSheet';

type ContactHikoreaBottomSheetProps = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

type DocumentItemProps = {
  title: string;
};

const DocumentItem = ({ title }: DocumentItemProps) => {
  return (
    <li className="caption-12-regular text-text-alternative">📌 {title}</li>
  );
};

const ContactHikoreaBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: ContactHikoreaBottomSheetProps) => {
  const { id } = useParams();

  const { mutate } = usePatchApplyHiKorea(Number(id));

  const documentItems = [
    'Work Permit Form',
    'Employment Contract',
    'Integrated Application Form',
    'Residence Card',
    'Passport',
    'Business Registration Certificate',
  ];

  const handleCompleteApplyHikorea = () => {
    if (isNaN(Number(id))) return;
    mutate(Number(id));
  };

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="Please prepare the following documents before making contact" />
      <BottomSheet.Content>
        <main className="p-3 w-full flex flex-col items-center text-center">
          <ul className="w-full p-4 flex flex-col gap-1 bg-primary-neutral rounded-lg text-start">
            {documentItems.map((document, index) => (
              <DocumentItem key={index} title={document} />
            ))}
          </ul>
        </main>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_HORIZONTAL}
      >
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title={'Go to Hikorea'}
          onClick={() => handleGoExternalWeb('hikorea')}
        />
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title={'Completed'}
          onClick={handleCompleteApplyHikorea}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default ContactHikoreaBottomSheet;
