import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useNavigate } from 'react-router-dom';
import { POST_SEARCH_MENU, POST_SORTING } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import HomePostCard from '@/components/Home/HomePostCard';

const HomeJobPostingList = () => {
  const navigate = useNavigate();

  const { account_type } = useUserStore();

  const isLogin = !!account_type;

  // 인기 공고
  const trendingDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.TRENDING,
  };
  const { data: guestTrendData } = useGetPostGuestList(
    trendingDataRequest,
    !isLogin,
  );

  const { data: userTrendData } = useGetPostList(trendingDataRequest, isLogin);

  const trendData = account_type ? userTrendData : guestTrendData;

  // 최신 공고
  const recentlyDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.RECENTLY,
  };
  const { data: guestRecentlyData } = useGetPostGuestList(
    recentlyDataRequest,
    !isLogin,
  );
  const { data: userRecentlyData } = useGetPostList(
    recentlyDataRequest,
    isLogin,
  );

  const recentlyData = account_type ? userRecentlyData : guestRecentlyData;

  // 관심 공고
  const bookmarkedDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.BOOKMARKED,
  };
  const { data: userBookmarkedData } = useGetPostList(
    bookmarkedDataRequest,
    isLogin,
  );

  const goToSearchPage = (type: PostSortingType) => {
    navigate(`/search`, { state: { sortType: type } });
  };

  return (
    <section className="flex flex-col gap-8 p-4 pb-28">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center py-1">
          <h3 className="head-3 text-black">
            {account_type === UserType.OWNER
              ? '🔥 가장 인기있는 공고'
              : '🔥 Trending Job Lists for You'}
          </h3>
          <button
            className="caption text-[#9397A1]"
            onClick={() => goToSearchPage(POST_SORTING.POPULAR)}
          >
            {account_type === UserType.OWNER ? '더보기' : 'See more'}
          </button>
        </div>
        <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
          {trendData?.data?.job_posting_list?.map(
            (value: JobPostingItemType) => (
              <HomePostCard key={value.id} jobPostingData={value} />
            ),
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center py-1">
          <h3 className="head-3 text-black">
            {account_type === UserType.OWNER
              ? '🌟 최근 올라온 공고'
              : '🌟 Recently Added Job'}
          </h3>
          <button
            className="caption text-[#9397A1]"
            onClick={() => goToSearchPage(POST_SORTING.RECENT)}
          >
            {account_type === UserType.OWNER ? '더보기' : 'See more'}
          </button>
        </div>
        <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
          {recentlyData?.data?.job_posting_list?.map(
            (value: JobPostingItemType) => (
              <HomePostCard key={value.id} jobPostingData={value} />
            ),
          )}
        </div>
      </div>
      {account_type === UserType.USER && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center py-1">
            <h3 className="head-3 text-black">🌟 My Bookmarks</h3>
            <button
              className="caption text-[#9397A1]"
              onClick={() => navigate('/resume/scrapped')}
            >
              See more
            </button>
          </div>
          <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
            {userBookmarkedData?.data?.job_posting_list?.map(
              (value: JobPostingItemType) => (
                <HomePostCard key={value.id} jobPostingData={value} />
              ),
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeJobPostingList;
