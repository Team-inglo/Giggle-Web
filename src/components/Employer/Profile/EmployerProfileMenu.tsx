import { useEffect, useState } from 'react';
import { IconType } from '@/constants/profile';
import ProfileIcon from '@/assets/icons/Profile/ProfileIcon.svg?react';
import NotificationIcon from '@/assets/icons/Profile/NotificationIcon.svg?react';
import LogoutIcon from '@/assets/icons/Profile/LogoutIcon.svg?react';
import ToggleBar from '@/assets/icons/Profile/ToggleBar.svg?react';
import ToggleButton from '@/assets/icons/Profile/ToggleButton.svg?react';
import { usePatchNotificationAllowed } from '@/hooks/api/useSetting';
import { usegetOwnerSummaries } from '@/hooks/api/useProfile';

type EmployerProfileMenuProps = {
  title: string;
  iconType: IconType;
  onClick?: () => void;
  isToggle?: boolean;
};

const EmployerProfileMenu = ({
  title,
  iconType,
  onClick,
  isToggle,
}: EmployerProfileMenuProps) => {
  const { mutate: patchNotificationAllowed } = usePatchNotificationAllowed();
  const { data: notificaionAllowed } = usegetOwnerSummaries();

  const [toggleOn, setToggleOn] = useState<boolean>(false);

  useEffect(() => {
    // 알림 설정 상태 불러오기
    if (isToggle && notificaionAllowed) {
      setToggleOn(notificaionAllowed.data.is_notification_allowed);
    }
  }, []);

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
      case IconType.NOTIFICATION:
        return <NotificationIcon />;
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
      className="flex items-center justify-between cursor-pointer p-6 rounded-[1.375rem] bg-EmployerProfileMenuGradient  bg-cover bg-no-repeat bg-center"
    >
      <div className="flex justify-center items-center gap-4">
        {Icon}
        <div className="body-2 text-[#1E1926]">{title}</div>
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

export default EmployerProfileMenu;