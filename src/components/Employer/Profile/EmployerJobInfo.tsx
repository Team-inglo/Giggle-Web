import { useGetOwnerApplicationCounts } from '@/hooks/api/useProfile';
import { EmployerCountsInfoResponse } from '@/types/api/profile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerJobInfo = () => {
  const { data } = useGetOwnerApplicationCounts();
  const [jobData, setJobData] = useState<EmployerCountsInfoResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setJobData(data.data);
    }
  }, [data]);

  const handleEditCompanyInfo = () => {
    navigate('/employer/profile/edit');
  };

  const infoItems = jobData
    ? [
        { label: '올린 공고', value: jobData.job_postings_counts },
        { label: '지원자 총합', value: jobData.applicants_counts },
        { label: '계약 성공', value: jobData.successful_hire_counts },
      ]
    : [];

  if (!jobData) return null;

  return (
    <>
      <div className="flex divide-x divide-gray-200 items-stretch justify-center p-3 bg-white">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 w-full justify-center bg-white"
          >
            <span className="heading-18-semibold text-text-strong text-center">
              {item.value}
            </span>
            <span className="caption-12-regular text-text-assistive text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4">
        <button
          className="grow w-full bg-primary-normal rounded-lg px-5 py-3 text-center button-14-semibold text-text-strong"
          onClick={handleEditCompanyInfo}
        >
          회사 정보 수정
        </button>
      </div>
    </>
  );
};

export default EmployerJobInfo;
