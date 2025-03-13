import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterSelect from '@/components/PostSearchFilter/PostSearchFilterAreaSelect';
import { useEffect, useState } from 'react';
import PostSearchFilterBottomSheet from '@/components/PostSearchFilter/PostSearchFilterBottomSheet';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { REGION_DATA } from '@/constants/regionData';

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
  const [currentRegion1, setCurrentRegion1] = useState<string[]>([]);
  const [currentRegion2, setCurrentRegion2] = useState<string[]>([]);
  const [currentRegion3, setCurrentRegion3] = useState<string[]>([]);

  const [region1Depth, setRegion1Depth] = useState<string | null>(null);
  const [region2Depth, setRegion2Depth] = useState<string | null>(null);
  const [region3Depth, setRegion3Depth] = useState<string | null>(null);

  const [region2DepthData, setRegion2DepthData] = useState<string[]>([]);
  const [region3DepthData, setRegion3DepthData] = useState<string[]>([]);

  useEffect(() => {
    const region1Depth = filterList[FILTER_CATEGORY.REGION_1DEPTH];
    const region2Depth = filterList[FILTER_CATEGORY.REGION_2DEPTH];
    const region3Depth = filterList[FILTER_CATEGORY.REGION_3DEPTH];

    setCurrentRegion1(region1Depth ? [...region1Depth] : []);
    setCurrentRegion2(region2Depth ? [...region2Depth] : []);
    setCurrentRegion3(region3Depth ? [...region3Depth] : []);
  }, [filterList]);

  const onClickBackButton = () => {
    setIsOpenAreaFilter(false);
  };

  const onSelectRegion1Depth = (region: string) => {
    setRegion1Depth(region);
    setRegion2Depth(null);
    setRegion3Depth(null);

    const isValidRegionData = REGION_DATA[region];
    if (isValidRegionData) {
      setRegion2DepthData(Object.keys(isValidRegionData));
    } else {
      setRegion2DepthData([]);
    }
    setRegion3DepthData([]);
  };

  const onSelectRegion2Depth = (region: string) => {
    if (!region1Depth) return;
    setRegion2Depth(region);

    // 전체 선택이면 바로 태그에 추가
    if (region === '전체') {
      setRegion3Depth('none');
      setRegion3DepthData([]);

      if (isExistedFilter(region1Depth, region, 'none')) {
        alert('이미 선택된 지역입니다.');
        return;
      }

      setCurrentRegion1([...currentRegion1, region1Depth]);
      setCurrentRegion2([...currentRegion2, region]);
      setCurrentRegion3([...currentRegion3, 'none']);
      return;
    }

    setRegion3Depth(null);

    const isValidRegionData = REGION_DATA[region1Depth];
    if (isValidRegionData && isValidRegionData[region]) {
      setRegion3DepthData(['전체', ...isValidRegionData[region]]);
    } else {
      setRegion3DepthData([]);
    }
  };

  const onSelectRegion3Depth = (region: string) => {
    if (!region1Depth || !region2Depth) return;
    setRegion3Depth(region);

    if (currentRegion1.length === 3) {
      alert('지역은 3개까지만 선택할 수 있습니다');
      return;
    }

    if (isExistedFilter(region1Depth, region2Depth, region)) {
      alert('이미 선택된 지역입니다.');
      return;
    }

    setCurrentRegion1([...currentRegion1, region1Depth]);
    setCurrentRegion2([...currentRegion2, region2Depth]);
    setCurrentRegion3([...currentRegion3, region]);
  };

  // 중복 선택 검사하기
  const isExistedFilter = (
    region1Depth: string,
    region2Depth: string,
    region3Depth: string,
  ) => {
    for (let i = 0; i < currentRegion1.length; i++) {
      if (
        region1Depth === currentRegion1[i] &&
        region2Depth === currentRegion2[i] &&
        region3Depth === currentRegion3[i]
      )
        return true;
    }
    return false;
  };

  const onClickSubmit = () => {
    const updatedFilterList = {
      ...filterList,
      [FILTER_CATEGORY.REGION_1DEPTH]: [...currentRegion1],
      [FILTER_CATEGORY.REGION_2DEPTH]: [...currentRegion2],
      [FILTER_CATEGORY.REGION_3DEPTH]: [...currentRegion3],
    };
    setFilterList(updatedFilterList);
    setIsOpenAreaFilter(false);
  };

  const onClickDelete = (regionIndex: number) => {
    const newCurrentRegion1 = currentRegion1.filter(
      (_value, index) => index !== regionIndex,
    );
    setCurrentRegion1(newCurrentRegion1);
    const newCurrentRegion2 = currentRegion2.filter(
      (_value, index) => index !== regionIndex,
    );
    setCurrentRegion2(newCurrentRegion2);
    const newCurrentRegion3 = currentRegion3.filter(
      (_value, index) => index !== regionIndex,
    );
    setCurrentRegion3(newCurrentRegion3);
  };

  const onClickReset = () => {
    setCurrentRegion1([]);
    setCurrentRegion2([]);
    setCurrentRegion3([]);
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
            selectedRegion={region1Depth}
            onSelect={onSelectRegion1Depth}
            regionData={Object.keys(REGION_DATA)}
          />
          <PostSearchFilterSelect
            selectedRegion={region2Depth}
            onSelect={onSelectRegion2Depth}
            regionData={region2DepthData}
          />
          <PostSearchFilterSelect
            selectedRegion={region3Depth}
            onSelect={onSelectRegion3Depth}
            regionData={region3DepthData}
          />
        </section>
      </div>
      <PostSearchFilterBottomSheet
        currentRegion1={currentRegion1}
        currentRegion2={currentRegion2}
        currentRegion3={currentRegion3}
        onClickDelete={onClickDelete}
        onClickReset={onClickReset}
        onClickSubmit={onClickSubmit}
      />
    </>
  );
};

export default PostSearchFilterArea;
