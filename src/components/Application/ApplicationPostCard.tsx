import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import { APPLICATION_STEP } from '@/constants/application';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import {
  AppicationItemType,
  ApplicationStepType,
} from '@/types/application/applicationItem';
import { formatMoney } from '@/utils/formatMoney';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Common/Tag';

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

type ApplicationPostCardPropsType = {
  applicationData: AppicationItemType;
};

const ApplicationPostCard = ({
  applicationData,
}: ApplicationPostCardPropsType) => {
  const navigate = useNavigate();
  const { updateCurrentPostId } = useCurrentPostIdEmployeeStore();
  return (
    <article className="w-full p-4 rounded-lg bg-surface-base">
      {renderStatusBar(applicationData?.step)}
      <h4 className="pt-2 button-2 text-text-normal">
        {applicationData?.company_name}
      </h4>
      <h3 className={`pt-1 head-3 text-text-normal line-clamp-2`}>
        {applicationData?.title}
      </h3>
      <div className="py-2 flex items-center gap-2">
        <LocationIcon />
        <p className="caption text-text-normal">
          {applicationData?.address_name}
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="body-2 text-text-normal">
          <span className="mr-[0.125rem] text-text-alternative body-3">Hr</span>
          {formatMoney(applicationData?.hourly_rate)}KRW
        </p>
        <p className="caption text-text-alternative">
          {applicationData.duration_of_days} Days After
        </p>
      </div>
      <div className="w-full flex gap-2 pt-5">
        <button
          onClick={() => {
            updateCurrentPostId(applicationData.job_posting_id);
            navigate(`/post/${applicationData.job_posting_id}`);
          }}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-surface-secondary button-2"
        >
          View Details
        </button>
        <button
          onClick={() => {
            updateCurrentPostId(applicationData.user_owner_job_posting_id);
            navigate(
              `/application/${applicationData.user_owner_job_posting_id}`,
            );
          }}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-primary-normal button-2"
        >
          Check Status
        </button>
      </div>
    </article>
  );
};

export default ApplicationPostCard;
