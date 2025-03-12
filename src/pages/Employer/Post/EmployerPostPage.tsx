import BaseHeader from '@/components/Common/Header/BaseHeader';
import SearchSortDropdown from '@/components/Common/SearchSortDropdown';
import EmployerPostCardList from '@/components/Employer/Post/EmployerPostCardList';
import { KO_ASCENDING_SORT_TYPE } from '@/constants/sort';
import { KoAscendingSortType } from '@/types/common/sort';
import { useState } from 'react';

const EmployerPostPage = () => {
  const [selectedSort, setSelectedSort] = useState<KoAscendingSortType>(
    KO_ASCENDING_SORT_TYPE.ASCENDING,
  );

  return (
    <>
      <BaseHeader
        hasBackButton={false}
        hasMenuButton={false}
        title="작성한 공고"
      />
      <section className="w-full p-[1.5rem] pb-[6.25rem] flex flex-col gap-[1rem]">
        <h2 className="px-[0.5rem] pt-[1.5rem] head-3 text-[#1E1926]">
          공고를 클릭해서 지원자를 확인해보세요 !
        </h2>
        <div className="flex justify-end">
          <SearchSortDropdown
            options={Object.values(KO_ASCENDING_SORT_TYPE)}
            value={selectedSort}
            onSelect={(sort) => setSelectedSort(sort as KoAscendingSortType)}
          />
        </div>
        <EmployerPostCardList selectedSort={selectedSort} />
      </section>
    </>
  );
};

export default EmployerPostPage;
