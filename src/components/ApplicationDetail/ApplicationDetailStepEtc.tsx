import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import Button from '@/components/Common/Button';

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
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title={
            result === APPLICATION_STEP.PENDING
              ? "I'm on standby for more than two weeks"
              : 'Your resume has been rejected'
          }
        />
      </section>
    </>
  );
};

export default ApplicationDetailStepEtc;
