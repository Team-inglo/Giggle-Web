import { useGetOwnerApplicationCounts } from '@/hooks/api/useProfile';
import { EmployerCountsInfoResponse } from '@/types/api/profile';
import { useEffect, useState } from 'react';

const EmployerJobInfo = () => {
  const { data } = useGetOwnerApplicationCounts();
  const [jobData, setJobData] = useState<EmployerCountsInfoResponse>();

  useEffect(() => {
    if (data) {
      setJobData(data.data);
    }
  }, [data]);

  return (
    <>
      {jobData && (
        <div className="flex gap-2 items-stretch justify-center p-4 bg-white rounded-lg">
          <div className="flex flex-col justify-between w-full p-3 bg-[#F4F4F9] rounded-lg">
            <div className="body-3 text-[#abb0b9] text-center">올린 공고</div>
            <div className="head-3 text-[#1E1926] text-center">
              {jobData.job_postings_counts}
            </div>
          </div>
          <div className="flex flex-col justify-between w-full p-3 bg-[#F4F4F9] rounded-lg">
            <div className="body-3 text-[#abb0b9] text-center">지원자 총합</div>
            <div className="head-3 text-[#1E1926] text-center">
              {jobData.applicants_counts}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-3 w-full p-3 bg-[#F4F4F9] rounded-lg">
            <div className="body-3 text-[#abb0b9] text-center">계약 성공</div>
            <div className="head-3 text-[#1E1926] text-center">
              {jobData.successful_hire_counts}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerJobInfo;
