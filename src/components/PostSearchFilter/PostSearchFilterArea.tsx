// components/PostSearchFilter/PostSearchFilterArea.tsx
import RegionSelect from '@/components/Common/RegionSelect';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useUserStore } from '@/store/user';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

type PostSearchFilterAreaType = {
  setIsOpenAreaFilter: (value: boolean) => void;
  filterList: PostSearchFilterItemType;
  setFilterList: (filterList: PostSearchFilterItemType) => void;
};

const PostSearchFilterArea = ({
  setIsOpenAreaFilter,
  filterList,
  setFilterList,
}: PostSearchFilterAreaType) => {
  const { account_type } = useUserStore();

  // 공통 컴포넌트 사용을 위한 데이터 형식 변환
  const selectedRegions = {
    depth1: filterList[FILTER_CATEGORY.REGION_1DEPTH],
    depth2: filterList[FILTER_CATEGORY.REGION_2DEPTH],
    depth3: filterList[FILTER_CATEGORY.REGION_3DEPTH],
  };

  // 결과 처리
  const handleRegionsChange = (regions: {
    depth1: string[];
    depth2: string[];
    depth3: string[];
  }) => {
    const updatedFilterList = {
      ...filterList,
      [FILTER_CATEGORY.REGION_1DEPTH]: regions.depth1,
      [FILTER_CATEGORY.REGION_2DEPTH]: regions.depth2,
      [FILTER_CATEGORY.REGION_3DEPTH]: regions.depth3,
    };

    setFilterList(updatedFilterList);
    setIsOpenAreaFilter(false);
  };

  return (
    <RegionSelect
      title="Select Areas"
      selectedRegions={selectedRegions}
      onSelectRegions={handleRegionsChange}
      onClose={() => setIsOpenAreaFilter(false)}
      maxSelections={3}
      maxSelectionsMessage={
        postSearchTranslation.maxSelectedArea[
          isEmployerByAccountType(account_type)
        ]
      }
    />
  );
};

export default PostSearchFilterArea;
