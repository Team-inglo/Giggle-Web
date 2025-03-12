import ApplicationCardList from '@/components/Application/ApplicationCardList';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingItem from '@/components/Common/LoadingItem';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import { APPLICATION_STATUS_TYPE } from '@/constants/application';
import { ASCENDING_SORT_TYPE } from '@/constants/sort';
import { useGetApplyPostList } from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AppicationItemType } from '@/types/application/applicationItem';
import { ApplicationStatusType } from '@/types/application/applicationStatus';
import { AscendingSortType } from '@/types/common/sort';
import { useEffect, useState } from 'react';

const ApplicationPage = () => {
  const [selectedSort, setSelectedSort] = useState<AscendingSortType>(
    ASCENDING_SORT_TYPE.ASCENDING,
  );
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatusType>(
    APPLICATION_STATUS_TYPE.TOTAL,
  );

  const [requestParams, setRequestParams] = useState({
    size: 10,
    sorting: selectedSort,
    status: selectedStatus,
  });

  const [applicantData, setApplicantData] = useState<AppicationItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetApplyPostList(requestParams);

  const selectSort = (sort: AscendingSortType) => {
    setSelectedSort(sort);
    setRequestParams({ ...requestParams, sorting: sort });
  };

  const selectStatus = (status: ApplicationStatusType) => {
    setSelectedStatus(status);
    setRequestParams({ ...requestParams, status: status });
  };

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.job_posting_list);
      setApplicantData(result);
    }
  }, [data]);

  return (
    <>
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={false}
        title="Applicants"
      />
      <div className="w-full p-[1.5rem]">
        <div className="flex gap-[0.25rem] pb-[2rem]">
          <SearchSortDropdown
            options={Object.values(ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => selectSort(sort as AscendingSortType)}
          />
          <SearchSortDropdown
            options={Object.values(APPLICATION_STATUS_TYPE)}
            value={selectedStatus}
            onSelect={(status) => selectStatus(status as ApplicationStatusType)}
          />
        </div>
        <ApplicationCardList applicationListData={applicantData} />
        {isLoading && <LoadingItem />}
        <div ref={targetRef} className="h-1"></div>
      </div>
    </>
  );
};

export default ApplicationPage;
