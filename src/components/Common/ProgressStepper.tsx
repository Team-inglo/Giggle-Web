type ProgressStepperProps = {
  totalCount: number;
  currentStep: number;
};

const ProgressStepper = ({ totalCount, currentStep }: ProgressStepperProps) => {
  const renderStepper = () => {
    const getStepColor = (index: number) => {
      if (index + 1 <= currentStep) {
        return 'bg-surface-invert';
      } else {
        return 'bg-surface-tertiary';
      }
    };
    return Array.from({ length: totalCount }, (_, index) => (
      <div
        key={index}
        className={`w-full h-0.5 ${getStepColor(index)} rounded-full`}
      />
    ));
  };

  return <div className="px-4 py-2 flex gap-1">{renderStepper()}</div>;
};

export default ProgressStepper;
