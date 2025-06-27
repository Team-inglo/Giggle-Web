import { GenderType } from '@/constants/profile';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '@/components/Common/ProfileImage';
import { useState } from 'react';
import { usePatchResumePublic } from '@/hooks/api/useResume';
import ToggleButton from '@/components/Common/ToggleButton';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';

type UserInfoProps = {
  name: string;
  nationality: string;
  gender: GenderType;
  birth: string;
  address: string;
  phone: string;
  email: string;
};

const UserInfo = ({
  name,
  nationality,
  gender,
  birth,
  address,
  phone,
  email,
}: UserInfoProps) => {
  const formatNationality = (nationality: string) => {
    if (!nationality) return '';
    return nationality
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="flex-1">
      {/* 이름 */}
      <div className="flex items-center gap-2">
        <h3 className="heading-20-semibold text-text-strong">{name}</h3>
        <span className="caption-12-regular text-text-alternative">
          {formatNationality(nationality)}
        </span>
      </div>

      {/* 개인정보 첫 번째 줄 */}
      <div className="caption-12-regular text-text-alternative mt-1">
        <span>{gender.toLowerCase()}</span>
        {birth && (
          <>
            <span className="mx-1">|</span>
            <span>{birth}</span>
          </>
        )}
        {address && (
          <>
            <span className="mx-1">|</span>
            <span>{address}</span>
          </>
        )}
      </div>

      {/* 개인정보 두 번째 줄 */}
      <div className="caption-12-regular text-text-alternative mt-0.5">
        {phone && <span>{phone}</span>}
        {phone && email && <span className="mx-1">|</span>}
        {email && <span>{email}</span>}
      </div>
    </div>
  );
};

type ResumeProfileCardProps = {
  profileImgUrl: string;
  name: string;
  gender: GenderType;
  nationality: string;
  birth: string;
  main_address: string;
  phone: string;
  email: string;
  isPublic: boolean;
};

const ResumeProfileCard = ({
  profileImgUrl,
  name,
  gender,
  nationality,
  birth,
  main_address,
  phone,
  email,
  isPublic = true,
}: ResumeProfileCardProps) => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  const [toggleOn, setToggleOn] = useState<boolean>(isPublic);
  const { mutate: patchResumePublic } = usePatchResumePublic();

  const handleToggleChange = () => {
    setToggleOn(!toggleOn);
    patchResumePublic({ is_public: !toggleOn });
  };

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white p-4">
      <div className="flex items-center gap-4">
        <ProfileImage src={profileImgUrl} alt="profile" />
        <UserInfo
          name={name}
          nationality={nationality}
          gender={gender}
          birth={birth}
          address={main_address}
          phone={phone}
          email={email}
        />
      </div>

      {account_type === UserType.USER && (
        <>
          <div className="flex justify-between items-center px-1 py-2 mt-4">
            <span className="button-14-semibold text-text-strong">
              Make Resume Public
            </span>
            <ToggleButton isOn={toggleOn} onChange={handleToggleChange} />
          </div>
          <button
            className="w-full mt-4 py-3 bg-surface-secondary rounded-md text-center button-14-semibold text-text-strong"
            onClick={() => navigate('/profile/edit')}
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default ResumeProfileCard;
