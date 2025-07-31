import { profileTranslation } from '@/constants/translation';
import { useLocation } from 'react-router-dom';
import { isEmployer } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

type LanguageCardProps = {
  title: string;
  level: number;
  maxLevel: number;
};

const LanguageCard = ({ title, level }: LanguageCardProps) => {
  const pathname = useLocation().pathname;
  const { account_type } = useUserStore();

  return (
    <>
      {/* 컴포넌트 시작 */}
      <div className="flex justify-between items-center w-full py-4">
        <section className="flex gap-2 items-center">
          <h5 className="pb-[0.125rem] button-14-semibold  text-text-strong">
            {title}
          </h5>
          <div className="px-1.5 py-0.5 rounded-sm text-status-blue-300 bg-status-blue-100 caption-11-semibold">
            {account_type === UserType.OWNER
              ? `${level} ${profileTranslation.level[isEmployer(pathname)]}`
              : `LEVEL ${level}`}
          </div>
        </section>
      </div>
    </>
  );
};

export default LanguageCard;
