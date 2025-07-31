import SuccessIcon from '@/assets/icons/Successful.svg?react';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import Button from '@/components/Common/Button';

interface VerificationSuccessfulProps {
  title: string;
  content: string;
  buttonText: string;
  onNext: () => void;
}

const VerificationSuccessful = ({
  title,
  content,
  buttonText,
  onNext,
}: VerificationSuccessfulProps) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <SuccessIcon />
      <div className="heading-20-semibold whitespace-pre-line text-center">
        {title}
      </div>
      <p className="body-14-regular text-text-alternative whitespace-pre-line text-center">
        {content}
      </p>
      <BottomButtonPanel>
        <div className="w-full">
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title={buttonText}
            onClick={onNext}
          />
        </div>
      </BottomButtonPanel>
    </div>
  );
};

export default VerificationSuccessful;
