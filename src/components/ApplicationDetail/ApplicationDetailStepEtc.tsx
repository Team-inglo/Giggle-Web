import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';

type ApplicationDetailStepEtcProps = {
  result: ApplicationStepType;
};

const ApplicationDetailStepEtc = ({
  result,
}: ApplicationDetailStepEtcProps) => {
  return (
    <>
      <section className="w-full px-4 pb-[3.125rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor={'bg-primary-neutral'}
          fontColor="text-text-disabled"
          title={
            result === APPLICATION_STEP.PENDING
              ? "I'm on standby for more than two weeks"
              : 'Your resume has been rejected'
          }
          isBorder={false}
        />
      </section>
    </>
  );
};

export default ApplicationDetailStepEtc;
