import ScrapIcon from '@/assets/icons/Scrap.svg?react';
import {
  ButtonSize,
  buttonTypeKeys,
  buttonTypeUnion,
} from '@/constants/components';
import { ReactNode } from 'react';
import PressOverlay, { PressStrength } from './PressedOverlay';
import { motion } from 'framer-motion';
import { usePress } from '@/hooks/usePress';

type ButtonProps = {
  type: buttonTypeUnion; // 버튼의 시맨틱 타입 (e.g., PRIMARY, NEUTRAL, DISABLED)
  size?: ButtonSize; // 버튼의 크기 (md, lg), 지정하지 않으면 type에 따른 기본 스타일 적용
  isFullWidth?: boolean; // 버튼의 너비를 100%로 설정할지 여부
  bgColor?: string; // 버튼의 배경색 (optional)
  fontColor?: string; // 버튼 글자색 (optional)
  title?: string; // 버튼에 포함되는 글자 (optional)
  onClick?: () => void; // 클릭 이벤트 핸들러 (optional)
  children?: ReactNode; // 버튼 내부에 렌더링될 요소. title보다 우선순위가 높음(optional)
};

const Button = ({
  type,
  size,
  isFullWidth,
  bgColor,
  fontColor,
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

  const getButtonStyle = () => {
    switch (type) {
      case buttonTypeKeys.LARGE:
        return 'w-full py-4 rounded-xl button-16-semibold';
      case buttonTypeKeys.SMALL:
        return 'w-[24vw] py-3 rounded-lg button-14-semibold';
      case buttonTypeKeys.APPLY:
        return `w-full py-4 rounded-xl bg-neutral-100 bg-cover bg-center button-16-semibold text-neutral-100`;
      case buttonTypeKeys.SMALLAPPLY: // 스크랩 버튼과 함께 쓰이는 Apply 버튼
        return `w-[71vw] py-4 rounded-lg bg-neutral-100 bg-cover bg-center button-16-semibold text-neutral-100`;
      case buttonTypeKeys.BACK: // CONTINUE 버튼과 같은 열에 사용
        return 'w-[31vw] py-4 rounded-xl button-16-semibold';
      case buttonTypeKeys.CONTINUE: // BACK 버튼과 같은 열에 사용
        return 'w-[53vw] py-4 rounded-xl button-16-semibold';
      case buttonTypeKeys.SCRAP:
        return 'p-4 rounded-lg bg-[rgba(244,244,249,0.5)]';
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
      default: // 기본값으로 large type 적용
        return 'w-full px-5 py-4 rounded-xl button-16-semibold';
    }
  };

  const getButtonStyleBySize = () => {
    switch (size) {
      case 'md':
        return 'px-4 py-3 rounded-xl button-14-semibold';
      case 'lg':
        return 'px-5 py-4 rounded-xl button-16-semibold';
    }
  };

  return (
    <>
      <motion.button
        className={`${
          size && getButtonStyleBySize()
        } ${baseButtonStyle} ${getButtonStyle()} ${bgColor} ${fontColor} ${
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

export default Button;
