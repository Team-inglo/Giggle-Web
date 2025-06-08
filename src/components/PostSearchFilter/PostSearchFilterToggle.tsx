import { ReactNode, useState } from 'react';
import DownArrowIcon from '@/assets/icons/PostSearch/DownArrowIconSm.svg?react';
import Icon from '@/components/Common/Icon';

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
        <h3 className="heading-18-semibold text-black">{title}</h3>
        <button
          className={`transition-transform duration-300 ${
            !isOpen && 'rotate-180'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon icon={DownArrowIcon} strokeColor={'stroke-text-strong'} />
        </button>
      </div>
      {isOpen && <div className="pt-4">{children}</div>}
    </div>
  );
};

export default PostSearchFilterToggle;
