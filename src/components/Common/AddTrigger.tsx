import { ComponentType, SVGProps } from 'react';
import Icon from '@/components/Common/Icon';
import PressOverlay from '@/components/Common/PressedOverlay';
import { usePress } from '@/hooks/usePress';

enum AddTriggerType {
  FILLED = 'filled',
  OUTLINED = 'outlined',
  TEXT = 'text',
}

enum AddTriggerColorType {
  BLUE = 'blue',
  GRAY = 'gray',
}

const colorStyles = {
  [AddTriggerColorType.BLUE]: {
    pressOverlay: 'bg-status-blue-200',
    fill: 'text-status-blue-300',
    border: 'border-status-blue-300',
    bg: 'bg-status-blue-300/10',
  },
  [AddTriggerColorType.GRAY]: {
    pressOverlay: 'bg-text-assistive',
    fill: 'text-text-assistive',
    border: 'border-text-assistive',
    bg: 'bg-text-assistive/10',
  },
};

type AddTriggerProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  type: AddTriggerType;
  color: AddTriggerColorType;
  title: string;
  handleClick: () => void;
};

const AddTrigger = ({
  icon,
  type,
  color,
  title,
  handleClick,
}: AddTriggerProps) => {
  const { isPressed, pressHandlers } = usePress(); // 터치/클릭 인터렉션 핸들러
  const baseStyle =
    'w-full p-4 text-center rounded-lg flex items-center justify-center overflow-hidden button-14-semibold relative';

  const styles = colorStyles[color];

  // AddTrigger 레이아웃 스타일 반환
  const getLayoutStyle = () => {
    switch (type) {
      case AddTriggerType.FILLED:
        return `${styles.bg} ${styles.border} border border-dashed`;
      case AddTriggerType.OUTLINED:
        return `${styles.border} border border-dashed`;
    }
  };
  // PressOverlay 강도 반환
  const getPressOverlayType = () => {
    switch (type) {
      case AddTriggerType.FILLED:
        return PressOverlay.pressStrengthKeys.NORMAL;
      case AddTriggerType.OUTLINED:
        return PressOverlay.pressStrengthKeys.NORMAL;
      case AddTriggerType.TEXT:
        return PressOverlay.pressStrengthKeys.LIGHT;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyle} ${getLayoutStyle()} ${styles.fill}`}
      {...pressHandlers}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <Icon icon={icon} color={styles.fill} size={Icon.Size.SM} hasPadding/>
      </div>
      {title}
      <PressOverlay
        isPressed={isPressed}
        strength={getPressOverlayType()}
        color={styles.pressOverlay}
      />
    </button>
  );
};

AddTrigger.Type = AddTriggerType;
AddTrigger.ColorType = AddTriggerColorType;

export default AddTrigger;
