import AlarmIcon from '@/assets/icons/Home/AlarmIcon.svg?react';
import HeaderLogoIcon from '@/assets/icons/Home/HeaderLogoIcon.svg?react';
import SearchIcon from '@/assets/icons/Home/SearchIcon.svg?react';
import { useGetAlarms } from '@/hooks/api/useAlarm';
import { useUserStore } from '@/store/user';
import { AlarmItemType } from '@/types/api/alarm';
import { useNavigate } from 'react-router-dom';
import LoginBottomSheet from '@/components/Home/LoginBottomSheet';
import { useState } from 'react';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  const { data } = useGetAlarms(1, 50, account_type ? true : false);

  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);

  const isNotReadAlarms = (alarms: AlarmItemType[]) => {
    if (!(account_type && data?.success)) return false;

    const isNotRead = alarms.some((alarm) => !alarm.is_read);
    return isNotRead;
  };

  const handleClickAlarm = () => {
    if (account_type) navigate('/alarm');
    else setIsOpenLoginBottomSheet(true);
  };

  return (
    <>
      <header className="w-full h-[3.5rem] px-[0.625rem] flex justify-between items-center border-b border-[#E2E5EB]">
        {/* 로고 영역 96x40 + 내부 여백 포함 */}
        <div className="w-[6rem] h-[2.5rem] flex items-center justify-center">
          <HeaderLogoIcon className="w-[5.375rem] h-[2rem]" />{' '}
          {/* 86x32 로고 */}
        </div>

        {/* 아이콘 영역 */}
        <div className="flex items-center gap-1">
          {/* 검색 아이콘 */}
          <button className="w-[2.25rem] h-[2.25rem] flex justify-center items-center rounded-full">
            <SearchIcon />
          </button>

          {/* 알림 아이콘 */}
          <button
            className="w-[2.25rem] h-[2.25rem] flex justify-center items-center relative rounded-full"
            onClick={handleClickAlarm}
          >
            <AlarmIcon />
            {/* 알람이 있을 때만 표시 */}
            {isNotReadAlarms(data?.data?.notification_list) && (
              <div className="absolute top-[0.2rem] right-[0.4rem] w-[0.438rem] h-[0.438rem] rounded-full bg-[#FF6F61]" />
            )}
          </button>
        </div>
      </header>

      <LoginBottomSheet
        isShowBottomsheet={isOpenLoginBottomSheet}
        setIsShowBottomSheet={setIsOpenLoginBottomSheet}
      />
    </>
  );
};

export default HomeHeader;
