import CheckIconLarge from '@/assets/icons/checkIconLarge.svg?react';
import Button from '@/components/Common/Button';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import BaseHeader from './Header/BaseHeader';
import BottomButtonPanel from './BottomButtonPanel';

type CompleteButtonModalProps = {
  pageTitle: string;
  title: string;
  content: string;
  buttonContent: string;
  onClick: () => void;
};

const CompleteButtonModal = ({
  pageTitle,
  title,
  content,
  buttonContent,
  onClick,
}: CompleteButtonModalProps) => {
  useBodyScrollLock(true);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen px-14 flex flex-col text-center bg-white z-50">
      <BaseHeader
        title={pageTitle}
        hasBackButton={false}
        hasMenuButton={false}
      />
      <div className="h-full mb-24 flex flex-col gap-4 items-center justify-center text-center">
        <CheckIconLarge />
        <div className="flex flex-col gap-1">
          <span className="heading-20-semibold text-text-strong">{title}</span>
          <span className="body-14-medium text-text-assistive">{content}</span>
        </div>
      </div>
      <BottomButtonPanel>
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title={buttonContent}
          onClick={onClick}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default CompleteButtonModal;
