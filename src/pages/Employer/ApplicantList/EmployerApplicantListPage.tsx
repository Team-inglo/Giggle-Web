import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerApplicantListTitle from '@/components/Employer/ApplicantList/EmployerApplicantListTitle';
import EmployerApplicantList from '@/components/Employer/ApplicantList/EmployerApplicantList';
import { useNavigate } from 'react-router-dom';
import { useGetPostSummary } from '@/hooks/api/usePost';
import { useCurrentPostIdStore } from '@/store/url';

const EmployerApplicantListPage = () => {
  const navigate = useNavigate();
  const { currentPostId } = useCurrentPostIdStore();

  const { data } = useGetPostSummary(
    Number(currentPostId),
    !isNaN(Number(currentPostId)) ? true : false,
  );

  if (!data?.success) return <></>;

  return (
    <>
      <div className="w-full bg-[#FEF387] rounded-b-[1.5rem]">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={() => navigate('/employer/post')}
          hasMenuButton={false}
          title="지원자 조회"
        />
        <EmployerApplicantListTitle postData={data?.data} />
      </div>
      <EmployerApplicantList title={data?.data?.title} />
    </>
  );
};

export default EmployerApplicantListPage;
