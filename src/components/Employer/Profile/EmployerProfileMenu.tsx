import { useEffect, useState } from 'react';
import { usePatchNotificationAllowed } from '@/hooks/api/useSetting';
import { usegetOwnerSummaries } from '@/hooks/api/useProfile';
import ArrowIcon from '@/assets/icons/Chevron.svg?react';

type EmployerProfileMenuProps = {
  title: string;
  onClick?: () => void;
  isToggle?: boolean;
};

const EmployerProfileMenu = ({
  title,
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

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer px-4 py-[1.125rem] bg-cover bg-no-repeat bg-center"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="head-3 text-[#1E1926]">{title}</div>
      </div>
      {isToggle ? (
        <div className="relative flex items-center">
          <div
            className={`w-[2.125rem] h-5 rounded-full ${toggleOn ? 'bg-primary-normal' : 'bg-surface-disabled'}`}
          />
          <div
            className={`w-[0.875rem] h-[0.875rem] rounded-full absolute bg-white transform transition-transform duration-300 ease-in-out ${
              toggleOn ? 'translate-x-4' : 'translate-x-[0.25rem]'
            }`}
            onClick={handleToggleChange}
          />
        </div>
      ) : (
        <div className="flex items-center">
          <ArrowIcon />
        </div>
      )}
    </div>
  );
};

export default EmployerProfileMenu;
