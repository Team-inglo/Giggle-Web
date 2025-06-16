import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import Icon from '@/components/Common/Icon';
import Tag from '@/components/Common/Tag';

type ApplicationDetailStepBarLayoutProps = {
  step: number; // 현재 진행 step
  currentStep: number; // 레이아웃이 나타내는 step 번호
  title: string;
  explain: string;
  isLastStep?: boolean; // 마지막 stepBar인지
};

const ApplicationDetailStepBarLayout = ({
  step,
  currentStep,
  title,
  explain,
}: ApplicationDetailStepBarLayoutProps) => {
  const isLastStep = currentStep === 6;

  return (
    <div className={`flex items-stretch gap-2 ${isLastStep && 'pb-4'}`}>
      <div className="flex flex-col items-center">
        <p
          className={`flex justify-center items-center w-5 h-5 caption-12-semibold text-text-invert rounded-full  ${step >= currentStep ? 'bg-statusBlue-300' : 'bg-surface-tertiary'}`}
        >
          {currentStep < step ? <Icon icon={CheckStepIcon} /> : currentStep}
        </p>
        {!isLastStep && (
          <div
            className={`w-[0.125rem] flex-1 ${step > currentStep ? 'bg-statusBlue-300' : 'bg-surface-tertiary'}`}
          ></div>
        )}
      </div>
      <article className="pb-6">
        <div className="flex items-center gap-[0.375rem]">
          <h5
            className={`${step >= currentStep ? 'text-text-strong' : 'text-text-assistive'} heading-16-semibold`}
          >
            {title}
          </h5>
          {step === currentStep ? (
            <Tag
              value="대기중"
              padding="px-1 pt-[0.125rem] pb-[0.188rem]"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor="bg-[#0066FF]/10"
              color="text-text-success"
              fontStyle="caption-11-semibold"
            />
          ) : (
            <p
              className={`caption-12-regular ${step >= currentStep ? 'text-text-success' : 'text-text-assistive'}`}
            >
              {explain}
            </p>
          )}
        </div>
        {step === currentStep && (
          <p className="pt-3 body-14-medium text-text-normal">
            바디값이 있다면 보여주기
          </p>
        )}
      </article>
    </div>
  );
};

export default ApplicationDetailStepBarLayout;
