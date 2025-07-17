import CheckIconLarge from '@/assets/icons/checkIconLarge.svg?react';
import Button from '@/components/Common/Button';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

type CompleteButtonModalProps = {
  title: string;
  content: string;
  buttonContent: string;
  onClick: () => void;
};

const CompleteButtonModal = ({
  title,
  content,
  buttonContent,
  onClick,
}: CompleteButtonModalProps) => {
  useBodyScrollLock(true);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen px-14 flex flex-col gap-4 items-center justify-center text-center bg-white z-50">
      <CheckIconLarge />
      <div className="heading-20-semibold">{title}</div>
      <div className="body-14-regular">{content}</div>
      <Button
        type={Button.Type.PRIMARY}
        size={Button.Size.LG}
        isFullWidth
        title={buttonContent}
        onClick={onClick}
      />
    </div>
  );
};

export default CompleteButtonModal;
