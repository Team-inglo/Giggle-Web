import React from 'react';

type IconProps = {
  /**
   * 이 컴포넌트는 SVGR을 사용하여 아이콘을 렌더링합니다.
   * SVGR은 SVG 파일을 React 컴포넌트로 변환하는 도구입니다.
   * 이 컴포넌트는 아이콘 컴포넌트를 렌더링할 때 필요한 모든 속성을 전달합니다.
   * 예를 들어, `width`, `height`, `className` 등의 속성을 전달할 수 있습니다.
   */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgColor?: string;
  strokeColor?: string;
  fillColor?: string;
  width?: string;
  height?: string;
} & React.SVGProps<SVGSVGElement>;

const Icon = ({
  icon: IconComponent,
  bgColor,
  strokeColor,
  fillColor,
  className,
  ...props
}: IconProps) => {
  const combinedClassName = [className, bgColor, strokeColor, fillColor]
    .filter(Boolean)
    .join(' ');

  return (
    <IconComponent
      className={combinedClassName}
      {...props}
    />
  );
};

export default Icon;
