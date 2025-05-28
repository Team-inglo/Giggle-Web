import { ReactNode } from 'react';

type InputLayOutProps = {
  title: string;
  isEssential: boolean;
  isOptional?: boolean; // isOptional 속성 추가
  width?: string; // width 속성 string 전달
  children: ReactNode;
};

const InputLayout = ({
  title,
  children,
  isEssential,
  isOptional,
  width,
}: InputLayOutProps) => {
  return (
    <div>
      <p
        className={`${width} button-14-semibold text-text-strong px-1 py-[6px]`}
      >
        {title}
        {isEssential && (
          <span className="text-text-error body-16-regular ml-[0.125rem]">
            *
          </span>
        )}
        {isOptional && (
          <span className="text-text-alternative caption-12-regular pl-1">
            (optional)
          </span>
        )}
      </p>
      {children}
    </div>
  );
};
export default InputLayout;
