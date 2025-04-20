import { IconType } from '@/constants/profile';
import ProfileMenu from '@/components/Profile/ProfileMenu';
import { useNavigate } from 'react-router-dom';

type ProfileMenuListProps = {
  onLogoutClick: () => void;
};

const ProfileMenuList = ({ onLogoutClick }: ProfileMenuListProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Scrapped Job Posts',
      iconType: IconType.SCRAPPED,
      path: '/resume/scrapped',
    },
    { title: 'Account', iconType: IconType.PROFILE, path: '/profile/account' },
    { title: 'Notifications', iconType: IconType.NOTIFICATION, isToggle: true },
    {
      title: 'Language',
      iconType: IconType.LANGUAGE,
      path: '/profile/language',
    },
    { title: 'About', iconType: IconType.LOGOUT, path: '/profile/about' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col gap-4 pb-4 bg-white rounded-lg">
      <div className="flex flex-col divide-y divide-gray-200">
        {menuItems.map((item) => (
          <ProfileMenu
            key={item.title}
            title={item.title}
            iconType={item.iconType}
            isToggle={item.isToggle}
            onClick={item.path ? () => handleNavigate(item.path) : undefined}
          />
        ))}
      </div>
      <div className="px-4">
        <button
          className="grow w-full bg-surface-tertiary rounded-lg px-5 py-3 text-center button-2 text-text-strong"
          onClick={onLogoutClick}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenuList;
