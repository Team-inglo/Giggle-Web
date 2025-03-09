import { ReactNode, useState } from 'react';
import DownArrowIcon from '@/assets/icons/PostSearch/DownArrowIcon.svg?react';

type PostSearchFilterToggleProps = {
  title: string;
  children: ReactNode;
};

const PostSearchFilterToggle = ({
  title,
  children,
}: PostSearchFilterToggleProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h3 className="head-3 text-black">{title}</h3>
        <button
          className={`transition-transform duration-300 ${
            !isOpen && 'rotate-180'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <DownArrowIcon />
        </button>
      </div>
      {isOpen && <div className="pt-4">{children}</div>}
    </div>
  );
};

export default PostSearchFilterToggle;
