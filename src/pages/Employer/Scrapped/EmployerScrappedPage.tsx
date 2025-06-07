import BaseHeader from '@/components/Common/Header/BaseHeader';
import EmployerEmployeeCardList from '@/components/Employer/EmployeeSearch/EmployerEmployeeCardList';
import { UserType } from '@/constants/user';
import { useInfiniteGetEmployeeResumeList } from '@/hooks/api/useResume';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';
import { EmployeeResumeListItemType } from '@/types/api/resumes';
import { useEffect, useState } from 'react';

const EmployerScrappedPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { account_type } = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resumeData, setResumeData] = useState<EmployeeResumeListItemType[]>(
    [],
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetEmployeeResumeList(
    { size: 5 },
    account_type === UserType.OWNER,
    true, // 북마크 여부
  );

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.resumes);
      setResumeData(result);
    }
  }, [data]);

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
          isLoading={isLoading}
          isInitialLoading={isInitialLoading}
        />
        <div ref={targetRef} className="h-1"></div>
      </div>
    </>
  );
};
export default EmployerScrappedPage;
