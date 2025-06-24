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
      <p className={`${width} body-14-medium text-text-alternative p-1`}>
        {title}
        {isOptional && (
          <span className="text-text-alternative body-14-medium pl-1">
            (optional)
          </span>
        )}
      </p>
      {children}
    </div>
  );
};
export default InputLayout;
