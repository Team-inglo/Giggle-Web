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
    <section className="w-full py-6 px-4 bg-surface-base">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {icon && <div>{icon}</div>}
          <h3 className="heading-18-semibold text-text-strong">{title}</h3>
        </div>
        {rightTopElement && (
          <div className="ml-auto self-end">{rightTopElement}</div>
        )}
      </div>
      {children && (
        <div className="mt-3 pt-3 border-t border-surface-secondary">{children}</div>
      )}
    </section>
  );
};

export default InfoCardLayout;
