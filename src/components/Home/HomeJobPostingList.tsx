import JobPostingCard from '@/components/Common/JobPostingCard';
import { JobPostingItemType } from '@/types/common/jobPostingItem';
import RightArrowIcon from '@/assets/icons/Home/RightArrowIcon.svg?react';
import Tag from '@/components/Common/Tag';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST_SEARCH_MENU, POST_SORTING } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useGetPostGuestList, useGetPostList } from '@/hooks/api/usePost';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';

const HomeJobPostingList = () => {
  const { account_type } = useUserStore();

  const isGuest = !account_type;

  // 인기 공고
  const trendingDataRequest = {
    size: 2,
    type: POST_SEARCH_MENU.TRENDING,
  };
  const { data: guestTrendData } = useGetPostGuestList(
    trendingDataRequest,
    isGuest,
  );

  const { data: userTrendData } = useGetPostList(trendingDataRequest, !isGuest);

  const trendData = account_type ? userTrendData : guestTrendData;

  // 최신 공고
  const recentlyDataRequest = {
    size: 2,
    type: POST_SEARCH_MENU.RECENTLY,
  };
  const { data: guestRecentlyData } = useGetPostGuestList(
    recentlyDataRequest,
    isGuest,
  );
  const { data: userRecentlyData } = useGetPostList(
    recentlyDataRequest,
    !isGuest,
  );

  const recentlyData = account_type ? userRecentlyData : guestRecentlyData;

  // 관심 공고
  const bookmarkedDataRequest = {
    size: 2,
    type: POST_SEARCH_MENU.BOOKMARKED,
  };
  const { data: userBookmarkedData } = useGetPostList(
    bookmarkedDataRequest,
    !isGuest,
  );

  const navigate = useNavigate();
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedMenu, setSelectedMenu] = useState<POST_SEARCH_MENU>(
    POST_SEARCH_MENU.TRENDING,
  );

  const scrollToSelectedMenu = (menu: POST_SEARCH_MENU) => {
    const scrollIndex: { [key: string]: number } = {
      TRENDING: 0,
      RECENTLY: 1,
      BOOKMARKED: 2,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  const goToSearchPage = (type: PostSortingType) => {
    navigate(`/search`, { state: { sortType: type } });
  };

  return (
    <section className="w-full bg-[#FEF387]">
      <nav className="flex justify-evenly w-full py-4 px-2 rounded-t-2xl bg-white sticky top-0">
        <button onClick={() => scrollToSelectedMenu(POST_SEARCH_MENU.TRENDING)}>
          <Tag
            value={
              account_type === UserType.OWNER ? '🔥 인기 공고' : '🔥 Popular'
            }
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={
              selectedMenu === POST_SEARCH_MENU.TRENDING ? '#FEF387' : 'white'
            }
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
        <button onClick={() => scrollToSelectedMenu(POST_SEARCH_MENU.RECENTLY)}>
          <Tag
            value={
              account_type === UserType.OWNER ? '🔥 최신 공고' : '🌟 Recent'
            }
            padding="0.5rem 1rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={
              selectedMenu === POST_SEARCH_MENU.RECENTLY ? '#FEF387' : 'white'
            }
            color="#1E1926A6"
            fontStyle="button-2"
          />
        </button>
        {/* 로그인 시에만 존재하는 메뉴 */}
        {account_type === UserType.USER && (
          <button
            onClick={() => scrollToSelectedMenu(POST_SEARCH_MENU.BOOKMARKED)}
          >
            <Tag
              value={'🌟 Bookmarks'}
              padding="0.5rem 1rem"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor={
                selectedMenu === POST_SEARCH_MENU.BOOKMARKED
                  ? '#FEF387'
                  : 'white'
              }
              color="#1E1926A6"
              fontStyle="button-2"
            />
          </button>
        )}
      </nav>
      <div className="flex flex-col gap-[3.125rem] pt-[0.75rem] pb-[6.25rem] px-[1.5rem] bg-white">
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[0] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">
              {account_type === UserType.OWNER
                ? '🔥 가장 인기있는 공고'
                : '🔥 Popular Job Lists for You'}
            </h3>
            <button
              className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]"
              onClick={() => goToSearchPage(POST_SORTING.POPULAR)}
            >
              {account_type === UserType.OWNER ? '더보기' : 'See more'}{' '}
              <RightArrowIcon />
            </button>
          </div>
          {trendData?.data?.job_posting_list?.map(
            (value: JobPostingItemType) => (
              <JobPostingCard key={value.id} jobPostingData={value} />
            ),
          )}
        </div>
        <div
          className="flex flex-col gap-[1rem]"
          ref={(e) => (scrollRef.current[1] = e)}
        >
          <div className="flex justify-between items-end">
            <h3 className="head-3 text-black">
              {account_type === UserType.OWNER
                ? '🌟 최근 올라온 공고'
                : '🌟 Recently Added Job'}
            </h3>
            <button
              className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]"
              onClick={() => goToSearchPage(POST_SORTING.RECENT)}
            >
              {account_type === UserType.OWNER ? '더보기' : 'See more'}{' '}
              <RightArrowIcon />
            </button>
          </div>
          {recentlyData?.data?.job_posting_list?.map(
            (value: JobPostingItemType) => (
              <JobPostingCard key={value.id} jobPostingData={value} />
            ),
          )}
        </div>
        {account_type === UserType.USER && (
          <div
            className="flex flex-col gap-[1rem]"
            ref={(e) => (scrollRef.current[2] = e)}
          >
            <div className="flex justify-between items-end">
              <h3 className="head-3 text-black">🌟 My Bookmarks</h3>
              <button
                className="flex items-center gap-[0.625rem] button-2 text-[#1E1926]"
                onClick={() => navigate('/resume/scrapped')}
              >
                See more <RightArrowIcon />
              </button>
            </div>
            {userBookmarkedData?.data?.job_posting_list?.map(
              (value: JobPostingItemType) => (
                <JobPostingCard key={value.id} jobPostingData={value} />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeJobPostingList;
