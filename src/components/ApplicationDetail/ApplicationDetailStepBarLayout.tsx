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
    <div className={`flex gap-[1.125rem] ${isLastStep && 'pb-[2.75rem]'}`}>
      {isLastStep ? (
        <>{stepIcon}</>
      ) : (
        <div className="flex flex-col items-center">
          {stepIcon}
          <div
            className={`w-[0.125rem] h-[3.5rem] ${step > currentStep ? 'bg-[#1E1926]' : 'bg-[#F2F2F2]'}`}
          ></div>
        </div>
      )}
      <div>
        <h5
          className={`${step >= currentStep ? 'head-3' : 'body-1'} text-[#464646]`}
        >
          {title}
        </h5>
        <p className="caption text-[#656565]">{explain}</p>
      </div>
    </div>
  );
};

export default ApplicationDetailStepBarLayout;
