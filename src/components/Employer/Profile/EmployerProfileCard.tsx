import { usegetOwnerSummaries } from '@/hooks/api/useProfile';
import { EmployerProfileResponse } from '@/types/api/profile';
import { useEffect, useState } from 'react';

const EmployerProfileCard = () => {
  const { data } = usegetOwnerSummaries();

  const [profileData, setProfileData] = useState<EmployerProfileResponse>();
  useEffect(() => {
    if (data) {
      setProfileData(data.data);
    }
  }, [data]);
  return (
    <>
      {profileData && (
        <div className="flex flex-col px-4 mt-4 rounded-[0.5rem] gap-4 bg-white">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full border overflow-hidden">
              <img
                src={profileData.icon_img_url}
                alt="profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="head-2 text-text-strong">
              {profileData.company_name}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerProfileCard;
