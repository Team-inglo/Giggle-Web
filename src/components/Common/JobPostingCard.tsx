import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import {
  createContext,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import { usePutPostBookmark } from '@/hooks/api/usePost';
import Tag from '@/components/Common/Tag';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { formatMoney } from '@/utils/formatMoney';
import { calculateTimeAgo } from '@/utils/calculateTimeAgo';
import { EN_FILTER_CATEGORY_OPTIONS } from '@/constants/postSearch';
import { WorkPeriodInfo } from '@/constants/documents';
import { WorkPeriod } from '@/types/api/document';
import { calculateDays } from '@/utils/calculateDDay';

const CardContext = createContext<JobPostingItemType | null>(null);

type CardProviderProps = JobPostingItemType & { children: ReactNode };

export const JobPostingCardProvider = ({
  children,
  ...props
}: CardProviderProps) => {
  return <CardContext.Provider value={props}>{children}</CardContext.Provider>;
};

const useCard = () => {
  const context = useContext(CardContext);
  if (!context)
    throw new Error('Card components must be used within a CardProvider');
  return context;
};

const CardBox = ({ children }: { children: ReactNode }) => {
  return <div className="p-4 bg-surface-base">{children}</div>;
};

const CardHeader = ({ isBookMarkButton }: { isBookMarkButton?: boolean }) => {
  const { id, company_name, is_book_marked } = useCard();
  const { account_type } = useUserStore();
  const { mutate } = usePutPostBookmark();

  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const onClickBookmark = (e: MouseEvent) => {
    e.stopPropagation();
    if (account_type === UserType.USER) {
      mutate(id);
      setIsBookmark(!isBookmark);
    }
  };

  useEffect(() => {
    setIsBookmark(is_book_marked ?? false);
  }, [setIsBookmark, is_book_marked]);

  return (
    <div className="w-full flex justify-between items-end">
      <h4 className="button-2 text-text-normal">{company_name}</h4>
      <div>
        {account_type === UserType.USER && isBookMarkButton && (
          <button onClick={(e) => onClickBookmark(e)}>
            {isBookmark ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

const CardTitle = ({ isTwoLine }: { isTwoLine: boolean }) => {
  const { title } = useCard();

  return (
    <h3
      className={`pt-1 head-3 text-text-normal ${isTwoLine ? 'line-clamp-2' : 'line-clamp-1'} `}
    >
      {title}
    </h3>
  );
};

const CardTagList = ({ className }: { className?: string }) => {
  const { tags } = useCard();
  const { account_type } = useUserStore();

  return (
    <div className={`flex items-center flex-wrap gap-1 ${className}`}>
      <Tag
        value={
          account_type === UserType.OWNER
            ? EN_FILTER_CATEGORY_OPTIONS[tags.employment_type?.toLowerCase()]
            : tags.employment_type?.toLowerCase()
        }
        padding="py-[0.188rem] px-[0.25rem]"
        isRounded={false}
        hasCheckIcon={false}
        backgroundColor="bg-surface-secondary"
        color="text-text-normal"
        fontStyle="caption"
      />
      <Tag
        value={
          account_type === UserType.OWNER
            ? EN_FILTER_CATEGORY_OPTIONS[
                tags.job_category.replace(/_/g, ' ').toLowerCase()
              ]
            : tags.job_category.replace(/_/g, ' ').toLowerCase()
        }
        padding="py-[0.188rem] px-[0.25rem]"
        isRounded={false}
        hasCheckIcon={false}
        backgroundColor="bg-[#0066FF1F]"
        color="text-text-success"
        fontStyle="caption"
      />
      <Tag
        value={tags.visa.sort().join(', ').replace(/_/g, '-')}
        padding="py-[0.188rem] px-[0.25rem]"
        isRounded={false}
        hasCheckIcon={false}
        backgroundColor="bg-primary-dark"
        color="text-primary-neutral"
        fontStyle="caption"
      />
    </div>
  );
};

const CardDeadLine = () => {
  const { recruitment_dead_line } = useCard();
  const { account_type } = useUserStore();

  if (recruitment_dead_line === '상시모집') {
    return (
      <p className="py-4 button-1 text-text-normal">
        {postTranslation.dDay[isEmployerByAccountType(account_type)]}
      </p>
    );
  }

  return (
    <div className="flex gap-1 py-4">
      <p className="button-1 text-text-normal">
        {calculateDays(recruitment_dead_line)}
      </p>
      <p className="button-2 text-text-normal">
        {postTranslation.deadline[isEmployerByAccountType(account_type)]}
      </p>
    </div>
  );
};

const CardAddress = () => {
  const { summaries } = useCard();

  return (
    <div className="flex items-center gap-2">
      <LocationIcon />
      <p className="caption text-text-normal">{summaries.address}</p>
    </div>
  );
};

const CardWorkPeriod = () => {
  const { summaries } = useCard();
  const { account_type } = useUserStore();

  return (
    <div className="flex items-center gap-2">
      <CalendarIcon />
      <p className="caption text-text-normal">
        {account_type === UserType.OWNER
          ? WorkPeriodInfo[summaries.work_period as WorkPeriod].name
          : summaries.work_period.replace(/_/g, ' ').toLowerCase()}
      </p>
    </div>
  );
};

const workDaysPerWeekToText = (
  workDaysPerWeek: string,
  accountType: UserType | undefined,
) => {
  if (workDaysPerWeek === '협의 가능') {
    return accountType !== UserType.OWNER ? 'Negotiable' : workDaysPerWeek;
  }

  if (accountType !== UserType.OWNER) {
    return workDaysPerWeek;
  }

  return `주 ${workDaysPerWeek[0]}일 근무`;
};

const CardWorkDaysPerWeek = () => {
  const { summaries } = useCard();
  const { account_type } = useUserStore();

  return (
    <div className="flex items-center gap-2">
      <ClockIcon />
      <p className="caption text-text-normal">
        {workDaysPerWeekToText(
          summaries.work_days_per_week as string,
          account_type,
        )}
      </p>
    </div>
  );
};

const hourlyRate = (hourlyRate: number, accountType: UserType | undefined) => {
  return accountType === UserType.OWNER
    ? `시간당 ${formatMoney(hourlyRate)}원`
    : `Hr ${formatMoney(hourlyRate)}KRW`;
};

const CardHourlyRate = () => {
  const { hourly_rate } = useCard();
  const { account_type } = useUserStore();

  return (
    <div className="flex items-center gap-2">
      <MoneyIcon />
      <p className="caption text-text-normal">
        {hourlyRate(hourly_rate, account_type)}
      </p>
    </div>
  );
};

const CardFooter = () => {
  const { account_type } = useUserStore();
  const { hourly_rate, created_at } = useCard();

  return (
    <div className="w-full flex justify-between items-center">
      <p className="body-2 text-text-normal">
        <span className="mr-[0.125rem] text-text-alternative body-3">
          {postTranslation.Hr[isEmployerByAccountType(account_type)]}
        </span>
        {formatMoney(hourly_rate)}
        {postTranslation.KRW[isEmployerByAccountType(account_type)]}
      </p>
      <p className="caption text-text-alternative">
        {calculateTimeAgo(created_at, account_type)}
      </p>
    </div>
  );
};

export const JobPostingCard = Object.assign(JobPostingCardProvider, {
  Box: CardBox,
  Header: CardHeader,
  Title: CardTitle,
  TagList: CardTagList,
  DeadLine: CardDeadLine,
  Address: CardAddress,
  WorkPeriod: CardWorkPeriod,
  WorkDaysPerWeek: CardWorkDaysPerWeek,
  HourlyRate: CardHourlyRate,
  Footer: CardFooter,
});
