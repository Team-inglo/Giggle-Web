import { ReactNode } from 'react';

const BottomButtonPanel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full fixed bottom-0 left-0 bg-white flex flex-row items-start justify-start px-4 pb-9 pt-3 box-border text-center button-16-semibold text-[#1e1926] z-10">
      <div className="w-full flex items-center justify-center">{children}</div>
    </div>
  );
};

export default BottomButtonPanel;
