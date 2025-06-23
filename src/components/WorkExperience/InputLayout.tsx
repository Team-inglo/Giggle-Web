import { ReactNode } from 'react';

type InputLayOutProps = {
  title: string;
  isOptional?: boolean;
  width?: string;
  children: ReactNode;
};

const InputLayout = ({
  title,
  children,
  isOptional,
  width,
}: InputLayOutProps) => {
  return (
    <div>
      <p className={`${width} button-14-medium text-text-alternative p-1`}>
        {title}
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
