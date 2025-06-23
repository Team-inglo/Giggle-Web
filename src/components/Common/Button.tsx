import ScrapIcon from '@/assets/icons/Scrap.svg?react';
import { buttonTypeKeys, buttonTypeUnion } from '@/constants/components';
import { useState } from 'react';
import PressOverlay from './PressedOverlay';

type buttonProps = {
  type: buttonTypeUnion; // 정의된 버튼을 5가지 타입으로 나누었습니다.
  size?: 'md' | 'lg';
  bgColor?: string; // 버튼의 배경색 (optional)
  fontColor?: string; // 버튼 글자색 (optional)
  title?: string; // 버튼에 포함되는 글자 (optional)
  onClick?: () => void; // 클릭 이벤트 핸들러 (optional)
};

const Button = ({
  type,
  size,
  bgColor,
  fontColor,
  title,
  onClick,
}: buttonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressStart = () => {
    if (type !== buttonTypeKeys.DISABLED && type !== buttonTypeKeys.INACTIVE)
      setIsPressed(true);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  const baseButtonStyle =
    'flex justify-center items-center relative transition-transform duration-150 ease-in-out';

  const getButtonStyle = () => {
    switch (type) {
      case buttonTypeKeys.LARGE:
        return 'py-4 rounded-xl button-16-semibold';
      case buttonTypeKeys.SMALL:
        return 'w-[24vw] py-3 rounded-lg button-14-semibold';
      case buttonTypeKeys.APPLY:
        return `py-4 rounded-xl bg-neutral-100 bg-cover bg-center button-16-semibold text-neutral-100`;
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
        return 'w-full px-4 py-3 rounded-xl button-14-semibold';
      case 'lg':
        return 'w-full px-5 py-4 rounded-xl button-16-semibold';
    }
  };

  return (
    <>
      <button
        className={`${
          size && getButtonStyleBySize()
        } ${baseButtonStyle} ${getButtonStyle()} ${bgColor} ${fontColor} ${
          isPressed ? 'scale-95' : ''
        }`}
        onClick={onClick}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
      >
        {type === buttonTypeKeys.SCRAP && <ScrapIcon />}
        <div>{title}</div>
        <PressOverlay isPressed={isPressed} buttonType={type} />
      </button>
    </>
  );
};

export default Button;
