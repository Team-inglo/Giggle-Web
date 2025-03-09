import { APPLICATION_STEP } from '@/constants/application';
import {
  ApplicantItemType,
  ApplicationStepType,
} from '@/types/application/applicationItem';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { useNavigate } from 'react-router-dom';
import { useCurrentApplicantIdStore } from '@/store/url';

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

type EmployerApplicantCardPropsType = {
  applicantData: ApplicantItemType;
};

const EmployerApplicantCard = ({
  applicantData,
}: EmployerApplicantCardPropsType) => {
  const navigate = useNavigate();
  const { updateCurrentApplicantId } = useCurrentApplicantIdStore();
  return (
    <article className="w-full border-[0.031rem] border-[#1E19263D] rounded-[1.125rem] overflow-hidden">
      <div
        className={`flex justify-between items-center px-[1rem] py-[0.5rem] ${statusStyler(applicantData.step)}`}
      >
        <div className="flex gap-[0.25rem]">
          <p className="pl-[0.5rem] caption text-[#1E1926]">
            {applicantData.step.replace(/_/g, ' ').toLowerCase()}
          </p>
          <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-[#FF6F61]"></div>
        </div>
        <RightArrowIcon
          onClick={() => navigate(`/employer/applicant/${applicantData.id}`)}
        />
      </div>
      <div className="flex justify-between w-full px-[1.5rem] pt-[1rem] pb-[0.75rem]">
        <div className="flex gap-[0.75rem]">
          {applicantData?.profile_img_url ? (
            <div
              className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-cover"
              style={{
                backgroundImage: `url(${applicantData.profile_img_url})`,
              }}
            ></div>
          ) : (
            <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-[#F4F4F9]"></div>
          )}
          <div>
            <h3 className="pb-[0.25rem] head-3 text-[#1E1926]">
              {applicantData.name.replace(/-/g, ' ')}
            </h3>
            <p className="body-3 text-[#464646]">
              {applicantData.nationality.replace(/_/g, ' ').toLowerCase()}
            </p>
          </div>
        </div>
        <Tag
          value={`${applicantData.duration_of_days} days After`}
          padding="py-[0.25rem] px-[0.438rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-surface-invert"
          color="text-primary-neutral"
          fontStyle="caption"
        />
      </div>
      <div className="flex flex-col gap-[0.125rem] w-full px-[1.5rem] pb-[0.75rem]">
        <div className="flex items-center gap-[0.5rem] px-[0.5rem]">
          <ClockIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">{applicantData.gender}</p>
        </div>
        <div className="flex items-center gap-[0.5rem] px-[0.5rem]">
          <MoneyIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">{applicantData.school_name}</p>
        </div>
        <div className="flex items-center gap-[0.5rem] px-[0.5rem]">
          <ClockIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            {applicantData.visa.replace(/_/g, '-')}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[0.625rem] px-[1rem] pb-[1rem]">
        <button
          className="w-full px-[1.5rem] py-[0.75rem] text-center rounded-full bg-[#1E1926] text-[#F4F4F9] caption"
          onClick={() => {
            updateCurrentApplicantId(applicantData.id);
            navigate(`/employer/applicant/${applicantData.id}`);
          }}
        >
          Check Application Status
        </button>
        <button
          className="w-full px-[1.5rem] py-[0.75rem] text-center rounded-full bg-[#FEF387] text-[#1E1926] caption"
          onClick={() => {
            updateCurrentApplicantId(applicantData.id);
            navigate(`/employer/applicant/${applicantData.id}/resume`);
          }}
        >
          See Resume
        </button>
      </div>
    </article>
  );
};

export default EmployerApplicantCard;
