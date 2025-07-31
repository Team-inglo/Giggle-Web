// PressOverlay의 시각적 피드백 강도를 나타내는 타입
const pressStrengthKeys = {
  EXTRA_STRONG: 'extra-strong',
  STRONG: 'strong',
  NORMAL: 'normal',
  LIGHT: 'light',
};

export type PressStrength =
  (typeof pressStrengthKeys)[keyof typeof pressStrengthKeys];

type PressOverlayProps = {
  isPressed: boolean; // 부모 컴포넌트로부터 전달받는 '눌림' 상태
  strength: PressStrength; // 시각적 피드백 강도
  color?: string; // 오버레이 색상을 직접 지정 (optional)
  borderRadius?: string; // 오버레이의 radius 값 (optional)
  className?: string; // 추가적인 스타일링을 위한 클래스 (optional)
};

const PressOverlay = ({
  isPressed,
  strength,
  color,
  borderRadius = '0.5rem',
  className = '',
}: PressOverlayProps) => {
  // 버튼 타입에 따라 다른 강도의 시각적 피드백을 주기 위해 투명도를 조절
  const getOpacity = () => {
    switch (strength) {
      case pressStrengthKeys.EXTRA_STRONG:
        return 0.8;
      case pressStrengthKeys.STRONG:
        return 0.2;
      case pressStrengthKeys.NORMAL:
        return 0.15;
      case pressStrengthKeys.LIGHT:
        return 0.1;
      default:
        return 0;
    }
  };

  return (
    <div
      className={`
        absolute inset-x-[-24%] inset-y-0
        pointer-events-none
        transition-opacity duration-150
        ${color || 'bg-neutral-700'}
        w-[calc(100%+48%)]
        h-full
        ${className}
      `}
      style={{
        opacity: isPressed ? getOpacity() : 0,
        borderRadius: borderRadius,
      }}
    />
  );
};

PressOverlay.pressStrengthKeys = pressStrengthKeys;

export default PressOverlay;
