import { UserInformation } from '@/types/api/profile';
import { useNavigate } from 'react-router-dom';
import ProfileEditIcon from '@/assets/icons/Profile/GreyPenIcon.svg?react';

type ProfileCardProps = {
  data: UserInformation;
};

const ProfileCard = ({ data }: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col relative px-4 mt-4 rounded-[0.5rem] gap-4 bg-white">
      <div
        className="absolute top-5 right-[18px] w-8 h-8 bg-surface-secondary flex items-center justify-center rounded-lg"
        onClick={() => navigate('/profile/edit')}
      >
        <ProfileEditIcon />
      </div>
      <div className="flex items-center gap-4">
        {/* 프로필 사진 */}
        <div className="w-16 h-16 rounded-full border overflow-hidden">
          <img
            src={data.profile_img_url}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 이름 */}
        <div className="grow flex flex-col gap-1">
          <div className="heading-20-semibold text-text-strong">
            {data.first_name} {data.last_name}
          </div>
          {/* 생년월일 */}
          <div className="caption-12-regular-2 text-text-alternative">
            {data.birth ? data.birth.replace(/-/g, '.') : 'not entered'}
          </div>

          {/* 교육 정보 */}
          {data.school_name === ' - ' ? (
            <span className="caption-12-regular-2 text-text-alternative">
              Please register your
              <br />
              educational background
            </span>
          ) : (
            <>
              <div>
                <span className="body-14-regular text-text-strong">
                  {data.school_name}
                </span>
                <span className="body-14-regular text-text-strong">
                  Grade {data.grade}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="caption-12-regular text-text-alternative">
                  Grade Point Average
                </span>
                <span className="caption-12-regular text-text-alternative">
                  {data.gpa}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
