import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import EmployerPostDetailButton from '@/components/Employer/PostDetail/EmployerPostDetailButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import { UserType } from '@/constants/user';
import { useGetPostDetail } from '@/hooks/api/usePost';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useCurrentPostIdStore } from '@/store/url';
import { useUserStore } from '@/store/user';
import GlobalIcon from '@/assets/icons/GlobalIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import { WorkPeriodInfo } from '@/constants/documents';
import { WorkPeriod } from '@/types/api/document';
import { workDaysPerWeekToText } from '@/utils/post';
import { formatMoney } from '@/utils/formatMoney';

const EmployerPostDetailPage = () => {
  const { account_type } = useUserStore();
  const { currentPostId } = useCurrentPostIdStore();
  const handleBackButtonClick = useNavigateBack();

  const { data, isLoading } = useGetPostDetail(
    Number(currentPostId),
    account_type === UserType.OWNER && !isNaN(Number(currentPostId))
      ? true
      : false,
  );

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPostItem />
      </div>
    );

  if (!data?.success) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="모집공고 상세"
      />
      <PostDetailCompanyImageList
        companyImageData={data.data?.company_img_url_list}
      />
      <article className="w-full px-4 py-5 bg-surface-base">
        <h3 className="pb-1 heading-18-semibold text-text-strong line-clamp-2">
          {data.data?.title}
        </h3>
        <p className="pb-4 caption-12-regular text-text-normal whitespace-normal">
          {data.data?.company_name}ㆍ{data.data?.summaries.address}
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <p className="caption-12-regular text-text-strong">
              {account_type === UserType.OWNER
                ? WorkPeriodInfo[data.data?.summaries.work_period as WorkPeriod]
                    .name
                : data.data?.summaries.work_period
                    ?.replace(/_/g, ' ')
                    .toLowerCase()}
              ,{' '}
              {workDaysPerWeekToText(
                data.data?.summaries.work_days_per_week as string,
                account_type,
              )}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <GlobalIcon />
            <p className="caption-12-regular text-text-strong">
              {data.data?.tags.visa.join(', ').replace(/_/g, '-')}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MoneyIcon />
            <p className="caption-12-regular text-text-strong">
              {account_type === UserType.OWNER
                ? `시급 ${formatMoney(data.data?.summaries.hourly_rate)}원`
                : `Hr ${formatMoney(data.data?.summaries.hourly_rate)}KRW`}
            </p>
          </div>
        </div>
      </article>
      <PostDetailContent postDetailData={data.data} />
      {data.data?.is_my_post && <EmployerPostDetailButton />}
    </>
  );
};

export default EmployerPostDetailPage;
