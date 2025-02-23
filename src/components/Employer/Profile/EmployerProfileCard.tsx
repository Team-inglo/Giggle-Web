import { usegetOwnerSummaries } from '@/hooks/api/useProfile';
import { EmployerProfileResponse } from '@/types/api/profile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerProfileCard = () => {
  const { data } = usegetOwnerSummaries();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<EmployerProfileResponse>();
  useEffect(() => {
    if (data) {
      setProfileData(data.data);
    }
  }, [data]);
  return (
    <>
      {profileData && (
        <div className="flex flex-col p-4 mt-4 rounded-[0.5rem] gap-4 bg-[#fff]">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={profileData.icon_img_url} alt="profile image" />
            </div>
            <h1 className="head-2 text-[#1E1926]">
              {profileData.company_name}
            </h1>
          </div>
          <button
            className="grow w-full bg-[#FEF387] rounded-lg px-5 py-3 text-center button-2 text-[#1E1926]"
            onClick={() => navigate('/employer/profile/edit')}
          >
            회사 정보 수정
          </button>
        </div>
      )}
    </>
  );
};

export default EmployerProfileCard;
