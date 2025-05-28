import { useEffect } from 'react';
import BottomSheetLayout from '../Common/BottomSheetLayout';

type ResumeDeleteModalProps = {
  onEditButton: () => void;
  onDeleteButton?: () => void;
};

const ResumeDeleteModal = ({
  onEditButton,
  onDeleteButton,
}: ResumeDeleteModalProps) => {
  // 마운트/언마운트 시 스크롤 제어
  useEffect(() => {
    // 모달이 마운트되면 스크롤 비활성화
    document.body.style.overflow = 'hidden';

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <BottomSheetLayout
      hasHandlebar={false}
      isAvailableHidden={false}
      isShowBottomsheet={true}
      isFixedBackground={true}
    >
      <div className="w-full flex flex-col bg-white rounded-[1.125rem] overflow-hidden">
        <div>
          <h1 className="pb-3 heading-18-semibold text-text-strong">
            Are you sure you want to delete?
          </h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <button
            className="py-3 w-full flex justify-start items-center body-16-regular text-text-strong"
            onClick={onEditButton}
          >
            수정하기
          </button>
          {onDeleteButton && (
            <button
              className="py-3 w-full flex justify-start items-start body-16-regular text-text-error"
              onClick={onDeleteButton}
            >
              삭제하기
            </button>
          )}
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default ResumeDeleteModal;
