import { useEffect, useState } from 'react';
import { IconType } from '@/constants/profile';
import ProfileIcon from '@/assets/icons/Profile/ProfileIcon.svg?react';
import ManageIcon from '@/assets/icons/Profile/ManageIcon.svg?react';
import ScrappedIcon from '@/assets/icons/Scrap.svg?react';
import NotificationIcon from '@/assets/icons/Profile/NotificationIcon.svg?react';
import LanguageIcon from '@/assets/icons/Profile/LanguageIcon.svg?react';
import LogoutIcon from '@/assets/icons/Profile/LogoutIcon.svg?react';
import ToggleBar from '@/assets/icons/Profile/ToggleBar.svg?react';
import ToggleButton from '@/assets/icons/Profile/ToggleButton.svg?react';
import { usePatchNotificationAllowed } from '@/hooks/api/useSetting';
import { useGetUserSummaries } from '@/hooks/api/useProfile';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type ProfileMenuProps = {
  title: string;
  iconType: IconType;
  onClick?: () => void;
  isToggle?: boolean;
};

const ProfileMenu = ({
  title,
  iconType,
  onClick,
  isToggle,
}: ProfileMenuProps) => {
  const { account_type } = useUserStore();
  const { mutate: patchNotificationAllowed } = usePatchNotificationAllowed();
  const { data: notificaionAllowed } = useGetUserSummaries(
    account_type === UserType.USER,
  );

  const [toggleOn, setToggleOn] = useState<boolean>(false);

  useEffect(() => {
    // 알림 설정 상태 불러오기
    if (isToggle && notificaionAllowed) {
      setToggleOn(
        notificaionAllowed.data.user_information.is_notification_allowed,
      );
    }
  }, [isToggle, notificaionAllowed]);

  const handleToggleChange = () => {
    // 알림 설정 변경
    patchNotificationAllowed(!toggleOn, {
      onSuccess: () => {
        setToggleOn(!toggleOn);
      },
    });
  };

  const iconMapping = (iconType: IconType) => {
    switch (iconType) {
      case IconType.PROFILE:
        return <ProfileIcon />;
      case IconType.MANAGE:
        return <ManageIcon />;
      case IconType.SCRAPPED:
        return <ScrappedIcon width={18} height={18} />;
      case IconType.NOTIFICATION:
        return <NotificationIcon />;
      case IconType.LANGUAGE:
        return <LanguageIcon />;
      case IconType.LOGOUT:
        return <LogoutIcon />;
      default:
        return null;
    }
  };

  const Icon = iconMapping(iconType);

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer py-4 bg-white  bg-cover bg-no-repeat bg-center"
    >
      <div className="flex justify-center items-center gap-4">
        {Icon}
        <div className="head-3 text-[#1E1926]">{title}</div>
      </div>
      {isToggle && (
        <div className="relative flex items-center">
          <ToggleBar fill="#00D1A033" />
          <ToggleButton
            fill={toggleOn ? '#00D1A0' : '#DCDCDC'}
            className={`absolute transform transition-transform duration-300 ease-in-out ${
              toggleOn ? 'translate-x-4' : 'translate-x-0'
            }`}
            onClick={handleToggleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
