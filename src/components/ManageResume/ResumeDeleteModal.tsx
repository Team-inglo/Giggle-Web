import { BottomSheet } from '@/components/Common/BottomSheet';

type ResumeDeleteModalProps = {
  onEditButton: () => void;
  onDeleteButton?: () => void;
  setIsShowBottomSheet?: (isShow: boolean) => void;
};

const ResumeDeleteModal = ({
  onEditButton,
  onDeleteButton,
  setIsShowBottomSheet = () => {},
}: ResumeDeleteModalProps) => {
  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={true}
      isFixedBackground={true}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="Are you sure you want to delete?" />
      <BottomSheet.Content>
        <button
          className="py-3 w-full flex justify-start items-center body-16-regular text-text-strong"
          onClick={onEditButton}
        >
          Edit
        </button>
        {onDeleteButton && (
          <button
            className="py-3 w-full flex justify-start items-start body-16-regular text-text-error"
            onClick={onDeleteButton}
          >
            Delete
          </button>
        )}
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default ResumeDeleteModal;
