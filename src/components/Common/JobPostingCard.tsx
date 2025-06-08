import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { createContext, MouseEvent, ReactNode, useContext } from 'react';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { usePutPostBookmark } from '@/hooks/api/usePost';
import Tag from '@/components/Common/Tag';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { formatMoney } from '@/utils/formatMoney';
import { EN_FILTER_CATEGORY_OPTIONS } from '@/constants/postSearch';
import { WorkPeriodInfo } from '@/constants/documents';
import { WorkPeriod } from '@/types/api/document';
import { calculateDays } from '@/utils/calculateDDay';
import { workDaysPerWeekToText } from '@/utils/post';

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

const CardDeadLineTag = () => {
  const { recruitment_dead_line } = useCard();
  const { account_type } = useUserStore();

  const formatRecruitmentDeadLine = () => {
    if (recruitment_dead_line === '상시모집')
      return postTranslation.dDay[isEmployerByAccountType(account_type)];

    const leftDays = calculateDays(recruitment_dead_line);

    if (leftDays < 0)
      return postTranslation.closed[isEmployerByAccountType(account_type)];
    else
      return `${leftDays}${postTranslation.daysLeft[isEmployerByAccountType(account_type)]}`;
  };

  return (
    <Tag
      value={formatRecruitmentDeadLine()}
      padding="px-1 py-[0.188rem]"
      isRounded={false}
      hasCheckIcon={false}
      backgroundColor="bg-[#FF5252]/10"
      color="text-text-error"
      fontStyle="caption-12-regular"
    />
  );
};

const CardHeader = ({ isBookMarkButton }: { isBookMarkButton?: boolean }) => {
  const { id, title, is_book_marked } = useCard();
  const { account_type } = useUserStore();
  const { mutate } = usePutPostBookmark();

  const onClickBookmark = (e: MouseEvent) => {
    e.stopPropagation();
    if (account_type === UserType.USER) {
      mutate(id);
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <h3 className="heading-18-semibold text-text-strong line-clamp-2">
        {title}
      </h3>
      <div className="w-6 h-6">
        {account_type === UserType.USER && isBookMarkButton && (
          <button onClick={(e) => onClickBookmark(e)}>
            {is_book_marked ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

const CardCompanyInfo = () => {
  const { company_name, summaries } = useCard();

  return (
    <p className="caption-12-regular text-text-alternative whitespace-normal">
      {company_name}
      <span className="mx-2 inline-block px-[0.063rem] h-3 bg-border-alternative align-middle"></span>
      {summaries?.address?.split(' ')?.slice(0, 2)?.join(' ') ?? ''}
    </p>
  );
};

const CardHourlyRate = () => {
  const { hourly_rate } = useCard();
  const { account_type } = useUserStore();

  return (
    <p className="button-14-semibold text-text-normal">
      {account_type === UserType.OWNER
        ? `시간당 ${formatMoney(hourly_rate)}원`
        : `Hr ${formatMoney(hourly_rate)}KRW`}
    </p>
  );
};

const CardVisa = () => {
  const { tags } = useCard();

  return (
    <span className="caption-12-regular text-text-alternative whitespace-normal">
      {tags.visa.sort().join(', ').replace(/_/g, '-')}
    </span>
  );
};

const CardWorkDayInfo = () => {
  const { summaries } = useCard();
  const { account_type } = useUserStore();

  const formattedWorkPeriod =
    account_type === UserType.OWNER
      ? WorkPeriodInfo[summaries.work_period as WorkPeriod].name
      : summaries.work_period?.replace(/_/g, ' ').toLowerCase();

  return (
    <span className="caption-12-regular text-text-alternative whitespace-normal">
      {workDaysPerWeekToText(
        summaries.work_days_per_week as string,
        account_type,
      )}{' '}
      ({formattedWorkPeriod})
    </span>
  );
};

const CardTagList = () => {
  const { tags } = useCard();
  const { account_type } = useUserStore();

  return (
    <div className="flex items-center flex-wrap gap-1">
      <Tag
        value={
          account_type === UserType.OWNER
            ? EN_FILTER_CATEGORY_OPTIONS[tags.employment_type?.toLowerCase()]
            : tags.employment_type?.toLowerCase()
        }
        padding="py-[0.188rem] px-[0.375rem]"
        isRounded={true}
        hasCheckIcon={false}
        backgroundColor="bg-surface-secondary"
        color="text-text-normal"
        fontStyle="caption-12-regular"
      />
      <Tag
        value={
          account_type === UserType.OWNER
            ? EN_FILTER_CATEGORY_OPTIONS[
                tags.job_category.replace(/_/g, ' ').toLowerCase()
              ]
            : tags.job_category.replace(/_/g, ' ').toLowerCase()
        }
        padding="py-[0.188rem] px-[0.375rem]"
        isRounded={true}
        hasCheckIcon={false}
        backgroundColor="bg-surface-secondary"
        color="text-text-normal"
        fontStyle="caption-12-regular"
      />
    </div>
  );
};

export const JobPostingCard = Object.assign(JobPostingCardProvider, {
  Box: CardBox,
  Header: CardHeader,
  CompanyInfo: CardCompanyInfo,
  Visa: CardVisa,
  TagList: CardTagList,
  DeadLineTag: CardDeadLineTag,
  WorkDayInfo: CardWorkDayInfo,
  HourlyRate: CardHourlyRate,
});
