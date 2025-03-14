import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import CurrentStepIcon from '@/assets/icons/ApplicationDetail/CurrentStepIcon.svg?react';
import UncheckStepIcon from '@/assets/icons/ApplicationDetail/UncheckStepIcon.svg?react';
import ApplicationDetailStepBarLayout from '@/components/ApplicationDetail/ApplicationDetailStepBarLayout';
import { APPLICATION_STEP_EXPLAIN_DATA } from '@/constants/application';
import { applicationTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';

type ApplicationDetailStepsProps = {
  step: number;
};

const ApplicationDetailSteps = ({ step }: ApplicationDetailStepsProps) => {
  const { account_type } = useUserStore();

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
    <section>
      <h3 className="px-2 pb-2 head-3 text-text-strong">
        {
          applicationTranslation.applicationTitle[
            isEmployerByAccountType(account_type)
          ]
        }
      </h3>
      <p className="px-2 pb-10 body-3 text-text-alternative">
        {
          applicationTranslation.applicationSubTitle[
            isEmployerByAccountType(account_type)
          ]
        }
      </p>
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
    </section>
  );
};

export default ApplicationDetailSteps;
