const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="relative w-full flex flex-row items-center justify-center text-center body-3 text-[#bdbdbd]">
      <div
        className={`relative flex items-center justify-center w-[1.5rem] h-[1.5rem] text-[#464646]`}
      >
        <div
          className={`flex items-center justify-center w-[1.25rem] h-[1.25rem] rounded-full bg-[#FEF387]`}
        >
          1
        </div>
      </div>
      <div
        className={`relative w-[1rem] h-[0.125rem] ${currentStep !== 1 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}`}
      />
      <div
        className={`relative flex items-center justify-center w-[1.5rem] h-[1.5rem] ${currentStep >= 2 && 'text-[#464646]'}`}
      >
        <div
          className={`flex items-center justify-center w-[1.25rem] h-[1.25rem] rounded-full ${currentStep >= 2 ? 'bg-[#FEF387]' : 'border border-[#F4F4F9] bg-white'}`}
        >
          2
        </div>
      </div>
      <div
        className={`relative w-[1rem] h-[0.125rem] ${currentStep === 3 ? 'bg-[#FEF387]' : 'bg-[#F4F4F9]'}`}
      />
      <div
        className={`relative flex items-center justify-center w-[1.5rem] h-[1.5rem] ${currentStep === 3 && 'text-[#464646]'}`}
      >
        <div
          className={`flex items-center justify-center w-[1.25rem] h-[1.25rem] rounded-full ${currentStep === 3 ? 'bg-[#FEF387]' : 'border border-[#F4F4F9] bg-white'}`}
        >
          3
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
