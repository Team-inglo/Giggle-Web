import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

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
  useBodyScrollLock(true);

  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={true}
      isFixedBackground={true}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col bg-white rounded-[1.125rem] overflow-hidden">
        <div>
          <h1 className="py-3 heading-18-semibold text-text-strong">
            Are you sure you want to delete?
          </h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
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
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default ResumeDeleteModal;
