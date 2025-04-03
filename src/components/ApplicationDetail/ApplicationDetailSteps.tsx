import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import CurrentStepIcon from '@/assets/icons/ApplicationDetail/CurrentStepIcon.svg?react';
import UncheckStepIcon from '@/assets/icons/ApplicationDetail/UncheckStepIcon.svg?react';
import SuccessIcon from '@/assets/icons/ApplicationDetail/SuccessIcon.svg?react';
import RejectIcon from '@/assets/icons/ApplicationDetail/RejectIcon.svg?react';
import MessageIcon from '@/assets/icons/ApplicationDetail/MessageIcon.svg?react';
import ApplicationDetailStepBarLayout from '@/components/ApplicationDetail/ApplicationDetailStepBarLayout';
import {
  APPLICATION_STEP,
  APPLICATION_STEP_EXPLAIN_DATA,
} from '@/constants/application';
import { applicationTranslation } from '@/constants/translation';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';
import { useState } from 'react';
import ContactRecruiterBottomSheet from '@/components/ApplicationDetail/ContactRecruiterBottomSheet';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { findCurrentStep } from '@/utils/application';

type ApplicationDetailStepsProps = {
  step: ApplicationStepType;
};

const ApplicationDetailSteps = ({ step }: ApplicationDetailStepsProps) => {
  const { account_type } = useUserStore();
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const stepIconStyler = (currentStep: number) => {
    if (findCurrentStep(step) > currentStep) {
      return <CheckStepIcon />;
    } else if (findCurrentStep(step) === currentStep) {
      return <CurrentStepIcon />;
    } else {
      return <UncheckStepIcon />;
    }
  };

  const showCurrentStepMessage = (currentStep: number) => {
    if (account_type === UserType.USER && currentStep === 2) {
      return (
        <>
          <article className="w-full mt-2 p-4 rounded-lg bg-surface-secondary">
            <h5 className="pb-1 button-2 text-text-normal">
              Waiting for employer response… ⏳
            </h5>
            <p className="pb-4 caption text-text-alternative">
              The employer will request an interview soon. Hang tight!
            </p>
            <button
              className="caption text-text-assistive underline"
              onClick={() => setIsShowBottomSheet(true)}
            >
              Didn't get a response? 😓
            </button>
          </article>
          <ContactRecruiterBottomSheet
            isShowBottomsheet={isShowBottomsheet}
            setIsShowBottomSheet={setIsShowBottomSheet}
          />
        </>
      );
    } else if (account_type === UserType.USER && currentStep === 7) {
      return (
        <>
          {step === APPLICATION_STEP.APPLICATION_SUCCESS ? (
            <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-[#0066FF]/10 rounded">
              <SuccessIcon />
              <p className="body-2 text-text-success">
                This application is successed.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
              <RejectIcon />
              <p className="body-2 text-text-error">
                This application is rejected.
              </p>
            </div>
          )}
        </>
      );
    } else if (
      account_type === UserType.USER &&
      step === APPLICATION_STEP.RESUME_REJECTED
    ) {
      return (
        <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
          <RejectIcon />
          <p className="body-2 text-text-error">
            Your resume has been rejected.
          </p>
        </div>
      );
    } else if (
      account_type === UserType.OWNER &&
      step === APPLICATION_STEP.RESUME_REJECTED
    ) {
      return (
        <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-primary-neutral rounded">
          <MessageIcon />
          <p className="body-2 text-text-alternative">이력서를 거절했습니다.</p>
        </div>
      );
    } else if (
      account_type === UserType.OWNER &&
      (currentStep === 4 || currentStep === 5)
    ) {
      return (
        <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-primary-neutral rounded">
          <MessageIcon />
          <p className="body-2 text-text-alternative">
            현재 지원자가 담당자에게 서류를 검토받고 있어요
          </p>
        </div>
      );
    } else if (account_type === UserType.OWNER && currentStep === 6) {
      return (
        <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-primary-neutral rounded">
          <MessageIcon />
          <p className="body-2 text-text-alternative">
            현재 지원자가 결과를 기다리고 있어요
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <section className="w-full p-4">
        <h3 className="px-2 pb-2 head-3 text-text-strong">
          {
            applicationTranslation.applicationTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="px-2 body-2 text-text-alternative">
          {
            applicationTranslation.applicationSubTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
        {showCurrentStepMessage(findCurrentStep(step))}
        <div className="w-full pt-10">
          {APPLICATION_STEP_EXPLAIN_DATA.map((data) => (
            <ApplicationDetailStepBarLayout
              key={data.step}
              stepIcon={stepIconStyler(data.step)}
              step={findCurrentStep(step)}
              currentStep={data.step}
              title={data.title[isEmployerByAccountType(account_type)]}
              explain={data.explain[isEmployerByAccountType(account_type)]}
              isLastStep={data.step === 6}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ApplicationDetailSteps;
