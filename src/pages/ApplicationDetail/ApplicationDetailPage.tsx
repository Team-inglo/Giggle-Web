import ApplicationDetailStep1 from '@/components/ApplicationDetail/ApplicationDetailStep1';
import ApplicationDetailStep2 from '@/components/ApplicationDetail/ApplicationDetailStep2';
import ApplicationDetailStep3 from '@/components/ApplicationDetail/ApplicationDetailStep3';
import ApplicationDetailStep4 from '@/components/ApplicationDetail/ApplicationDetailStep4';
import ApplicationDetailStep5 from '@/components/ApplicationDetail/ApplicationDetailStep5';
import ApplicationDetailStep6 from '@/components/ApplicationDetail/ApplicationDetailStep6';
import ApplicationDetailCard from '@/components/ApplicationDetail/ApplicationDetailCard';
import ApplicationDetailInfo from '@/components/ApplicationDetail/ApplicationDetailInfo';
import ApplicationDetailSteps from '@/components/ApplicationDetail/ApplicationDetailSteps';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { useNavigate } from 'react-router-dom';
import ApplicationDetailStep7 from '@/components/ApplicationDetail/ApplicationDetailStep7';
import { findCurrentStep } from '@/utils/application';
import ApplicationDetailStepEtc from '@/components/ApplicationDetail/ApplicationDetailStepEtc';
import { useGetApplicationDetail } from '@/hooks/api/useApplication';
import { useCurrentPostIdEmployeeStore } from '@/store/url';

const ApplicationDetailPage = () => {
  const navigate = useNavigate();
  const { currentPostId } = useCurrentPostIdEmployeeStore();
  const { data } = useGetApplicationDetail(
    Number(currentPostId),
    !isNaN(Number(currentPostId)) ? true : false,
  );
  console.log(`현재 ${currentPostId}`); // 지원자 조회 - 지원자 상세 - 서류 상세 간 뒤로가기 문제 관련

  if (!data?.success) return <></>;

  const showCurrentStepButton = (step: number) => {
    switch (step) {
      case 1:
        return <ApplicationDetailStep1 />;
      case 2:
        return <ApplicationDetailStep2 />;
      case 3:
        return <ApplicationDetailStep3 applicant_id={Number(currentPostId)} />;
      case 4:
        return <ApplicationDetailStep4 />;
      case 5:
        return <ApplicationDetailStep5 />;
      case 6:
        return <ApplicationDetailStep6 />;
      case 7:
        return <ApplicationDetailStep7 result={data?.data?.step} />;
      default:
        return <ApplicationDetailStepEtc result={data?.data?.step} />;
    }
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/application')}
        hasMenuButton={false}
        title="Applicants"
      />
      {data && (
        <>
          <div className="w-full flex flex-col gap-[2.25rem] p-[1.5rem]">
            <ApplicationDetailCard applicationData={data?.data} />
            <ApplicationDetailInfo applicationData={data?.data} />
            <ApplicationDetailSteps step={findCurrentStep(data?.data?.step)} />
          </div>
          {showCurrentStepButton(findCurrentStep(data?.data?.step))}
        </>
      )}
    </>
  );
};

export default ApplicationDetailPage;
