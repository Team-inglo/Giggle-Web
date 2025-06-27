import { ComponentType, SVGProps } from 'react';
import Icon from './Icon';
import PressOverlay from './PressedOverlay';
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
  // AddTrigger, PressOverlay 색상 스타일 반환
  const getColorStyle = (type: string) => {
    if (type === 'pressOverlay') {
      switch (color) {
        case AddTriggerColorType.BLUE:
          return 'status-blue-200';
        case AddTriggerColorType.GRAY:
          return 'status-gray-200';
      }
    }
    if (type === 'fill') {
      switch (color) {
        case AddTriggerColorType.BLUE:
          return 'status-blue-300';
        case AddTriggerColorType.GRAY:
          return 'status-gray-300';
      }
    }
  };
  // AddTrigger 레이아웃 스타일 반환
  const getLayoutStyle = () => {
    switch (type) {
      case AddTriggerType.FILLED:
        return color === AddTriggerColorType.BLUE
          ? `bg-status-blue-300/10 border border-status-blue-300 border-dashed`
          : `bg-status-gray-300/10 border border-status-gray-300 border-dashed`;
      case AddTriggerType.OUTLINED:
        return color === AddTriggerColorType.BLUE
          ? `border border-status-blue-300 border-dashed`
          : `border border-status-gray-300 border-dashed`;
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
      className={`${baseStyle} ${getLayoutStyle()} text-${getColorStyle('fill')}`}
      {...pressHandlers}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <Icon icon={icon} color={`text-${getColorStyle('fill')}`} />
      </div>
      {title}
      <PressOverlay
        isPressed={isPressed}
        strength={getPressOverlayType()}
        color={getColorStyle('pressOverlay')}
      />
    </button>
  );
};

AddTrigger.Type = AddTriggerType;
AddTrigger.ColorType = AddTriggerColorType;

export default AddTrigger;
