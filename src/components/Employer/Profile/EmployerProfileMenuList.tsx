import { useNavigate } from 'react-router-dom';
import EmployerProfileMenu from '@/components/Employer/Profile/EmployerProfileMenu';

type EmployerProfileMenuListProps = {
  handleBottomSheetOpen: () => void;
};

const EmployerProfileMenuList = ({
  handleBottomSheetOpen,
}: EmployerProfileMenuListProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    { title: '계정', path: '/profile/account' },
    { title: '알림 수신', isToggle: true },
    { title: '정보', path: '/profile/about' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-4 bg-white rounded-lg">
      <div className="flex flex-col divide-y divide-gray-200">
        {menuItems.map((item) => (
          <EmployerProfileMenu
            key={item.title}
            title={item.title}
            isToggle={item.isToggle}
            onClick={item.path ? () => handleNavigate(item.path) : undefined}
          />
        ))}
      </div>
      <div className="px-4">
        <button
          className="grow w-full bg-surface-tertiary rounded-lg px-5 py-3 text-center button-2 text-text-strong"
          onClick={handleBottomSheetOpen}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default EmployerProfileMenuList;
