import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { APPLICATION_STEP } from '@/constants/application';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import {
  AppicationItemType,
  ApplicationStepType,
} from '@/types/application/applicationItem';
import { formatMoney } from '@/utils/formatMoney';
import { useNavigate } from 'react-router-dom';

const statusStyler = (status: ApplicationStepType) => {
  switch (status) {
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return 'bg-[#C7C6F6]';
    case APPLICATION_STEP.RESUME_REJECTED:
      return 'bg-[#FFC6C0]';
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return 'bg-[#FFC6C0]';
    case APPLICATION_STEP.PENDING:
      return 'bg-[#BDBDBD]';
    default:
      return 'bg-[#FEF387]';
  }
};

type ApplicationCardPropsType = {
  applicationData: AppicationItemType;
};

const ApplicationCard = ({ applicationData }: ApplicationCardPropsType) => {
  const navigate = useNavigate();
  const { updateCurrentPostId } = useCurrentPostIdEmployeeStore();
  return (
    <article className="w-full border-[0.031rem] border-[#1E19263D] rounded-[1.125rem] overflow-hidden">
      <div
        className={`flex justify-between items-center px-[1rem] py-[0.5rem] ${statusStyler(applicationData.step)}`}
      >
        <div className="flex gap-[0.25rem]">
          <p className="pl-[0.5rem] caption text-[#1E1926]">
            {applicationData.step.replace(/_/g, ' ').toLowerCase()}
          </p>
          <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-[#FF6F61]"></div>
        </div>
        <RightArrowIcon
          onClick={() => {
            updateCurrentPostId(applicationData.user_owner_job_posting_id);
            navigate(
              `/application/${applicationData.user_owner_job_posting_id}`,
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-[1.25rem] w-full px-[1.5rem] pt-[1.5rem] pb-[1rem]">
        <div className="flex gap-[0.75rem]">
          {applicationData?.icon_img_url ? (
            <div
              className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-cover"
              style={{
                backgroundImage: `url(${applicationData.icon_img_url})`,
              }}
            ></div>
          ) : (
            <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-[#F4F4F9]]"></div>
          )}
          <div>
            <h3 className="pb-[0.25rem] head-3 text-[#1E1926]">
              {applicationData.title}
            </h3>
            <p className="body-3 text-[#464646]">
              {applicationData.address_name}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-end pt-[0.25rem]">
          <Tag
            value={`${formatMoney(applicationData.hourly_rate)} KRW`}
            padding="py-[0.375rem] px-[0.75rem]"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor="bg-surface-base"
            color="text-text-strong"
            borderColor="text-text-strong"
            fontStyle="caption"
          />
          <p className="body-3 text-[#656565]">
            {applicationData.duration_of_days} Days After
          </p>
        </div>
      </div>
      <div className="flex">
        <button
          className="flex-1 py-[0.75rem] caption text-[#F4F4F9] bg-[#1E1926]  text-center"
          onClick={() => {
            updateCurrentPostId(applicationData.user_owner_job_posting_id);
            navigate(
              `/application/${applicationData.user_owner_job_posting_id}`,
            );
          }}
        >
          Read More Posting
        </button>
        <button
          className="flex-1 py-[0.75rem] caption text-[#1E1926] bg-[#FEF387]  text-center"
          onClick={() => {
            updateCurrentPostId(applicationData.user_owner_job_posting_id);
            navigate(
              `/application/${applicationData.user_owner_job_posting_id}`,
            );
          }}
        >
          Check Application Status
        </button>
      </div>
    </article>
  );
};

export default ApplicationCard;
