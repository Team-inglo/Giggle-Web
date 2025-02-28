import { JobPostingItemType } from '@/types/common/jobPostingItem';
import { useNavigate } from 'react-router-dom';
import { POST_SEARCH_MENU, POST_SORTING } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import HomePostCard from '@/components/Home/HomePostCard';
import HomeEmptyJobList from '@/components/Home/HomeEmptyJobList';
import LoadingPostItem from '@/components/Common/LoadingPostItem';

const HomeJobPostingList = () => {
  const navigate = useNavigate();

  const { account_type } = useUserStore();

  const isLogin = !!account_type;

  // 인기 공고
  const trendingDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.TRENDING,
  };
  const { data: guestTrendData, isLoading: guestTrendLoading } =
    useGetPostGuestList(trendingDataRequest, !isLogin);

  const { data: userTrendData, isLoading: userTrendLoading } = useGetPostList(
    trendingDataRequest,
    isLogin,
  );

  const trendData = account_type ? userTrendData : guestTrendData;
  const trendLoading = account_type ? userTrendLoading : guestTrendLoading;

  // 최신 공고
  const recentlyDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.RECENTLY,
  };
  const { data: guestRecentlyData, isLoading: guestRecentlyLoading } =
    useGetPostGuestList(recentlyDataRequest, !isLogin);
  const { data: userRecentlyData, isLoading: userRecentlyLoading } =
    useGetPostList(recentlyDataRequest, isLogin);

  const recentlyData = account_type ? userRecentlyData : guestRecentlyData;
  const recentlyLoading = account_type
    ? userRecentlyLoading
    : guestRecentlyLoading;

  // 관심 공고
  const bookmarkedDataRequest = {
    size: 5,
    type: POST_SEARCH_MENU.BOOKMARKED,
  };
  const { data: userBookmarkedData, isLoading: userBookmarkedLoading } =
    useGetPostList(bookmarkedDataRequest, isLogin);

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
        {trendLoading ? (
          <LoadingPostItem />
        ) : (
          <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
            {trendData?.data?.job_posting_list?.length > 0 ? (
              trendData.data.job_posting_list.map(
                (value: JobPostingItemType) => (
                  <HomePostCard key={value.id} jobPostingData={value} />
                ),
              )
            ) : (
              <HomeEmptyJobList />
            )}
          </div>
        )}
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
        {recentlyLoading ? (
          <LoadingPostItem />
        ) : (
          <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
            {recentlyData?.data?.job_posting_list?.length > 0 ? (
              recentlyData.data.job_posting_list.map(
                (value: JobPostingItemType) => (
                  <HomePostCard key={value.id} jobPostingData={value} />
                ),
              )
            ) : (
              <HomeEmptyJobList />
            )}
          </div>
        )}
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
          {userBookmarkedLoading ? (
            <LoadingPostItem />
          ) : (
            <div className="flex overflow-x-scroll whitespace-nowrap no-scrollbar">
              {userBookmarkedData?.data?.job_posting_list?.length > 0 ? (
                userBookmarkedData.data.job_posting_list.map(
                  (value: JobPostingItemType) => (
                    <HomePostCard key={value.id} jobPostingData={value} />
                  ),
                )
              ) : (
                <HomeEmptyJobList />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HomeJobPostingList;
