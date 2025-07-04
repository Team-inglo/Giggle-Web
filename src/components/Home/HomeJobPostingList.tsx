import { JobPostingItemType } from '@/types/common/jobPostingItem';
import HomePostCard from '@/components/Home/HomePostCard';
import HomeEmptyJobList from '@/components/Home/HomeEmptyJobList';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';

const RenderJobPostingList = ({
  data,
  isLoading,
}: {
  data: JobPostingItemType[];
  isLoading: boolean;
}) => {
  if (isLoading) return <LoadingPostItem />;

  if (!data?.length) return <HomeEmptyJobList />;

  return (
    <>
      {data.map((job) => (
        <HomePostCard key={job.id} jobPostingData={job} />
      ))}
    </>
  );
};

const HomeJobPostingList = ({
  title,
  isLoading,
  data,
  onSeeMoreClick,
}: {
  title: string;
  isLoading: boolean;
  data: JobPostingItemType[];
  onSeeMoreClick: () => void;
}) => {
  const { account_type } = useUserStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center py-1">
        <h3 className="heading-18-semibold text-black">{title}</h3>
        <button
          className="caption-12-regular text-[#9397A1]"
          onClick={onSeeMoreClick}
        >
          {postTranslation.seeMore[isEmployerByAccountType(account_type)]}
        </button>
      </div>
      <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
        <RenderJobPostingList data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomeJobPostingList;
