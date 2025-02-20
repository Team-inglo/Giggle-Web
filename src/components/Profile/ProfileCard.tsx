import { UserInformation } from '@/types/api/profile';
import { useNavigate } from 'react-router-dom';
import ProfileEditIcon from '@/assets/icons/Profile/GreyPenIcon.svg?react';

type ProfileCardProps = {
  data: UserInformation;
};

const ProfileCard = ({ data }: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col relative p-4 mt-4 rounded-[0.5rem] gap-4 bg-[#fff]">
      <div
        className="absolute top-5 right-[18px] w-8 h-8 bg-[#f4f4f9] flex items-center justify-center rounded-lg"
        onClick={() => navigate('/profile/edit')}
      >
        <ProfileEditIcon />
      </div>
      <div className="flex items-center gap-4">
        {/* 프로필 사진 */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={data.profile_img_url}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* 이름 */}
        <div className="grow flex flex-col gap-1">
          <div className="head-2 text-[#1E1926]">
            {data.first_name} {data.last_name}
          </div>
          {/* 생년월일 */}
          <div className="body-3 text-[#656565]">
            {data.birth ? data.birth.replace(/-/g, '.') : 'not entered'}
          </div>

          {/* 교육 정보 */}
          {data.school_name === ' - ' ? (
            <span className="body-3 text-[#656565]">
              Please register your
              <br />
              educational background
            </span>
          ) : (
            <>
              <div>
                <span className="body-2 text-[#1E1926]">
                  {data.school_name}
                </span>
                <span className="body-2 text-[#1E1926]">
                  Grade {data.grade}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="body-3 text-[#464646]">
                  Grade Point Average
                </span>
                <span className="body-3 text-[#464646]">{data.gpa}</span>
              </div>
            </>
          )}
        </div>
      </div>
      {data.school_name === ' - ' && (
        <button
          className="grow w-full bg-[#FEF387] rounded-lg px-5 py-3 text-center button-2 text-[#1E1926]"
          onClick={() => navigate('/profile/manage-resume')}
        >
          Manage your Resume
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
