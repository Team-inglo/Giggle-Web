import { ComponentType, SVGProps } from 'react';
import Icon from '@/components/Common/Icon';

type CardSelectProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content?: string;
  selected: boolean;
  onClick: () => void;
};
const CardSelect = ({
  icon,
  title,
  content,
  selected,
  onClick,
}: CardSelectProps) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 self-stretch items-center justify-center p-4 rounded-xl ${selected ? 'bg-neutral-900' : 'bg-surface-secondary'}`}
      onClick={onClick}
    >
      {icon && (
        <Icon
          icon={icon}
          size={Icon.Size.LG}
          fillColor={selected ? 'text-neutral-0' : 'text-text-assistive'}
        />
      )}
      <div className="w-full flex flex-col text-center">
        <p
          className={`heading-16-semibold ${selected ? 'text-text-invert' : 'text-text-assistive'}`}
        >
          {title}
        </p>
        <p
          className={`caption-12-semibold ${selected ? 'text-text-invert' : 'text-text-assistive'}`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default CardSelect;
