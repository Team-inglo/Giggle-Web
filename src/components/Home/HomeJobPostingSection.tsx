import { useNavigate } from 'react-router-dom';
import { POST_SEARCH_MENU, POST_SORTING } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useHomeJobPosting } from '@/hooks/useHomeJobPosting';
import HomeJobPostingList from '@/components/Home/HomeJobPostingList';

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
  const { data: userBookmarkedData, isLoading: userBookmarkedLoading } =
    useHomeJobPosting(POST_SEARCH_MENU.BOOKMARKED, !!account_type);

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
        data={trendData}
        isLoading={trendLoading}
        onSeeMoreClick={() => goToSearchPage(POST_SORTING.POPULAR)}
      />
      <HomeJobPostingList
        title={
          account_type === UserType.OWNER
            ? '🌟 최근 올라온 공고'
            : '🌟 Recently Added Job'
        }
        data={recentlyData}
        isLoading={recentlyLoading}
        onSeeMoreClick={() => goToSearchPage(POST_SORTING.RECENT)}
      />
      {account_type === UserType.USER && (
        <HomeJobPostingList
          title="🌟 My Bookmarks"
          data={userBookmarkedData}
          isLoading={userBookmarkedLoading}
          onSeeMoreClick={() => navigate('/resume/scrapped')}
        />
      )}
    </section>
  );
};

export default HomeJobPostingSection;
