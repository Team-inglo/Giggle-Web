import BaseHeader from '@/components/Common/Header/BaseHeader';
import { JobPostingCard } from '@/components/Common/JobPostingCard';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import PostDetailApplyButton from '@/components/PostDetail/PostDetailApplyButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import { UserType } from '@/constants/user';
import { useGetPostDetail, useGetPostDetailGuest } from '@/hooks/api/usePost';
import { useUserStore } from '@/store/user';
import { transformDetailToJobPostingItemType } from '@/utils/post';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
      <JobPostingCard
        key={postDetailData.data.id}
        {...transformDetailToJobPostingItemType(postDetailData.data)}
      >
        <JobPostingCard.Box>
          <JobPostingCard.Header />
          <JobPostingCard.Title isTwoLine={true} />
          <JobPostingCard.TagList className="pt-2" />
          <JobPostingCard.DeadLine />
          <div className="w-full flex flex-col gap-[0.125rem]">
            <JobPostingCard.Address />
            <JobPostingCard.WorkPeriod />
            <JobPostingCard.WorkDaysPerWeek />
            <JobPostingCard.HourlyRate />
          </div>
        </JobPostingCard.Box>
      </JobPostingCard>
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
