import ScrapIcon from '@/assets/icons/Scrap.svg?react';
import {
  ButtonLayoutVariant,
  ButtonSize,
  buttonTypeKeys,
  buttonTypeUnion,
} from '@/constants/components';
import { ReactNode } from 'react';
import PressOverlay, {
  PressStrength,
} from '@/components/Common/PressedOverlay';
import { motion } from 'framer-motion';
import { usePress } from '@/hooks/usePress';

type ButtonProps = {
  type: buttonTypeUnion; // 버튼의 시맨틱 타입 (e.g., PRIMARY, NEUTRAL, DISABLED)
  size: ButtonSize; // 버튼의 크기 (md, lg), 지정하지 않으면 type에 따른 기본 스타일 적용
  layout?: ButtonLayoutVariant; // 레이아웃 variant (두 버튼 배치 시 크기 조정용)
  isFullWidth?: boolean; // 버튼의 너비를 100%로 설정할지 여부
  canShrink?: boolean; // 버튼의 크기를 줄일지 여부
  title?: string; // 버튼에 포함되는 글자 (optional)
  onClick?: () => void; // 클릭 이벤트 핸들러 (optional)
  children?: ReactNode; // 버튼 내부에 렌더링될 요소. title보다 우선순위가 높음(optional)
};

const Button = ({
  type,
  size,
  layout = ButtonLayoutVariant.DEFAULT,
  isFullWidth,
  canShrink = true,
  title,
  onClick,
  children,
}: ButtonProps) => {
  const { isPressed, pressHandlers } = usePress();
  const isDisabled =
    type === buttonTypeKeys.DISABLED || type === buttonTypeKeys.INACTIVE;

  // DISABLED, INACTIVE 상태에서는 onClick 이벤트가 발생하지 않도록 막는 핸들러
  const handleClick = () => {
    if (!isDisabled) onClick?.();
  };

  // 버튼 타입에 따라 다른 강도의 시각적 피드백을 주기 위해 투명도를 매핑
  const getPressStrength = (): PressStrength => {
    switch (type) {
      case buttonTypeKeys.PRIMARY:
        return PressOverlay.pressStrengthKeys.STRONG;
      case buttonTypeKeys.NEUTRAL:
        return PressOverlay.pressStrengthKeys.NORMAL;
      case buttonTypeKeys.TERTIARY:
        return PressOverlay.pressStrengthKeys.LIGHT;
      default:
        return PressOverlay.pressStrengthKeys.LIGHT;
    }
  };

  const baseButtonStyle =
    'flex justify-center items-center relative overflow-hidden';

  // 레이아웃 variant에 따른 스타일 반환
  const getLayoutStyle = () => {
    switch (layout) {
      case ButtonLayoutVariant.SMALL_BUTTON:
        return `w-[31vw] flex-shrink-0`;
      case ButtonLayoutVariant.FLEX_BUTTON:
        return `w-full`;
      case ButtonLayoutVariant.DEFAULT:
      default:
        return '';
    }
  };

  const getButtonStyle = () => {
    switch (type) {
      case buttonTypeKeys.PRIMARY:
        return 'bg-brand-500 text-text-strong';
      case buttonTypeKeys.NEUTRAL:
        return 'bg-neutral-100 text-text-strong';
      case buttonTypeKeys.TERTIARY:
        return 'bg-neutral-0 text-text-normal';
      case buttonTypeKeys.DISABLED:
        return 'bg-neutral-300 text-text-disabled';
      case buttonTypeKeys.INACTIVE:
        return 'text-text-disabled';
      default: // 기본값으로 NEUTRAL type 적용
        return 'bg-neutral-100 text-text-strong';
    }
  };

  const getButtonStyleBySize = () => {
    const shrinkStyle = canShrink ? '' : 'flex-shrink-0';
    switch (size) {
      case 'md':
        return `px-4 py-3 rounded-lg button-14-semibold ${shrinkStyle}`;
      case 'lg':
        return `px-5 py-4 rounded-xl button-16-semibold ${shrinkStyle}`;
    }
  };

  return (
    <>
      <motion.button
        className={`${
          size && getButtonStyleBySize()
        } ${baseButtonStyle} ${getLayoutStyle()} ${getButtonStyle()} ${
          isFullWidth ? 'w-full' : ''
        }`}
        initial={{
          scale: 1,
        }}
        animate={{
          scale: isPressed ? 0.95 : 1,
        }}
        transition={
          isDisabled
            ? undefined
            : {
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }
        }
        onClick={handleClick}
        {...(!isDisabled && pressHandlers)}
      >
        {/* SCRAP 타입은 아이콘을, 그 외에는 children 또는 title을 렌더링 */}
        {type === buttonTypeKeys.SCRAP ? <ScrapIcon /> : children || title}
        <PressOverlay isPressed={isPressed} strength={getPressStrength()} />
      </motion.button>
    </>
  );
};

Button.Type = buttonTypeKeys;
Button.Size = ButtonSize;
Button.Layout = ButtonLayoutVariant;

export default Button;
