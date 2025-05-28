import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { formatMoney } from '@/utils/formatMoney';
import Tag from '@/components/Common/Tag';
import { EmployerPostItemType } from '@/types/post/employerPostItem';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';

const renderStatusBar = (status: ApplicationStepType) => {
  switch (status) {
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return (
        <Tag
          value="Application Success 🎉"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#0066FF]/10"
          color="text-text-success"
          fontStyle="caption-12-regular"
        />
      );
    case APPLICATION_STEP.RESUME_REJECTED:
      return (
        <Tag
          value="Resume Rejected ⚠"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#FF5252]/10"
          color="text-text-error"
          fontStyle="caption-12-regular"
        />
      );
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return (
        <Tag
          value="Application Rejected ⚠"
          padding="px-1 py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-[#FF5252]/10"
          color="text-text-error"
          fontStyle="caption-12-regular"
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
          fontStyle="caption-12-regular"
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
  const { account_type } = useUserStore();

  return (
    <article className="w-full p-4 rounded-lg bg-surface-base">
      {!!postData?.step && (
        <div className="pb-2">{renderStatusBar(postData?.step)}</div>
      )}
      <h4 className="button-14-semibold text-text-normal">
        {postData?.company_name}
      </h4>
      <h3 className={`pt-1 heading-18-semibold text-text-normal line-clamp-2`}>
        {postData?.title}
      </h3>
      <div className="py-2 flex items-center gap-2">
        <LocationIcon />
        <p className="caption-12-regular text-text-normal">
          {postData?.address_name}
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="body-14-regular text-text-normal">
          <span className="mr-[0.125rem] text-text-alternative caption-12-regular">
            {postTranslation.Hr[isEmployerByAccountType(account_type)]}
          </span>
          {formatMoney(postData?.hourly_rate)}
          {postTranslation.KRW[isEmployerByAccountType(account_type)]}
        </p>
        <p className="caption-12-regular text-text-alternative">
          {postData.duration_of_days}{' '}
          {postTranslation.daysAfter[isEmployerByAccountType(account_type)]}
        </p>
      </div>
      <div className="w-full flex gap-2 pt-5">
        <button
          onClick={handleClickLeftButton}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-surface-secondary button-14-semibold"
        >
          {leftButtonText}
        </button>
        <button
          onClick={handleClickRightButton}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-primary-normal button-14-semibold"
        >
          {rightButtonText}
        </button>
      </div>
    </article>
  );
};

export default ApplicationPostCard;
