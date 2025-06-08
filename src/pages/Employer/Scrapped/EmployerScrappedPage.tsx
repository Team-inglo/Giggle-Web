import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerEmployeeCardList from '@/components/Employer/EmployeeSearch/EmployerEmployeeCardList';
import { UserType } from '@/constants/user';
import { useInfiniteGetEmployeeResumeList } from '@/hooks/api/useResume';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';

const EmployerScrappedPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { account_type } = useUserStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetEmployeeResumeList(
    { size: 5, is_book_marked: true },
    account_type === UserType.OWNER,
  );

  const resumeData = data?.pages?.flatMap((page) => page.data.resumes) || [];

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  return (
    <>
      <BaseHeader
        hasBackButton
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="스크랩"
      />
      <div className="pt-4 pb-6">
        <EmployerEmployeeCardList
          resumeData={resumeData}
          isLoading={isFetchingNextPage}
          isInitialLoading={isInitialLoading}
        />
        <div ref={targetRef} className="h-1"></div>
      </div>
    </>
  );
};
export default EmployerScrappedPage;
