import SchoolIcon from '@/assets/icons/SchoolIcon.svg?react';
import VisaIcon from '@/assets/icons/VisaIcon.svg?react';
import GenderIcon from '@/assets/icons/GenderIcon.svg?react';
import { ApplicantDetailItemType } from '@/types/application/applicationItem';

type EmployerApplicantDetailCardPropsType = {
  applicantData: ApplicantDetailItemType;
};

const EmployerApplicantDetailCard = ({
  applicantData,
}: EmployerApplicantDetailCardPropsType) => {
  return (
    <section className="w-full py-7 px-4">
      <div className="w-full flex justify-between items-center pb-2">
        <div className="flex items-center">
          <h3 className="head-3 text-text-strong">{applicantData?.name}</h3>
          <p className="pl-2 button-2 text-text-alternative">
            {applicantData.nationality.replace(/_/g, ' ').toLowerCase()}
          </p>
        </div>
        <p className=" caption text-text-alternative">
          {applicantData?.duration_of_days}일 전
        </p>
      </div>
      <div className="pb-[0.125rem] flex items-center gap-2">
        <GenderIcon />
        <p className="caption text-text-normal">{applicantData?.gender}</p>
      </div>
      <div className="pb-[0.125rem] flex items-center gap-2">
        <SchoolIcon />
        <p className="caption text-text-normal">{applicantData?.school_name}</p>
      </div>
      <div className="flex items-center gap-2">
        <VisaIcon />
        <p className="caption text-text-normal">
          {applicantData?.visa.replace(/_/g, '-')}
        </p>
      </div>
    </section>
  );
};

export default EmployerApplicantDetailCard;
