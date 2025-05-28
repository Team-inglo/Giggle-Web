import { ReactNode } from 'react';

type InfoCardLayoutProps = {
  icon?: JSX.Element;
  title: string;
  children?: ReactNode;
  rightTopElement?: ReactNode;
};

const InfoCardLayout = ({
  icon,
  title,
  children,
  rightTopElement,
}: InfoCardLayoutProps) => {
  return (
    <section className="w-full py-6 px-4 bg-white rounded-lg">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {icon && <div>{icon}</div>}
          <h3 className="heading-18-semibold text-[#191919]">{title}</h3>
        </div>
        {rightTopElement && (
          <div className="ml-auto self-end">{rightTopElement}</div>
        )}
      </div>
      {children && (
        <div className="mt-3 pt-3 border-t border-[#F8F8F8]">{children}</div>
      )}
    </section>
  );
};

export default InfoCardLayout;
