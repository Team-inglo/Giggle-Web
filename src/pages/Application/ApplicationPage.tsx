import ApplicationCardList from '@/components/Application/ApplicationCardList';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingItem from '@/components/Common/LoadingItem';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import Tag from '@/components/Common/Tag';
import { APPLICATION_STATUS_TYPE } from '@/constants/application';
import {
  ASCENDING_SORT_TYPE,
  MATCH_ASCENDING_SORT_TYPE,
} from '@/constants/sort';
import { useGetApplyPostList } from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AppicationItemType } from '@/types/application/applicationItem';
import { ApplicationStatusType } from '@/types/application/applicationStatus';
import { AscendingSortType } from '@/types/common/sort';
import { useEffect, useState } from 'react';

const ApplicationPage = () => {
  const [selectedSort, setSelectedSort] = useState<AscendingSortType>(
    ASCENDING_SORT_TYPE.DESCENDING,
  );
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatusType | null>(null);

  const [requestParams, setRequestParams] = useState({
    size: 10,
    sorting: MATCH_ASCENDING_SORT_TYPE[selectedSort],
    status: selectedStatus,
  });

  const [applicantData, setApplicantData] = useState<AppicationItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useGetApplyPostList(requestParams);

  const selectSort = (sort: AscendingSortType) => {
    setSelectedSort(sort);
    setRequestParams({
      ...requestParams,
      sorting: MATCH_ASCENDING_SORT_TYPE[sort],
    });
  };

  const selectStatus = (status: ApplicationStatusType) => {
    if (status === selectedStatus) {
      setSelectedStatus(null);
      setRequestParams({ ...requestParams, status: null });
    } else {
      setSelectedStatus(status);
      setRequestParams({ ...requestParams, status: status });
    }
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
    <div className="w-full min-h-screen flex flex-col">
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={false}
        title="Applied Job"
      />
      <section className="w-full bg-surface-base">
        <div className="px-4 py-[3.125rem]">
          <h1 className="pb-2 head-1 text-text-strong">
            Track Your Progress 👀
          </h1>
          <p className="body-2 text-text-alternative">
            Stay updated on your job applications
            <br />
            and document status.
          </p>
        </div>
        <div className="w-full p-4 flex justify-between items-center">
          <h3 className="caption text-text-alternative">
            {applicantData.length} Applicants
          </h3>
          <SearchSortDropdown
            options={Object.values(ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => selectSort(sort as AscendingSortType)}
          />
        </div>
        <nav className="w-full py-2">
          <div className="w-full px-4 flex items-center gap-2 overflow-x-scroll whitespace-nowrap no-scrollbar">
            {Object.entries(APPLICATION_STATUS_TYPE).map(
              ([key, value], index) => (
                <button
                  onClick={() => selectStatus(key as ApplicationStatusType)}
                  key={`${index}_${value}`}
                >
                  <Tag
                    value={value}
                    padding="py-[0.375rem] px-[0.625rem]"
                    isRounded={true}
                    hasCheckIcon={false}
                    borderColor={'border-border-alternative'}
                    color={
                      key === selectedStatus
                        ? 'text-text-normal'
                        : 'text-text-alternative'
                    }
                    backgroundColor={
                      key === selectedStatus
                        ? 'bg-surface-secondary'
                        : 'bg-surface-base'
                    }
                    fontStyle="body-2"
                  />
                </button>
              ),
            )}
          </div>
        </nav>
      </section>
      <ApplicationCardList
        applicationListData={applicantData}
        isInitialLoading={isInitialLoading}
      />
      {isLoading && <LoadingItem />}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default ApplicationPage;
