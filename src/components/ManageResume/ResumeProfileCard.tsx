import { GenderType } from '@/constants/profile';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from '@/assets/images/GiggleLogo.png';

type ResumeProfileCardProps = {
  profileImgUrl: string;
  name: string;
  gender: GenderType;
  nationality: string;
  birth: string;
  main_address: string;
  phone: string;
  email: string;
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
}: ResumeProfileCardProps) => {
  const navigate = useNavigate();

  // 국적 포맷팅
  const formatNationality = (nationality: string) => {
    if (!nationality) return '';
    return nationality
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="w-full rounded-lg overflow-hidden bg-white p-4">
      <div className="flex items-center gap-4">
        {/* 프로필 사진 */}
        <div className="w-16 h-16 rounded-full border overflow-hidden">
          <img
            src={profileImgUrl}
            alt="profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = defaultProfileImg;
            }}
          />
        </div>

        {/* 사용자 정보 */}
        <div className="flex-1">
          {/* 이름 */}
          <div className="flex items-center gap-2">
            <h3 className="head-2 text-text-strong">{name}</h3>
            <span className="body-3 text-text-alternative">
              {formatNationality(nationality)}
            </span>
          </div>

          {/* 개인정보 첫 번째 줄 */}
          <div className="caption text-text-alternative mt-1">
            <span>{gender.toLowerCase()}</span>
            {birth && (
              <>
                <span className="mx-1">|</span>
                <span>{birth}</span>
              </>
            )}
            {main_address && (
              <>
                <span className="mx-1">|</span>
                <span>{main_address}</span>
              </>
            )}
          </div>

          {/* 개인정보 두 번째 줄 */}
          <div className="caption text-text-alternative mt-0.5">
            {phone && <span>{phone}</span>}
            {phone && email && <span className="mx-1">|</span>}
            {email && <span>{email}</span>}
          </div>
        </div>
      </div>

      {/* 프로필 편집 버튼 */}
      <button
        className="w-full mt-4 py-3 bg-surface-secondary rounded-md text-center button-2 text-text-strong"
        onClick={() => navigate('/profile/edit')}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ResumeProfileCard;
