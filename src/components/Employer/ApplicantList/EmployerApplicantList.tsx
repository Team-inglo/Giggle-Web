import LoadingItem from '@/components/Common/LoadingItem';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
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
type EmployerApplicationListPropsType = {
  title: string;
};

const EmployerApplicationList = ({
  title,
}: EmployerApplicationListPropsType) => {
  const { currentPostId } = useCurrentPostIdStore();

  const [selectedSort, setSelectedSort] = useState<KoAscendingSortType>(
    KO_ASCENDING_SORT_TYPE.ASCENDING,
  );
  const [selectedStatus, setSelectedStatus] = useState<KoApplicationStatusType>(
    KO_APPLICATION_STATUS_TYPE.TOTAL,
  );

  const [applicantData, setApplicantData] = useState<ApplicantItemType[]>([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetApplicantList(
      Number(currentPostId),
      MATCH_KO_EN_ASCENDING_SORT[selectedSort],
      EN_APPLICATION_STATUS_TYPE[selectedStatus]
        .replace(/\s/g, '_')
        .toUpperCase(),
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
    <section className="flex flex-col gap-[1rem] w-full p-[1.5rem] pb-[6.25rem] overflow-y-auto h-full">
      <div className="flex justify-between items-center">
        <h3 className="px-[0.5rem] head-3 text-[#1E1926]">
          <span className="pr-[0.25rem] text-[#7872ED]">{title}</span>의 지원자
        </h3>
        <div className="flex gap-[0.25rem] whitespace-nowrap">
          <SearchSortDropdown
            options={Object.values(KO_ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => setSelectedSort(sort as KoAscendingSortType)}
          />
          <SearchSortDropdown
            options={Object.values(KO_APPLICATION_STATUS_TYPE)}
            value={selectedStatus}
            onSelect={(sort) =>
              setSelectedStatus(sort as KoApplicationStatusType)
            }
          />
        </div>
      </div>
      {applicantData?.length > 0 ? (
        applicantData.map((data: ApplicantItemType) => (
          <EmployerApplicationCard key={data.id} applicantData={data} />
        ))
      ) : (
        <div className="mt-8 w-full text-center body-2">지원자가 없습니다.</div>
      )}
      {isFetchingNextPage && <LoadingItem />}
      <div ref={targetRef} className="h-1"></div>
    </section>
  );
};

export default EmployerApplicationList;
