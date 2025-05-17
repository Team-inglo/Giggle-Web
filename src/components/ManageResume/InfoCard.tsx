import { ReactNode } from 'react';
import InfoCardLayout from '@/components/Common/InfoCardLayout';

type InfoCardProps<T> = {
  icon?: JSX.Element;
  title: string;
  data: T | null;
  onAddClick: () => void;
  renderContent: (data: T) => ReactNode;
  addButtonText?: string;
  rightElement?: ReactNode;
};

const InfoCard = <T,>({
  icon,
  title,
  data,
  onAddClick,
  renderContent,
  addButtonText,
  rightElement,
}: InfoCardProps<T>) => {
  // 데이터가 없을 때 '+Add {title}' 버튼 표시
  if (!data) {
    return (
      <InfoCardLayout icon={icon} title={title} rightTopElement={rightElement}>
        <button
          onClick={onAddClick}
          className="w-full py-4 text-center border border-dashed border-blue-300 bg-blue-300/10 rounded-lg text-text-success flex items-center justify-center"
        >
          <span className="mr-1">+</span>
          {addButtonText || `Add ${title}`}
        </button>
      </InfoCardLayout>
    );
  }

  // 데이터가 있을 때 내용 렌더링
  return (
    <InfoCardLayout icon={icon} title={title} rightTopElement={rightElement}>
      {renderContent(data)}
    </InfoCardLayout>
  );
};

export default InfoCard;
