type ApplicationDetailStepBarLayoutProps = {
  stepIcon: JSX.Element;
  step: number; // 현재 진행 step
  currentStep: number; // 레이아웃이 나타내는 step 번호
  title: string;
  explain: string;
  isLastStep?: boolean; // 마지막 stepBar인지
};

const ApplicationDetailStepBarLayout = ({
  stepIcon,
  step,
  currentStep,
  title,
  explain,
  isLastStep = false,
}: ApplicationDetailStepBarLayoutProps) => {
  return (
    <div className={`flex gap-[1.125rem] ${isLastStep && 'pb-4'}`}>
      {isLastStep ? (
        <>{stepIcon}</>
      ) : (
        <div className="flex flex-col items-center">
          {stepIcon}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > currentStep ? 'bg-primary-dark' : 'bg-surface-tertiary'}`}
          ></div>
        </div>
      )}
      <div>
        <h5
          className={`${step >= currentStep ? 'text-text-normal' : 'text-text-alternative'} heading-18-semibold`}
        >
          {title}
        </h5>
        <p className="caption-12-regular text-text-alternative">{explain}</p>
      </div>
    </div>
  );
};

export default ApplicationDetailStepBarLayout;
