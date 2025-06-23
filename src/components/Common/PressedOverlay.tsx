import { buttonTypeKeys, buttonTypeUnion } from '@/constants/components';

interface PressOverlayProps {
  isPressed: boolean;
  buttonType: buttonTypeUnion;
  color?: string;
  borderRadius?: string;
  className?: string;
}

const PressOverlay = ({
  isPressed,
  buttonType,
  color,
  borderRadius = '0.5rem',
  className = '',
}: PressOverlayProps) => {
  const getOpacity = () => {
    switch (buttonType) {
      case buttonTypeKeys.PRIMARY:
        return 0.2;
      case buttonTypeKeys.NEUTRAL:
        return 0.15;
      case buttonTypeKeys.TERTIARY:
        return 0.1;
      default:
        return 0;
    }
  };

  return (
    <div
      className={`
        absolute inset-0 
        pointer-events-none 
        transition-opacity duration-150 
        ${className}
        ${color ? `bg-[${color}]` : `bg-neutral-700`}
      `}
      style={{
        opacity: isPressed ? getOpacity() : 0,
        borderRadius: borderRadius,
      }}
    />
  );
};

export default PressOverlay;
