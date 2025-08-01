import { useNavigate } from 'react-router-dom';
import {
  POST_SEARCH_MENU,
  POST_SEARCH_PAGE_MENU,
  POST_SORTING,
} from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useHomeJobPosting } from '@/hooks/useHomeJobPosting';
import { useInfiniteGetEmployeeResumeList } from '@/hooks/api/useResume';
import { useGetPostList } from '@/hooks/api/usePost';
import { useGetCareerList } from '@/hooks/api/useCareer';
import HomeJobPostingList from '@/components/Home/HomeJobPostingList';
import HomeCareerPostingList from '@/components/Home/HomeCareerPostingList';
import HomeEmployeeCardList from './HomeEmployeeCardList';

const HomePostSection = () => {
  const navigate = useNavigate();
  const { account_type } = useUserStore();
  const isLogin = !!account_type;
  const isOwner = account_type === UserType.OWNER;
  // 공통: 공고 트렌딩
  const { data: trendingJobData, isLoading: trendingJobLoading } =
    useHomeJobPosting(POST_SEARCH_MENU.TRENDING, isLogin);

  // 공통: 공고 북마크 (유저만)
  const bookmarkedJobRequest = { size: 5, type: POST_SEARCH_MENU.BOOKMARKED };
  const { data: bookmarkedJobData, isLoading: bookmarkedJobLoading } =
    useGetPostList(bookmarkedJobRequest, isLogin);

  // 고용주: 인재 트렌딩
  const { data: trendingResumeData, isLoading: trendingResumeLoading } =
    useInfiniteGetEmployeeResumeList(
      {
        size: 5,
        sorting: POST_SORTING.POPULAR,
      },
      isOwner,
    );

  // 유저: 커리어 트렌딩
  const trendingCareerRequest = {
    size: 5,
    sorting: POST_SORTING.POPULAR,
    page: 1,
    isBookMarked: false,
  };
  const { data: trendingCareerData, isLoading: trendingCareerLoading } =
    useGetCareerList(trendingCareerRequest, !isOwner && isLogin);

  // 유저: 커리어 북마크
  const bookmarkedCareerRequest = {
    size: 5,
    page: 1,
    isBookMarked: true,
  };
  const { data: bookmarkedCareerData, isLoading: bookmarkedCareerLoading } =
    useGetCareerList(bookmarkedCareerRequest, !isOwner && isLogin);

  // 공고 검색 이동
  const goToJobSearch = () => {
    navigate('/search', {
      state: {
        initialMenu: POST_SEARCH_PAGE_MENU.POST,
        postSortType: POST_SORTING.POPULAR,
      },
    });
  };

  // 커리어 검색 이동
  const goToCareerSearch = () => {
    navigate('/search', {
      state: {
        initialMenu: POST_SEARCH_PAGE_MENU.CAREER,
        careerSortType: POST_SORTING.POPULAR,
      },
    });
  };

  // 이력서 검색 이동 (고용주용)
  const goToResumeSearch = () => {
    navigate('/employer/search', {
      state: {
        initialMenu: POST_SEARCH_PAGE_MENU.CAREER,
        resumeSortType: POST_SORTING.POPULAR,
      },
    });
  };

  return (
    <section className="flex flex-col gap-8 py-4 pb-28">
      {isOwner ? (
        <>
          {/* 고용주: 인재 트렌딩 */}
          <HomeEmployeeCardList
            title="요즘 인기있는 인재 🔥"
            resumeData={
              trendingResumeData?.pages?.flatMap((page) => page.data.resumes) ??
              []
            }
            isLoading={trendingResumeLoading}
            isInitialLoading={trendingResumeLoading}
            onSeeMoreClick={goToResumeSearch}
          />

          {/* 고용주: 공고 트렌딩 */}
          <HomeJobPostingList
            title="요즘 인기있는 공고 🔥"
            data={trendingJobData?.data?.job_posting_list}
            isLoading={trendingJobLoading}
            onSeeMoreClick={goToJobSearch}
          />
        </>
      ) : (
        <>
          {/* 일반 유저: 공고 트렌딩 */}
          <HomeJobPostingList
            title="Trending Job Lists for You 🔥"
            data={trendingJobData?.data?.job_posting_list}
            isLoading={trendingJobLoading}
            onSeeMoreClick={goToJobSearch}
          />

          {/* 일반 유저: 커리어 트렌딩 */}
          <HomeCareerPostingList
            title="Trending Career Lists for You 🔥"
            data={trendingCareerData?.data?.career_list}
            isLoading={trendingCareerLoading}
            onSeeMoreClick={goToCareerSearch}
          />

          {/* 일반 유저: 공고 북마크 */}
          {isLogin && (
            <>
              <HomeJobPostingList
                title="Bookmarked Job 🌟"
                data={bookmarkedJobData?.data?.job_posting_list}
                isLoading={bookmarkedJobLoading}
                onSeeMoreClick={() =>
                  navigate('/resume/scrapped', {
                    state: { filter: 'Job Posting' },
                  })
                }
              />
              {/* 일반 유저: 커리어 북마크 */}
              <HomeCareerPostingList
                title="Bookmarked Career 🌟"
                data={bookmarkedCareerData?.data?.career_list}
                isLoading={bookmarkedCareerLoading}
                onSeeMoreClick={() =>
                  navigate('/resume/scrapped', { state: { filter: 'Career' } })
                }
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default HomePostSection;
