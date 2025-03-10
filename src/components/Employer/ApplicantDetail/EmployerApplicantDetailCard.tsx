import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { ApplicantDetailItemType } from '@/types/application/applicationItem';

type EmployerApplicantDetailCardPropsType = {
  applicantData: ApplicantDetailItemType;
};

const EmployerApplicantDetailCard = ({
  applicantData,
}: EmployerApplicantDetailCardPropsType) => {
  return (
    <article className="w-full pb-[0.5rem] border-[0.031rem] border-[#1E19263D] rounded-[1.125rem] ">
      <div className="flex justify-between w-full px-[1.5rem] pt-[1.5rem] pb-[0.75rem]">
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
          padding="0.25rem 0.438rem"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
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
    </article>
  );
};

export default EmployerApplicantDetailCard;
