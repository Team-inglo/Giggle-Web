import RecommendPostIcon from '@/assets/icons/Home/MatchesIcon.svg?react';
import SavedPostIcon from '@/assets/icons/Home/SavedIcon.svg?react';
import ResumeIcon from '@/assets/icons/Home/ResumeIcon.svg?react';
import ApplyIcon from '@/assets/icons/Home/AppliedIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import CommingSoonBottomSheet from '@/components/Home/ComingSoonBottomSheet';
import { useMemo, useState } from 'react';
import LoginBottomSheet from '@/components/Home/LoginBottomSheet';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

const HomeMenu = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  const [isOpenCommingSoonBottomSheet, setIsOpenCommingSoonBottomSheet] =
    useState<boolean>(false);
  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);

  const menuItems = useMemo(() => {
    if (account_type === UserType.OWNER)
      return [
        {
          icon: <RecommendPostIcon />,
          text: '인재추천',
          onClick: () => navigate('/employer/search'),
        },
        {
          icon: <SavedPostIcon />,
          text: '공고추가',
          onClick: () => navigate('/employer/post/create'),
        },
        {
          icon: <ResumeIcon />,
          text: '공고관리',
          onClick: () => navigate('/employer/post'),
        },
      ];
    else if (account_type === UserType.USER)
      return [
        {
          icon: <RecommendPostIcon />,
          text: 'Matches',
          onClick: () => setIsOpenCommingSoonBottomSheet(true),
        },
        {
          icon: <SavedPostIcon />,
          text: 'Saved',
          onClick: () => navigate('/resume/scrapped'),
        },
        {
          icon: <ResumeIcon />,
          text: 'Resume',
          onClick: () => navigate('/profile/manage-resume'),
        },
        {
          icon: <ApplyIcon />,
          text: 'Applied',
          onClick: () => navigate('/application'),
        },
      ];
    else return [];
  }, [navigate, account_type]);

  const checkLogin = (fn: () => void) => {
    if (!account_type) setIsOpenLoginBottomSheet(true);
    else fn();
  };

  return (
    <>
      {menuItems.length > 0 && (
        <nav className="py-4 w-full flex items-center justify-center gap-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-16 h-16 flex-1 flex flex-col items-center justify-center gap-1 p-1 rounded-lg"
              onClick={() => checkLogin(item.onClick)}
            >
              {item.icon}
              <p className="h-[1.0625rem] caption-12-semibold text-text-normal break-keep">
                {item.text}
              </p>
            </button>
          ))}
        </nav>
      )}
      {isOpenCommingSoonBottomSheet && (
        <CommingSoonBottomSheet
          isShowBottomsheet={isOpenCommingSoonBottomSheet}
          setIsShowBottomSheet={setIsOpenCommingSoonBottomSheet}
        />
      )}
      {isOpenLoginBottomSheet && (
        <LoginBottomSheet
          isShowBottomsheet={isOpenLoginBottomSheet}
          setIsShowBottomSheet={setIsOpenLoginBottomSheet}
        />
      )}
    </>
  );
};

export default HomeMenu;
