import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterSelect from '@/components/PostSearchFilter/PostSearchFilterAreaSelect';
import { useEffect, useState } from 'react';
import PostSearchFilterBottomSheet from '@/components/PostSearchFilter/PostSearchFilterBottomSheet';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { REGION_DATA } from '@/constants/regionData';
import { useUserStore } from '@/store/user';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

type PostSearchFilterAreaType = {
  setIsOpenAreaFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterList: PostSearchFilterItemType;
  setFilterList: React.Dispatch<React.SetStateAction<PostSearchFilterItemType>>;
};

const PostSearchFilterArea = ({
  setIsOpenAreaFilter,
  filterList,
  setFilterList,
}: PostSearchFilterAreaType) => {
  const { account_type } = useUserStore();

  // 선택된 전체 지역 배열
  const [selectedRegions, setSelectedRegions] = useState<{
    depth1: string[];
    depth2: string[];
    depth3: string[];
  }>({
    depth1: [],
    depth2: [],
    depth3: [],
  });

  // 현재 선택 중인 지역
  const [currentSelectedRegion, setCurrentSelectedRegion] = useState<{
    depth1: string | null;
    depth2: string | null;
    depth3: string | null;
  }>({
    depth1: null,
    depth2: null,
    depth3: null,
  });

  const [region2DepthData, setRegion2DepthData] = useState<string[]>([]);
  const [region3DepthData, setRegion3DepthData] = useState<string[]>([]);

  useEffect(() => {
    const depth1 = filterList[FILTER_CATEGORY.REGION_1DEPTH];
    const depth2 = filterList[FILTER_CATEGORY.REGION_2DEPTH];
    const depth3 = filterList[FILTER_CATEGORY.REGION_3DEPTH];

    setSelectedRegions({ depth1, depth2, depth3 });
  }, [filterList]);

  const onClickBackButton = () => {
    setIsOpenAreaFilter(false);
  };

  const onSelectRegion1Depth = (region: string) => {
    setCurrentSelectedRegion({
      depth1: region,
      depth2: null,
      depth3: null,
    });

    const isValidRegionData = REGION_DATA[region];
    setRegion2DepthData(
      isValidRegionData ? Object.keys(isValidRegionData) : [],
    );
    setRegion3DepthData([]);
  };

  const onSelectRegion2Depth = (region: string) => {
    const { depth1 } = currentSelectedRegion;
    if (!depth1) return;
    setCurrentSelectedRegion((prev) => ({
      ...prev,
      depth2: region,
      depth3: null,
    }));

    // 전체 선택이면 바로 태그에 추가
    if (region === '전체') {
      setCurrentSelectedRegion((prev) => ({
        ...prev,
        depth3: 'none',
      }));
      setRegion3DepthData([]);

      // 선택된 지역 클릭 시 선택 해제
      const findIndex = indexOfSelectedFilter(depth1, region, 'none');
      if (findIndex !== -1) {
        handleDelete(findIndex);
        return;
      }

      setSelectedRegions((prev) => ({
        depth1: [...prev.depth1, depth1],
        depth2: [...prev.depth2, region],
        depth3: [...prev.depth3, 'none'],
      }));
      return;
    }

    setCurrentSelectedRegion((prev) => ({
      ...prev,
      depth3: null,
    }));

    const isValidRegionData = REGION_DATA[depth1];
    if (isValidRegionData && isValidRegionData[region]) {
      setRegion3DepthData(['전체', ...isValidRegionData[region]]);
    } else {
      setRegion3DepthData([]);
    }
  };

  const onSelectRegion3Depth = (region: string) => {
    const { depth1, depth2 } = currentSelectedRegion;
    if (!depth1 || !depth2) return;
    setCurrentSelectedRegion((prev) => ({
      ...prev,
      depth3: region,
    }));

    // 선택된 지역 클릭 시 선택 해제
    const findIndex = indexOfSelectedFilter(depth1, depth2, region);
    if (findIndex !== -1) {
      handleDelete(findIndex);
      return;
    }

    if (selectedRegions.depth1.length === 3) {
      alert(
        postSearchTranslation.maxSelectedArea[
          isEmployerByAccountType(account_type)
        ],
      );
      return;
    }

    setSelectedRegions((prev) => ({
      depth1: [...prev.depth1, depth1],
      depth2: [...prev.depth2, depth2],
      depth3: [...prev.depth3, region],
    }));
  };

  // 중복 선택 검사하기
  const isExistedFilter = (
    region1Depth: string,
    region2Depth: string,
    region3Depth: string,
  ) => {
    for (let i = 0; i < selectedRegions.depth1.length; i++) {
      if (
        region1Depth === selectedRegions.depth1[i] &&
        region2Depth === selectedRegions.depth2[i] &&
        region3Depth === selectedRegions.depth3[i]
      )
        return true;
    }
    return false;
  };

  // 선택된 지역의 Index 찾기
  const indexOfSelectedFilter = (
    region1Depth: string,
    region2Depth: string,
    region3Depth: string,
  ) => {
    for (let i = 0; i < selectedRegions.depth1.length; i++) {
      if (
        region1Depth === selectedRegions.depth1[i] &&
        region2Depth === selectedRegions.depth2[i] &&
        region3Depth === selectedRegions.depth3[i]
      )
        return i;
    }
    return -1;
  };

  const handleSubmit = () => {
    const updatedFilterList = {
      ...filterList,
      [FILTER_CATEGORY.REGION_1DEPTH]: [...selectedRegions.depth1],
      [FILTER_CATEGORY.REGION_2DEPTH]: [...selectedRegions.depth2],
      [FILTER_CATEGORY.REGION_3DEPTH]: [...selectedRegions.depth3],
    };
    setFilterList(updatedFilterList);
    setIsOpenAreaFilter(false);
  };

  const handleDelete = (regionIndex: number) => {
    const newDepth1 = selectedRegions.depth1.filter(
      (_value, index) => index !== regionIndex,
    );
    const newDepth2 = selectedRegions.depth2.filter(
      (_value, index) => index !== regionIndex,
    );
    const newDepth3 = selectedRegions.depth3.filter(
      (_value, index) => index !== regionIndex,
    );

    setSelectedRegions({
      depth1: newDepth1,
      depth2: newDepth2,
      depth3: newDepth3,
    });
  };

  const handleReset = () => {
    setSelectedRegions({ depth1: [], depth2: [], depth3: [] });
  };

  // 이미 선택된 "00시 전체"인 경우 체크
  const checkSelectedRegion2Depth = (region: string) => {
    if (!currentSelectedRegion.depth1) return false;

    if (
      region === '전체' &&
      isExistedFilter(currentSelectedRegion.depth1, region, 'none')
    )
      return true;
    return false;
  };

  // 이미 선택된 3depth인지 체크
  const checkSelectedRegion3Depth = (region: string) => {
    const { depth1, depth2 } = currentSelectedRegion;
    if (!depth1 || !depth2) return false;

    if (isExistedFilter(depth1, depth2, region)) return true;
    return false;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={onClickBackButton}
          hasMenuButton={false}
          title={'Select Areas'}
        />
        <section className="flex-1 flex w-full pt-4 pb-[15rem]">
          <PostSearchFilterSelect
            selectedRegion={currentSelectedRegion.depth1}
            onSelect={onSelectRegion1Depth}
            regionData={Object.keys(REGION_DATA)}
          />
          <PostSearchFilterSelect
            selectedRegion={currentSelectedRegion.depth2}
            onSelect={onSelectRegion2Depth}
            regionData={region2DepthData}
            checkIsSelected={checkSelectedRegion2Depth}
          />
          <PostSearchFilterSelect
            selectedRegion={currentSelectedRegion.depth3}
            onSelect={onSelectRegion3Depth}
            regionData={region3DepthData}
            checkIsSelected={checkSelectedRegion3Depth}
          />
        </section>
      </div>
      <PostSearchFilterBottomSheet
        selectedRegions={selectedRegions}
        onClickDelete={handleDelete}
        onClickReset={handleReset}
        onClickSubmit={handleSubmit}
      />
    </>
  );
};

export default PostSearchFilterArea;
