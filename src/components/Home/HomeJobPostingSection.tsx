import { useNavigate } from 'react-router-dom';
import { POST_SEARCH_MENU, POST_SORTING } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useHomeJobPosting } from '@/hooks/useHomeJobPosting';
import HomeJobPostingList from '@/components/Home/HomeJobPostingList';
import { useGetPostList } from '@/hooks/api/usePost';

const HomeJobPostingSection = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  const { data: trendData, isLoading: trendLoading } = useHomeJobPosting(
    POST_SEARCH_MENU.TRENDING,
    !!account_type,
  );
  const { data: recentlyData, isLoading: recentlyLoading } = useHomeJobPosting(
    POST_SEARCH_MENU.RECENTLY,
    !!account_type,
  );

  const bookmarkedDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.BOOKMARKED,
  };
  const { data: userBookmarkedData, isLoading: userBookmarkedLoading } =
    useGetPostList(bookmarkedDataRequest, !!account_type);

  const goToSearchPage = (type: PostSortingType) => {
    navigate(`/search`, { state: { sortType: type } });
  };

  return (
    <section className="flex flex-col gap-8 p-4 pb-28">
      <HomeJobPostingList
        title={
          account_type === UserType.OWNER
            ? '🔥 가장 인기있는 공고'
            : '🔥 Trending Job Lists for You'
        }
        data={trendData?.data?.job_posting_list}
        isLoading={trendLoading}
        onSeeMoreClick={() => goToSearchPage(POST_SORTING.POPULAR)}
      />
      <HomeJobPostingList
        title={
          account_type === UserType.OWNER
            ? '🌟 최근 올라온 공고'
            : '🌟 Recently Added Job'
        }
        data={recentlyData?.data?.job_posting_list}
        isLoading={recentlyLoading}
        onSeeMoreClick={() => goToSearchPage(POST_SORTING.RECENT)}
      />
      {account_type === UserType.USER && (
        <HomeJobPostingList
          title="🌟 My Bookmarks"
          data={userBookmarkedData?.data?.job_posting_list}
          isLoading={userBookmarkedLoading}
          onSeeMoreClick={() => navigate('/resume/scrapped')}
        />
      )}
    </section>
  );
};

export default HomeJobPostingSection;
