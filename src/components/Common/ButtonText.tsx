import { ComponentType, SVGProps, useState } from 'react';
import PressOverlay, {
  PressStrength,
} from '@/components/Common/PressedOverlay';
import Icon from '@/components/Common/Icon';
import { motion } from 'framer-motion';

enum ButtonTextSize {
  SM = 'sm',
  MD = 'md',
}

enum ButtonTextVariant {
  PRIMARY = 'primary',
  ALTERNATIVE = 'alternative',
}

enum ButtonTextIconDisplay {
  NONE = 'none',
  LEFT = 'left',
  RIGHT = 'right',
}

interface ButtonTextProps {
  size?: ButtonTextSize; // 버튼 텍스트 크기
  variant?: ButtonTextVariant; // 버튼 텍스트 변형
  iconDisplay?: ButtonTextIconDisplay; // 아이콘 위치
  icon?: ComponentType<SVGProps<SVGSVGElement>>; // 아이콘 컴포넌트
  onClick?: () => void; // 클릭 이벤트 핸들러
  text: string; // 버튼 텍스트
}

const ButtonText = ({
  size = ButtonTextSize.SM,
  variant = ButtonTextVariant.ALTERNATIVE,
  iconDisplay = ButtonTextIconDisplay.NONE,
  icon,
  text,
  onClick,
}: ButtonTextProps) => {
  const [isPressed, setIsPressed] = useState(false);
  // 버튼 텍스트 크기에 따라 스타일을 적용
  const getSizeStyle = () => {
    switch (size) {
      case ButtonTextSize.SM:
        return 'body-14-medium py-0.5';
      case ButtonTextSize.MD:
      default:
        return 'button-16-semibold py-1';
    }
  };

  // 버튼 타입에 따라 다른 색상을 적용
  const getColorStyle = () => {
    switch (variant) {
      case ButtonTextVariant.PRIMARY:
        return 'text-status-blue-300';
      case ButtonTextVariant.ALTERNATIVE:
      default:
        return 'text-text-alternative';
    }
  };

  // 버튼 타입에 따라 다른 강도의 시각적 피드백을 주기 위해 투명도를 매핑
  const getPressStrength = (): PressStrength => {
    switch (variant) {
      case ButtonTextVariant.PRIMARY:
        return PressOverlay.pressStrengthKeys.NORMAL;
      case ButtonTextVariant.ALTERNATIVE:
      default:
        return PressOverlay.pressStrengthKeys.LIGHT;
    }
  };

  // 버튼 텍스트 컴포넌트의 내용을 렌더링
  const renderContent = () => {
    return (
      <span
        className={`inline-flex items-center gap-1 ${getSizeStyle()} ${getColorStyle()}`}
      >
        {icon && iconDisplay === ButtonTextIconDisplay.LEFT && (
          <Icon icon={icon} />
        )}
        {text}
        {icon && iconDisplay === ButtonTextIconDisplay.RIGHT && (
          <Icon icon={icon} />
        )}
      </span>
    );
  };

  // 클릭/터치 상호작용 시작 시 '눌림' 상태를 활성화
  const handlePress = (pressed: boolean) => {
    setIsPressed(pressed);
  };

  return (
    <motion.button
      type="button"
      className={`flex justify-center items-center relative ${getSizeStyle()} ${getColorStyle()}`}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isPressed ? 0.95 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20,
      }}
      onClick={onClick}
      onTouchStart={() => handlePress(true)}
      onTouchEnd={() => handlePress(false)}
      onTouchCancel={() => handlePress(false)}
      onMouseDown={() => handlePress(true)}
      onMouseUp={() => handlePress(false)}
      onMouseLeave={() => handlePress(false)}
    >
      <PressOverlay isPressed={isPressed} strength={getPressStrength()} />
      {renderContent()}
    </motion.button>
  );
};

ButtonText.Size = ButtonTextSize;
ButtonText.Variant = ButtonTextVariant;
ButtonText.IconDisplay = ButtonTextIconDisplay;

export default ButtonText;
