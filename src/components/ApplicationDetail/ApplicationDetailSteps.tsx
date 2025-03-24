import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import CurrentStepIcon from '@/assets/icons/ApplicationDetail/CurrentStepIcon.svg?react';
import UncheckStepIcon from '@/assets/icons/ApplicationDetail/UncheckStepIcon.svg?react';
import ApplicationDetailStepBarLayout from '@/components/ApplicationDetail/ApplicationDetailStepBarLayout';
import { APPLICATION_STEP_EXPLAIN_DATA } from '@/constants/application';
import { applicationTranslation } from '@/constants/translation';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';
import { useState } from 'react';
import ContactRecruiterBottomSheet from '@/components/ApplicationDetail/ContactRecruiterBottomSheet';

type ApplicationDetailStepsProps = {
  step: number;
};

const ApplicationDetailSteps = ({ step }: ApplicationDetailStepsProps) => {
  const { account_type } = useUserStore();
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const stepIconStyler = (currentStep: number) => {
    if (step > currentStep) {
      return <CheckStepIcon />;
    } else if (step === currentStep) {
      return <CurrentStepIcon />;
    } else {
      return <UncheckStepIcon />;
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
        <p className="px-2 body-3 text-text-alternative">
          {
            applicationTranslation.applicationSubTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
        {step === 2 && account_type === UserType.USER && (
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
        )}
        <div className="w-full pt-10">
          {APPLICATION_STEP_EXPLAIN_DATA.map((data) => (
            <ApplicationDetailStepBarLayout
              key={data.step}
              stepIcon={stepIconStyler(data.step)}
              step={step}
              currentStep={data.step}
              title={data.title[isEmployerByAccountType(account_type)]}
              explain={data.explain[isEmployerByAccountType(account_type)]}
              isLastStep={data.step === 6}
            />
          ))}
        </div>
      </section>
      {step === 2 && account_type === UserType.USER && (
        <ContactRecruiterBottomSheet
          isShowBottomsheet={isShowBottomsheet}
          setIsShowBottomSheet={setIsShowBottomSheet}
        />
      )}
    </>
  );
};

export default ApplicationDetailSteps;
