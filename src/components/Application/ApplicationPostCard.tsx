import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { formatMoney } from '@/utils/formatMoney';
import Tag from '@/components/Common/Tag';
import { EmployerPostItemType } from '@/types/post/employerPostItem';

const renderStatusBar = (status: ApplicationStepType) => {
  switch (status) {
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return (
        <Tag
          value="Application Success 🎉"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#0066FF]/8"
          color="text-text-success"
          fontStyle="caption"
        />
      );
    case APPLICATION_STEP.RESUME_REJECTED:
      return (
        <Tag
          value="Resume Rejected ⚠"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#FF5252]/8"
          color="text-text-error"
          fontStyle="caption"
        />
      );
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return (
        <Tag
          value="Application Rejected ⚠"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#FF5252]/8"
          color="text-text-error"
          fontStyle="caption"
        />
      );
    default:
      return (
        <Tag
          value="Application in Progress 🔍"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-surface-secondary"
          color="text-text-normal"
          fontStyle="caption"
        />
      );
  }
};

// 6.6, 6.1 api의 공통된 부분만 사용
type postCardType = Omit<EmployerPostItemType, 'id'> & {
  step?: ApplicationStepType;
};

type ApplicationPostCardPropsType = {
  postData: postCardType;
  handleClickLeftButton: () => void;
  leftButtonText: string;
  handleClickRightButton: () => void;
  rightButtonText: string;
};

const ApplicationPostCard = ({
  postData,
  handleClickLeftButton,
  leftButtonText,
  handleClickRightButton,
  rightButtonText,
}: ApplicationPostCardPropsType) => {
  return (
    <article className="w-full p-4 rounded-lg bg-surface-base">
      {!!postData?.step && (
        <div className="pb-2">{renderStatusBar(postData?.step)}</div>
      )}
      <h4 className="button-2 text-text-normal">{postData?.company_name}</h4>
      <h3 className={`pt-1 head-3 text-text-normal line-clamp-2`}>
        {postData?.title}
      </h3>
      <div className="py-2 flex items-center gap-2">
        <LocationIcon />
        <p className="caption text-text-normal">{postData?.address_name}</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="body-2 text-text-normal">
          <span className="mr-[0.125rem] text-text-alternative body-3">Hr</span>
          {formatMoney(postData?.hourly_rate)}KRW
        </p>
        <p className="caption text-text-alternative">
          {postData.duration_of_days} Days After
        </p>
      </div>
      <div className="w-full flex gap-2 pt-5">
        <button
          onClick={handleClickLeftButton}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-surface-secondary button-2"
        >
          {leftButtonText}
        </button>
        <button
          onClick={handleClickRightButton}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-primary-normal button-2"
        >
          {rightButtonText}
        </button>
      </div>
    </article>
  );
};

export default ApplicationPostCard;
