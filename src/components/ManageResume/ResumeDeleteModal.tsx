import { useEffect } from 'react';

type ResumeDeleteModalProps = {
  onCancelButton: () => void;
  onDeleteButton: () => void;
};

const ResumeDeleteModal = ({
  onCancelButton,
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
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 flex items-center justify-center bg-[rgba(70,70,70,0.6)] z-50">
      <div className="w-[90%] max-w-[22rem] flex flex-col gap-8 bg-white rounded-[1.125rem] overflow-hidden">
        <div>
          <h1 className="pt-[1.125rem] pb-4 border-b-[0.5px] border-solid border-border-normal text-center heading-18-semibold text-text-normal">
            Are you sure you want to delete?
          </h1>
          <p className="pt-7 caption-12-regular text-text-alternative text-center px-14 break-keep">
            Deleted information cannot be recovered.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-surface-secondary py-[1.125rem] w-[50%] flex justify-center items-center button-16-semibold text-text-alternative"
            onClick={onDeleteButton}
          >
            Delete
          </button>
          <button
            className="bg-surface-primary py-[1.125rem] w-[50%] flex justify-center items-center button-16-semibold text-text-normal"
            onClick={onCancelButton}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDeleteModal;
