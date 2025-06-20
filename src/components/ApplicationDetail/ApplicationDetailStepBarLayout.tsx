import CheckStepIcon from '@/assets/icons/ApplicationDetail/CheckStepIcon.svg?react';
import Icon from '@/components/Common/Icon';
import Tag from '@/components/Common/Tag';
import InfoBanner from '@/components/Common/InfoBanner';
import { APPLICATION_STEP } from '@/constants/application';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { findCurrentStep } from '@/utils/application';
import { InfoBannerSize } from '@/types/common/infoBanner';

type ApplicationDetailStepBarLayoutProps = {
  applicationStep: ApplicationStepType; // 현재 신청 진행 step
  currentStep: number; // 레이아웃이 나타내는 step 번호
  title: string;
  explain: string;
};

const ApplicationDetailStepBarLayout = ({
  applicationStep,
  currentStep,
  title,
  explain,
}: ApplicationDetailStepBarLayoutProps) => {
  const { account_type } = useUserStore();

  const applicationStepNumber = findCurrentStep(applicationStep);
  const isLastStep = currentStep === 6;

  const createBadgeUI = {
    green: (message: string) => (
      <Tag
        value={message}
        padding="px-1 pt-[0.125rem] pb-[0.188rem]"
        isRounded={true}
        hasCheckIcon={false}
        backgroundColor="bg-status-green-100"
        color="text-status-green-300"
        fontStyle="caption-11-semibold"
      />
    ),
    blue: (message: string) => (
      <Tag
        value={message}
        padding="px-1 pt-[0.125rem] pb-[0.188rem]"
        isRounded={true}
        hasCheckIcon={false}
        backgroundColor="bg-status-blue-100"
        color="text-status-blue-300"
        fontStyle="caption-11-semibold"
      />
    ),
    red: (message: string) => (
      <Tag
        value={message}
        padding="px-1 pt-[0.125rem] pb-[0.188rem]"
        isRounded={true}
        hasCheckIcon={false}
        backgroundColor="bg-status-red-100"
        color="text-status-red-400"
        fontStyle="caption-11-semibold"
      />
    ),
    grey: (message: string) => (
      <Tag
        value={message}
        padding="px-1 pt-[0.125rem] pb-[0.188rem]"
        isRounded={true}
        hasCheckIcon={false}
        backgroundColor="bg-surface-secondary"
        color="text-neutral-700"
        fontStyle="caption-11-semibold"
      />
    ),
  };

  // 현재 진행중인 Step인 경우 상세 설명 및 Badge 값 결정
  const showCurrentStepContent = (currentStep: ApplicationStepType) => {
    type MessageType = {
      badge: JSX.Element;
      content: JSX.Element;
    };

    const messageMap: Record<
      UserType,
      Partial<Record<ApplicationStepType, MessageType>>
    > = {
      [UserType.USER]: {
        [APPLICATION_STEP.RESUME_UNDER_REVIEW]: {
          badge: createBadgeUI.green('지원완료'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              고용주가 이력서를 확인 중이에요.
              <br /> 결과는 알림으로 안내드릴게요.
            </p>
          ),
        },
        [APPLICATION_STEP.RESUME_REJECTED]: {
          badge: createBadgeUI.red('거절됨'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              아쉽지만 이번 기회는 함께하지 못하게 되었어요.
            </p>
          ),
        },
        [APPLICATION_STEP.WAITING_FOR_INTERVIEW]: {
          badge: createBadgeUI.blue('진행 가능'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              제안이 도착했어요! 면접을 진행해주세요
            </p>
          ),
        },
        [APPLICATION_STEP.FILLING_OUT_DOCUMENTS]: {
          badge: createBadgeUI.blue('제출 필요'),
          content: (
            <>
              <p className="pt-3 pb-2 body-14-medium text-text-normal">
                서류 작성이 필요해요.
                <br />
                필수서류 3가지를 한번에 생성하고 제출해주세요.
              </p>
              <InfoBanner
                size={InfoBannerSize.SM}
                hasIcon={true}
                text="아직 3가지의 서류작성이 남아있어요"
              />
            </>
          ),
        },
        [APPLICATION_STEP.DOCUMENT_UNDER_REVIEW]: {
          badge: createBadgeUI.green('검토 중'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              현재 학교에서 서류를 검토하고 있어요.
              <br />
              잠시만 기다려주세요!
            </p>
          ),
        },
        [APPLICATION_STEP.APPLICATION_IN_PROGRESS]: {
          badge: createBadgeUI.blue('검토 진행중'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              정부 시스템을 통해 고용 허가를 접수해요.
              <br />
              잠시만 기다려주세요!
            </p>
          ),
        },
        [APPLICATION_STEP.REGISTERING_RESULTS]: {
          badge: createBadgeUI.blue('등록 필요'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              축하드려요! 채용 프로세스가 모두 끝났어요.
              <br />
              최종 등록을 완료해주세요!
            </p>
          ),
        },
        [APPLICATION_STEP.APPLICATION_SUCCESS]: {
          badge: createBadgeUI.green('채용 확정'),
          content: <></>,
        },
        [APPLICATION_STEP.APPLICATION_REJECTED]: {
          badge: createBadgeUI.red('채용 실패'),
          content: <></>,
        },
      },
      [UserType.OWNER]: {
        [APPLICATION_STEP.RESUME_UNDER_REVIEW]: {
          badge: createBadgeUI.blue('열람가능'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              지원자의 이력서를 지금 열람할 수 있어요!
            </p>
          ),
        },
        [APPLICATION_STEP.RESUME_REJECTED]: {
          badge: createBadgeUI.grey('거절함'),
          content: <></>,
        },
        [APPLICATION_STEP.WAITING_FOR_INTERVIEW]: {
          badge: createBadgeUI.blue('진행 가능'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              지원자와 면접을 통해 근무조건을 상의해요
            </p>
          ),
        },
        [APPLICATION_STEP.FILLING_OUT_DOCUMENTS]: {
          badge: createBadgeUI.blue('확인가능'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              지원자가 작성한 서류를 확인하고, 나머지 서류 작성을 직접
              완료해주세요!
            </p>
          ),
        },
        [APPLICATION_STEP.DOCUMENT_UNDER_REVIEW]: {
          badge: createBadgeUI.green('검토 중'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              소속 학교에서 지원자서류를 검토하는 중이에요
            </p>
          ),
        },
        [APPLICATION_STEP.APPLICATION_IN_PROGRESS]: {
          badge: createBadgeUI.green('검토 중'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              고용허가가 정상적으로 접수됐어요.
            </p>
          ),
        },
        [APPLICATION_STEP.REGISTERING_RESULTS]: {
          badge: <></>,
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              모든 절차가 마무리되었어요.
            </p>
          ),
        },
        [APPLICATION_STEP.APPLICATION_SUCCESS]: {
          badge: createBadgeUI.green('채용 확정'),
          content: (
            <p className="pt-3 body-14-medium text-text-normal">
              채용이 완료됐어요! 좋은 파트너를 찾으셨네요.
            </p>
          ),
        },
        [APPLICATION_STEP.APPLICATION_REJECTED]: {
          badge: createBadgeUI.red('채용 실패'),
          content: <></>,
        },
      },
    };

    if (!account_type) return null;

    const message = messageMap[account_type]?.[currentStep];
    return message ?? null;
  };

  return (
    <div className={`flex items-stretch gap-2 ${isLastStep && 'pb-4'}`}>
      {/* Progress Tracker */}
      <div className="flex flex-col items-center">
        {/* Progress Tracker의 아이콘 */}
        <p
          className={`flex justify-center items-center w-5 h-5 caption-12-semibold text-text-invert rounded-full  ${applicationStepNumber >= currentStep ? 'bg-status-blue-300' : 'bg-surface-tertiary'}`}
        >
          {currentStep < applicationStepNumber ? (
            <Icon icon={CheckStepIcon} />
          ) : (
            currentStep
          )}
        </p>
        {/* Progress Tracker의 막대기 */}
        {!isLastStep && (
          <div
            className={`w-[0.125rem] flex-1 ${applicationStepNumber > currentStep ? 'bg-status-blue-300' : 'bg-surface-tertiary'}`}
          ></div>
        )}
      </div>
      {/* 각 Step별 정보 */}
      <article className="flex-1 pb-6">
        {/* 각 Step별 제목 및 설명 */}
        <div className="flex items-center gap-[0.375rem]">
          <h5
            className={`${applicationStepNumber === currentStep ? 'text-text-strong' : 'text-text-assistive'} heading-16-semibold`}
          >
            {title}
          </h5>
          {applicationStepNumber > currentStep && createBadgeUI.grey('완료')}
          {applicationStepNumber === currentStep &&
            showCurrentStepContent(applicationStep)?.badge}
          {applicationStepNumber < currentStep && (
            <p className="caption-12-regular text-text-assistive">{explain}</p>
          )}
        </div>
        {/* 각 Step별 내용 */}
        {applicationStepNumber === currentStep &&
          showCurrentStepContent(applicationStep)?.content}
      </article>
    </div>
  );
};

export default ApplicationDetailStepBarLayout;
