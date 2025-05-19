import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import PostDetailApplyButton from '@/components/PostDetail/PostDetailApplyButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import { UserType } from '@/constants/user';
import { useGetPostDetail, useGetPostDetailGuest } from '@/hooks/api/usePost';
import { useUserStore } from '@/store/user';
import { workDaysPerWeekToText } from '@/utils/post';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GlobalIcon from '@/assets/icons/GlobalIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import { formatMoney } from '@/utils/formatMoney';
import { WorkPeriodInfo } from '@/constants/documents';
import { WorkPeriod } from '@/types/api/document';

const PostDetailPage = () => {
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: guestData, isLoading: guestLoading } = useGetPostDetailGuest(
    Number(id),
    !account_type && !isNaN(Number(id)) ? true : false,
  );

  const { data: userData, isLoading: userLoading } = useGetPostDetail(
    Number(id),
    account_type && !isNaN(Number(id)) ? true : false,
  );

  const postDetailData = account_type ? userData : guestData;
  const isLoading = account_type ? userLoading : guestLoading;

  useEffect(() => {
    if (navigate && postDetailData?.data?.is_my_post)
      navigate(`/employer/post/${postDetailData?.data?.id}`);
  }, [postDetailData, navigate]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPostItem />
      </div>
    );

  if (!postDetailData?.data) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailCompanyImageList
        companyImageData={postDetailData.data?.company_img_url_list}
      />
      <article className="w-full px-4 py-5 bg-surface-base">
        <h3 className="pb-1 head-3 text-text-strong line-clamp-2">
          {postDetailData.data?.title}
        </h3>
        <p className="pb-4 body-3 text-text-normal whitespace-normal">
          {postDetailData.data?.company_name}ㆍ
          {postDetailData.data?.summaries.address}
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <p className="body-3 text-text-strong">
              {account_type === UserType.OWNER
                ? WorkPeriodInfo[
                    postDetailData.data?.summaries.work_period as WorkPeriod
                  ].name
                : postDetailData.data?.summaries.work_period
                    ?.replace(/_/g, ' ')
                    .toLowerCase()}
              ,{' '}
              {workDaysPerWeekToText(
                postDetailData.data?.summaries.work_days_per_week as string,
                account_type,
              )}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <GlobalIcon />
            <p className="body-3 text-text-strong">
              {postDetailData.data?.tags.visa.join(', ').replace(/_/g, '-')}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MoneyIcon />
            <p className="body-3 text-text-strong">
              {account_type === UserType.OWNER
                ? `시급 ${formatMoney(postDetailData.data?.summaries.hourly_rate)}원`
                : `Hr ${formatMoney(postDetailData.data?.summaries.hourly_rate)}KRW`}
            </p>
          </div>
        </div>
      </article>
      <PostDetailContent postDetailData={postDetailData.data} />
      {account_type !== UserType.OWNER && (
        <PostDetailApplyButton
          isBookmarked={postDetailData.data?.is_book_marked ?? false}
          isRecruiting={postDetailData.data?.tags?.is_recruiting}
        />
      )}
    </>
  );
};

export default PostDetailPage;
