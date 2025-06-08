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

  const createMessageUI = {
    // 성공 메시지
    success: (message: string) => (
      <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-[#0066FF]/10 rounded">
        <SuccessIcon />
        <p className="body-14-regular text-text-success">{message}</p>
      </div>
    ),
    // 거절 메시지
    error: (message: string) => (
      <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-[#ff5252]/10 rounded">
        <RejectIcon />
        <p className="body-14-regular text-text-error">{message}</p>
      </div>
    ),
    // 일반 메시지
    info: (message: string) => (
      <div className="flex items-center gap-1 mt-2 py-[0.625rem] px-2 bg-primary-neutral rounded">
        <MessageIcon />
        <p className="body-14-regular text-text-alternative">{message}</p>
      </div>
    ),
    waiting: () => (
      <>
        <article className="w-full mt-2 p-4 rounded-lg bg-surface-secondary">
          <h5 className="pb-1 button-14-semibold text-text-normal">
            Waiting for employer response… ⏳
          </h5>
          <p className="pb-4 caption-12-regular text-text-alternative">
            The employer will request an interview soon. Hang tight!
          </p>
          <button
            className="caption-12-regular text-text-assistive underline"
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
    ),
  };

  const showCurrentStepMessage = (currentStep: ApplicationStepType) => {
    const messageMap: Record<
      UserType,
      Partial<Record<ApplicationStepType, JSX.Element>>
    > = {
      [UserType.USER]: {
        [APPLICATION_STEP.WAITING_FOR_INTERVIEW]: createMessageUI.waiting(),
        [APPLICATION_STEP.APPLICATION_SUCCESS]: createMessageUI.success(
          'This application is successed.',
        ),
        [APPLICATION_STEP.APPLICATION_REJECTED]: createMessageUI.error(
          'This application is rejected.',
        ),
        [APPLICATION_STEP.RESUME_REJECTED]: createMessageUI.error(
          'Your resume has been rejected.',
        ),
      },
      [UserType.OWNER]: {
        [APPLICATION_STEP.RESUME_REJECTED]:
          createMessageUI.info('이력서를 거절했습니다.'),
        [APPLICATION_STEP.DOCUMENT_UNDER_REVIEW]: createMessageUI.info(
          '현재 지원자가 담당자에게 서류를 검토받고 있어요',
        ),
        [APPLICATION_STEP.APPLICATION_IN_PROGRESS]: createMessageUI.info(
          '현재 지원자가 담당자에게 서류를 검토받고 있어요',
        ),
        [APPLICATION_STEP.REGISTERING_RESULTS]: createMessageUI.info(
          '현재 지원자가 결과를 기다리고 있어요',
        ),
      },
    };

    if (!account_type) return null;

    const message = messageMap[account_type]?.[currentStep];
    return message ?? null;
  };

  return (
    <>
      <section className="w-full p-4">
        <h3 className="px-2 pb-2 heading-18-semibold text-text-strong">
          {
            applicationTranslation.applicationTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </h3>
        <p className="px-2 body-14-regular text-text-alternative">
          {
            applicationTranslation.applicationSubTitle[
              isEmployerByAccountType(account_type)
            ]
          }
        </p>
        {showCurrentStepMessage(step)}
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
