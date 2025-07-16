import { documentTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();
  return (
    <div>
      <p
        className={`${width} body-14-medium text-text-alternative px-1 py-1.5`}
      >
        {title}
        {isOptional && (
          <span className="text-text-alternative body-14-medium pl-1">
            {documentTranslation.optional[isEmployer(pathname)]}
          </span>
        )}
      </p>
      {children}
    </div>
  );
};
export default InputLayout;
