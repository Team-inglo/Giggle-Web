import { CareerListItemType } from '@/types/api/career';
import HomeCareerPostCard from '@/components/Home/HomeCareerPostCard';
import HomeEmptyJobList from '@/components/Home/HomeEmptyJobList';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';

const RenderCareerList = ({
  data,
  isLoading,
}: {
  data: CareerListItemType[];
  isLoading: boolean;
}) => {
  if (isLoading) return <LoadingPostItem />;
  if (!data?.length) return <HomeEmptyJobList />;
  return (
    <>
      {data.map((career) => (
        <HomeCareerPostCard key={career.id} careerData={career} />
      ))}
    </>
  );
};

const HomeCareerPostingList = ({
  title,
  isLoading,
  data,
  onSeeMoreClick,
}: {
  title: string;
  isLoading: boolean;
  data: CareerListItemType[];
  onSeeMoreClick: () => void;
}) => {
  const { account_type } = useUserStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between py-1 px-4">
        <h3 className="text-text-strong heading-18-semibold">{title}</h3>
        <button
          className="caption-12-regular text-text-alternative"
          onClick={onSeeMoreClick}
        >
          {postTranslation.seeMore[isEmployerByAccountType(account_type)]}
        </button>
      </div>
      <div className="flex gap-2 px-4 overflow-x-scroll whitespace-nowrap no-scrollbar">
        <RenderCareerList data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default HomeCareerPostingList;
