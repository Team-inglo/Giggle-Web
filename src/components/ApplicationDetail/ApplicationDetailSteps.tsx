import ApplicationDetailStepBarLayout from '@/components/ApplicationDetail/ApplicationDetailStepBarLayout';
import { APPLICATION_STEP_EXPLAIN_DATA } from '@/constants/application';
import { applicationTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';
import { ApplicationStepType } from '@/types/application/applicationItem';

type ApplicationDetailStepsProps = {
  step: ApplicationStepType;
};

const ApplicationDetailSteps = ({ step }: ApplicationDetailStepsProps) => {
  const { account_type } = useUserStore();
  const isEmployer = isEmployerByAccountType(account_type);

  return (
    <>
      <section className="w-full p-4">
        <h3 className="px-2 pb-2 heading-18-semibold text-text-strong">
          {applicationTranslation.applicationTitle[isEmployer]}
        </h3>
        <p className="px-2 body-14-regular text-text-alternative">
          {applicationTranslation.applicationSubTitle[isEmployer]}
        </p>
        <div className="w-full pt-10">
          {APPLICATION_STEP_EXPLAIN_DATA.map((data) => (
            <ApplicationDetailStepBarLayout
              key={data.step}
              applicationStep={step}
              currentStep={data.step}
              title={data.title[isEmployer]}
              explain={data.explain[isEmployer]}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ApplicationDetailSteps;
