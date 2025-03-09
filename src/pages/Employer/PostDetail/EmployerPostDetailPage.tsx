import BaseHeader from '@/components/Common/Header/BaseHeader';
import { JobPostingCard } from '@/components/Common/JobPostingCard';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import EmployerPostDetailButton from '@/components/Employer/PostDetail/EmployerPostDetailButton';
import PostDetailCompanyImageList from '@/components/PostDetail/PostDetailCompanyImageList';
import PostDetailContent from '@/components/PostDetail/PostDetailContent';
import { UserType } from '@/constants/user';
import { useGetPostDetail } from '@/hooks/api/usePost';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useCurrentPostIdStore } from '@/store/url';
import { useUserStore } from '@/store/user';
import { transformDetailToJobPostingItemType } from '@/utils/post';

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
      <JobPostingCard
        key={data.data.id}
        {...transformDetailToJobPostingItemType(data.data)}
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
      <PostDetailContent postDetailData={data.data} />
      {data.data?.is_my_post && <EmployerPostDetailButton />}
    </>
  );
};

export default EmployerPostDetailPage;
