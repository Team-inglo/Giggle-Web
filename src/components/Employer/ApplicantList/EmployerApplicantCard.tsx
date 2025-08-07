import { APPLICATION_STEP } from '@/constants/application';
import {
  ApplicantItemType,
  ApplicationStepType,
} from '@/types/application/applicationItem';
import SchoolIcon from '@/assets/icons/SchoolIcon.svg?react';
import VisaIcon from '@/assets/icons/VisaIcon.svg?react';
import GenderIcon from '@/assets/icons/GenderIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { useNavigate } from 'react-router-dom';
import { useCurrentApplicantIdStore } from '@/store/url';

const renderStatusBar = (status: ApplicationStepType) => {
  switch (status) {
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return (
        <Tag
          value="채용을 완료했어요 🎉"
          padding="px-[0.313rem] py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-status-success/10"
          color="text-text-success"
          fontStyle="caption-11-semibold"
        />
      );
    case APPLICATION_STEP.RESUME_REJECTED:
      return (
        <Tag
          value="거절한 지원자에요 ⚠"
          padding="px-[0.313rem] py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-status-error/10"
          color="text-text-error"
          fontStyle="caption-11-semibold"
        />
      );
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return (
        <Tag
          value="서류 재검토가 필요해요 ⚠"
          padding="px-[0.313rem] py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-status-error/10"
          color="text-text-error"
          fontStyle="caption-11-semibold"
        />
      );
    default:
      return (
        <Tag
          value="진행 상황을 확인해보세요 ! 📋"
          padding="px-[0.313rem] py-[0.188rem]"
          isRounded={false}
          hasCheckIcon={false}
          backgroundColor="bg-primary-normal"
          color="text-text-normal"
          fontStyle="caption-11-semibold"
        />
      );
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
    <article className="w-full p-4 rounded-lg bg-surface-base">
      <div className="pb-2">{renderStatusBar(applicantData?.step)}</div>
      <div className="w-full flex justify-between items-center pb-2">
        <div className="flex items-center">
          <h3 className="heading-18-semibold text-text-strong">
            {applicantData?.name.replace(/-/g, ' ')}
          </h3>
          <p className="pl-2 button-14-semibold text-text-alternative">
            {applicantData.nationality.replace(/_/g, ' ').toLowerCase()}
          </p>
        </div>
        <p className="caption-12-regular text-text-alternative">
          {applicantData?.duration_of_days}일 전
        </p>
      </div>
      <div className="pb-[0.125rem] flex items-center gap-2">
        <GenderIcon />
        <p className="caption-12-regular text-text-normal">
          {applicantData?.gender}
        </p>
      </div>
      <div className="pb-[0.125rem] flex items-center gap-2">
        <SchoolIcon />
        <p className="caption-12-regular text-text-normal">
          {applicantData?.school_name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <VisaIcon />
        <p className="caption-12-regular text-text-normal">
          {applicantData?.visa.replace(/_/g, '-')}
        </p>
      </div>
      <div className="w-full flex gap-2 pt-5">
        <button
          onClick={() => {
            updateCurrentApplicantId(applicantData.id);
            navigate(`/employer/applicant/${applicantData.resume_id}/resume`);
          }}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-surface-secondary button-14-semibold"
        >
          이력서 보기
        </button>
        <button
          onClick={() => {
            updateCurrentApplicantId(applicantData.id);
            navigate(`/employer/applicant/${applicantData.id}`);
          }}
          className="flex-1 py-3 px-5 rounded-lg text-text-normal bg-primary-normal button-14-semibold"
        >
          진행상황 보기
        </button>
      </div>
    </article>
  );
};

export default EmployerApplicantCard;
