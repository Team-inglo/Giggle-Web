import { ReactNode } from 'react';
import InfoCardLayout from '@/components/Common/InfoCardLayout';
import AddTrigger from '@/components/Common/AddTrigger';
import PlusIcon from '@/assets/icons/PlusIcon.svg?react';

type InfoCardProps<T> = {
  icon?: JSX.Element;
  title: string;
  data: T | null;
  onAddClick: () => void;
  renderContent: (data: T) => ReactNode;
  rightElement?: ReactNode;
};

const InfoCard = <T,>({
  icon,
  title,
  data,
  onAddClick,
  renderContent,
  rightElement,
}: InfoCardProps<T>) => {
  // 데이터가 없을 때 '+Add {title}' 버튼 표시
  if (!data) {
    return (
      <InfoCardLayout icon={icon} title={title} rightTopElement={rightElement}>
        <AddTrigger
          icon={PlusIcon}
          type={AddTrigger.Type.FILLED}
          color={AddTrigger.ColorType.BLUE}
          title={`Add ${title}`}
          handleClick={onAddClick}
        />
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
