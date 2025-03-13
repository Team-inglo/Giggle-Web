import CheckIconLarge from '@/assets/icons/checkIconLarge.svg?react';
import { useEffect } from 'react';

type CompleteModalProps = {
  title: string;
  content?: string;
  onNext?: () => void;
};

const CompleteModal = ({ title, content, onNext }: CompleteModalProps) => {
  // 2초 뒤에 페이지 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onNext]);
  return (
    <div className="w-screen h-screen px-4 flex flex-col gap-4 items-center justify-center text-center break-keep">
      <CheckIconLarge />
      <div className="head-2 whitespace-pre-line">{title}</div>
      <div className="body-2 text-text-alternative whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};

export default CompleteModal;
