import ApplicationDetailSteps from '@/components/ApplicationDetail/ApplicationDetailSteps';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantDetailButton from '@/components/Employer/ApplicantDetail/EmployerApplicantDetailButton';
import EmployerApplicantDetailCard from '@/components/Employer/ApplicantDetail/EmployerApplicantDetailCard';
import { useGetEmployerApplicationDetail } from '@/hooks/api/useApplication';
import { useCurrentApplicantIdStore } from '@/store/url';
import { useNavigate } from 'react-router-dom';

const EmployerApplicantDetailPage = () => {
  const navigate = useNavigate();
  const { currentApplicantId } = useCurrentApplicantIdStore();

  const { data } = useGetEmployerApplicationDetail(
    Number(currentApplicantId),
    !isNaN(Number(currentApplicantId)),
  );

  if (!data?.success) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/employer/post')}
        hasMenuButton={false}
        title="서류 신청 관리"
      />
      <EmployerApplicantDetailCard applicantData={data?.data} />
      <div className="w-full h-4 bg-surface-secondary"></div>
      <ApplicationDetailSteps step={data?.data.step} />
      <EmployerApplicantDetailButton
        applicant_id={Number(currentApplicantId)}
        step={data?.data.step}
      />
    </>
  );
};

export default EmployerApplicantDetailPage;
