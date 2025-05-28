import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { postTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';

const HomeEmptyJobList = () => {
  const { account_type } = useUserStore();

  return (
    <div className="w-full h-36 p-4 flex flex-col justify-center items-center gap-1 rounded-lg bg-[#F4F4F9]">
      <EmptyJobIcon />
      <p className="caption-12-regular text-[#9397A1]">
        {postTranslation.emptyJobList[isEmployerByAccountType(account_type)]}
      </p>
    </div>
  );
};

export default HomeEmptyJobList;
