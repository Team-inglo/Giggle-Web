import Icon from '@/components/Common/Icon';
import CheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import CheckIconWithFill from '@/assets/icons/CheckIconWithFill.svg?react';
import PressOverlay from '@/components/Common/PressedOverlay';
import { usePress } from '@/hooks/usePress';

enum SelectionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

enum IconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

type SelectListItemProps = {
  selectionType: SelectionType;
  title: string;
  isSelected: boolean;
  isAssistive?: boolean;
  iconPosition: IconPosition;
  onClick: () => void;
};

// 공통 스타일 상수 정의
const COMMON_STYLES = {
  textColor: 'text-text-strong',
  textAssistiveColor: 'text-text-assistive',
  iconFillColor: 'text-surface-invert',
  iconFillColorDisabled: 'text-surface-tertiary',
  iconStrokeColor: 'stroke-surface-base',
} as const;

const selectListItemStyle = {
  [SelectionType.SINGLE]: {
    icon: CheckIcon,
    iconSize: Icon.Size.SM,
    iconHasPadding: true,
    ...COMMON_STYLES,
  },
  [SelectionType.MULTIPLE]: {
    icon: CheckIconWithFill,
    iconSize: Icon.Size.MD,
    iconHasPadding: false,
    ...COMMON_STYLES,
  },
};

const SelectListItem = ({
  selectionType,
  title,
  isSelected,
  isAssistive = false,
  iconPosition,
  onClick,
}: SelectListItemProps) => {
  const { isPressed, pressHandlers } = usePress();
  const styleConfig = selectListItemStyle[selectionType];

  // 아이콘 props 계산
  const iconProps = {
    icon: styleConfig.icon,
    size: styleConfig.iconSize,
    hasPadding: styleConfig.iconHasPadding,
    fillColor: isSelected
      ? styleConfig.iconFillColor
      : styleConfig.iconFillColorDisabled,
    strokeColor: isSelected
      ? styleConfig.iconFillColor
      : styleConfig.iconStrokeColor,
  };

  // 텍스트 스타일 계산
  const shouldUseAssistiveColor = isAssistive && !isSelected;
  const textColorClass = shouldUseAssistiveColor
    ? styleConfig.textAssistiveColor
    : styleConfig.textColor;

  // 아이콘 렌더링 함수
  const renderIcon = () => <Icon {...iconProps} />;

  return (
    <div
      className="w-full flex gap-2 items-center justify-between py-3 relative"
      onClick={onClick}
      role="button"
      tabIndex={0}
      {...pressHandlers}
    >
      {iconPosition === IconPosition.LEFT && renderIcon()}
      <p
        className={`w-full self-stretch text-left body-16-medium ${textColorClass} line-clamp-2 text-ellipsis`}
      >
        {title}
      </p>
      {iconPosition === IconPosition.RIGHT && renderIcon()}
      <PressOverlay
        isPressed={isPressed}
        color="bg-neutral-0"
        strength={PressOverlay.pressStrengthKeys.EXTRA_STRONG}
      />
    </div>
  );
};

SelectListItem.SelectionType = SelectionType;
SelectListItem.IconPosition = IconPosition;

export default SelectListItem;
