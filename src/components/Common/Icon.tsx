import React from 'react';

enum IconSize {
  XSM = 'xsm',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const SIZE_STYLES: Record<IconSize, { widthHeight: string; padding: string }> =
  {
    [IconSize.LG]: {
      widthHeight: 'w-8 h-8',
      padding: 'p-2',
    },
    [IconSize.MD]: {
      widthHeight: 'w-6 h-6',
      padding: 'p-[0.375rem]',
    },
    [IconSize.SM]: {
      widthHeight: 'w-4 h-4',
      padding: 'p-1',
    },
    [IconSize.XSM]: {
      widthHeight: 'w-3 h-3',
      padding: 'p-[0.188rem]',
    },
  };

type IconProps = {
  /**
   * 이 컴포넌트는 SVGR을 사용하여 아이콘을 렌더링합니다.
   * SVGR은 SVG 파일을 React 컴포넌트로 변환하는 도구입니다.
   * 이 컴포넌트는 아이콘 컴포넌트를 렌더링할 때 필요한 모든 속성을 전달합니다.
   * 예를 들어, `width`, `height`, `className` 등의 속성을 전달할 수 있습니다.
   *
   * hasPadding을 사용하려면 size가 정의되어야 합니다.
   */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor?: string;
  strokeColor?: string;
  fillColor?: string;
  size?: IconSize;
  hasPadding?: boolean; // 아이콘 버튼 사용 시에 padding 추가 (size props가 정의되어야 사용 가능)
} & React.SVGProps<SVGSVGElement>;

const Icon = ({
  icon: IconComponent,
  bgColor,
  strokeColor,
  fillColor,
  size,
  hasPadding,
  className,
  ...props
}: IconProps) => {
  const sizeStyle = size ? SIZE_STYLES[size] : undefined;

  const combinedClassName = [
    className,
    bgColor,
    strokeColor,
    fillColor,
    sizeStyle?.widthHeight,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={sizeStyle && hasPadding ? sizeStyle.padding : ''}
      data-testid="svg-icon"
    >
      <IconComponent className={combinedClassName} {...props} />
    </div>
  );
};

Icon.Size = IconSize;

export default Icon;
