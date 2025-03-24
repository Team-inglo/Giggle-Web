import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import RejectIcon from '@/assets/icons/ApplicationDetail/RejectIcon.svg?react';

type ApplicationDetailStepEtcProps = {
  result: ApplicationStepType;
};

const ApplicationDetailStepEtc = ({
  result,
}: ApplicationDetailStepEtcProps) => {
  return (
    <>
      <section className="w-full px-4 pt-3 pb-[3.125rem]">
        <div className="flex items-center gap-1 mb-6 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
          <RejectIcon />
          <p className="caption text-text-error">
            {result === APPLICATION_STEP.PENDING
              ? "I'm on standby for more than two weeks"
              : 'Your resume has been rejected'}
          </p>
        </div>
      </section>
    </>
  );
};

export default ApplicationDetailStepEtc;
