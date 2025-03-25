import { LoadingItem } from '@/components/Common/LoadingItem';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import Tag from '@/components/Common/Tag';
import EmployerApplicationCard from '@/components/Employer/ApplicantList/EmployerApplicantCard';
import {
  EN_APPLICATION_STATUS_TYPE,
  KO_APPLICATION_STATUS_TYPE,
} from '@/constants/application';
import {
  KO_ASCENDING_SORT_TYPE,
  MATCH_KO_EN_ASCENDING_SORT,
} from '@/constants/sort';
import { useGetApplicantList } from '@/hooks/api/usePost';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useCurrentPostIdStore } from '@/store/url';
import { ApplicantItemType } from '@/types/application/applicationItem';
import { KoApplicationStatusType } from '@/types/application/applicationStatus';
import { KoAscendingSortType } from '@/types/common/sort';
import { useEffect, useState } from 'react';

const EmployerApplicantList = () => {
  const { currentPostId } = useCurrentPostIdStore();

  const [selectedSort, setSelectedSort] = useState<KoAscendingSortType>(
    KO_ASCENDING_SORT_TYPE.DESCENDING,
  );

  const [selectedStatus, setSelectedStatus] =
    useState<KoApplicationStatusType | null>(null);

  const [applicantData, setApplicantData] = useState<ApplicantItemType[]>([]);

  const selectStatus = (status: KoApplicationStatusType) => {
    if (status === selectedStatus) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetApplicantList(
      Number(currentPostId),
      MATCH_KO_EN_ASCENDING_SORT[selectedSort],
      selectedStatus
        ? EN_APPLICATION_STATUS_TYPE[selectedStatus]
            .replace(/\s/g, '_')
            .toUpperCase()
        : null,
      !isNaN(Number(currentPostId)) ? true : false,
    );

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data.applicant_list);

      setApplicantData(result);
    }
  }, [data]);

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  return (
    <>
      <section className="w-full pt-2">
        <h2 className="p-4 head-2 text-text-strong">이 공고의 지원자들 👥</h2>
        <div className="w-full p-4 flex justify-between items-center">
          <h3 className="caption text-text-alternative">
            {applicantData.length} 명의 지원자
          </h3>
          <SearchSortDropdown
            options={Object.values(KO_ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => setSelectedSort(sort as KoAscendingSortType)}
          />
        </div>
        <nav className="w-full py-2">
          <div className="w-full px-4 flex items-center gap-2 overflow-x-scroll whitespace-nowrap no-scrollbar">
            {Object.values(KO_APPLICATION_STATUS_TYPE).map((value, index) => (
              <button
                onClick={() => selectStatus(value as KoApplicationStatusType)}
                key={`${index}_${value}`}
              >
                <Tag
                  value={value}
                  padding="py-[0.375rem] px-[0.625rem]"
                  isRounded={true}
                  hasCheckIcon={false}
                  borderColor={'border-border-alternative'}
                  color={
                    value === selectedStatus
                      ? 'text-text-normal'
                      : 'text-text-alternative'
                  }
                  backgroundColor={
                    value === selectedStatus
                      ? 'bg-surface-secondary'
                      : 'bg-surface-base'
                  }
                  fontStyle="body-2"
                />
              </button>
            ))}
          </div>
        </nav>
      </section>
      <div className="w-full flex flex-col gap-2 p-4 bg-surface-secondary">
        {applicantData?.length > 0 ? (
          applicantData.map((data: ApplicantItemType) => (
            <EmployerApplicationCard key={data.id} applicantData={data} />
          ))
        ) : (
          <p className="py-12 w-full text-center body-2">지원자가 없습니다.</p>
        )}
      </div>
      {isFetchingNextPage && <LoadingItem />}
      <div ref={targetRef} className="h-1"></div>
    </>
  );
};

export default EmployerApplicantList;
