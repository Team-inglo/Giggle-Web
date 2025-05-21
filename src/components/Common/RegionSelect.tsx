import { useState, useCallback } from 'react';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import PostSearchFilterSelect from '@/components/PostSearchFilter/PostSearchFilterAreaSelect';
import PostSearchFilterBottomSheet from '@/components/PostSearchFilter/PostSearchFilterBottomSheet';
import { REGION_DATA } from '@/constants/regionData';

// 공통 지역 선택기의 Props
interface RegionSelectProps {
  title?: string;
  selectedRegions: {
    depth1: string[];
    depth2: string[];
    depth3: string[];
  };
  onSelectRegions: (regions: {
    depth1: string[];
    depth2: string[];
    depth3: string[];
  }) => void;
  onClose: () => void;
  maxSelections?: number;
  maxSelectionsMessage?: string;
}

const RegionSelect = ({
  title = 'Select Areas',
  selectedRegions,
  onSelectRegions,
  onClose,
  maxSelections = 3,
  maxSelectionsMessage = '최대 3개까지 선택 가능합니다',
}: RegionSelectProps) => {
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

  // 각 depth별 데이터
  const [region2DepthData, setRegion2DepthData] = useState<string[]>([]);
  const [region3DepthData, setRegion3DepthData] = useState<string[]>([]);

  // 내부 상태로 관리하는 선택된 지역들
  const [internalSelectedRegions, setInternalSelectedRegions] =
    useState(selectedRegions);

  // 1depth 지역 선택 로직
  const onSelectRegion1Depth = useCallback((region: string) => {
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
  }, []);

  // 2depth 지역 선택 로직
  const onSelectRegion2Depth = useCallback(
    (region: string) => {
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

        // 최대 선택 개수 확인
        if (internalSelectedRegions.depth1.length >= maxSelections) {
          alert(maxSelectionsMessage);
          return;
        }

        setInternalSelectedRegions((prev) => ({
          depth1: [...prev.depth1, depth1],
          depth2: [...prev.depth2, region],
          depth3: [...prev.depth3, 'none'],
        }));
        return;
      }

      // 2depth만 선택한 경우 - 3depth 목록 로드
      const isValidRegionData = REGION_DATA[depth1];
      if (isValidRegionData && isValidRegionData[region]) {
        setRegion3DepthData(['전체', ...isValidRegionData[region]]);
      } else {
        setRegion3DepthData([]);
      }
    },
    [
      currentSelectedRegion,
      internalSelectedRegions.depth1.length,
      maxSelections,
      maxSelectionsMessage,
    ],
  );

  // 3depth 지역 선택 로직
  const onSelectRegion3Depth = useCallback(
    (region: string) => {
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

      // 최대 선택 개수 확인
      if (internalSelectedRegions.depth1.length >= maxSelections) {
        alert(maxSelectionsMessage);
        return;
      }

      setInternalSelectedRegions((prev) => ({
        depth1: [...prev.depth1, depth1],
        depth2: [...prev.depth2, depth2],
        depth3: [...prev.depth3, region],
      }));
    },
    [
      currentSelectedRegion,
      internalSelectedRegions.depth1.length,
      maxSelections,
      maxSelectionsMessage,
    ],
  );

  // 중복 선택 검사하기
  const isExistedFilter = useCallback(
    (region1Depth: string, region2Depth: string, region3Depth: string) => {
      for (let i = 0; i < internalSelectedRegions.depth1.length; i++) {
        if (
          region1Depth === internalSelectedRegions.depth1[i] &&
          region2Depth === internalSelectedRegions.depth2[i] &&
          region3Depth === internalSelectedRegions.depth3[i]
        )
          return true;
      }
      return false;
    },
    [internalSelectedRegions],
  );

  // 선택된 지역의 Index 찾기
  const indexOfSelectedFilter = useCallback(
    (region1Depth: string, region2Depth: string, region3Depth: string) => {
      for (let i = 0; i < internalSelectedRegions.depth1.length; i++) {
        if (
          region1Depth === internalSelectedRegions.depth1[i] &&
          region2Depth === internalSelectedRegions.depth2[i] &&
          region3Depth === internalSelectedRegions.depth3[i]
        )
          return i;
      }
      return -1;
    },
    [internalSelectedRegions],
  );

  // 저장 버튼 클릭시
  const handleSubmit = useCallback(() => {
    onSelectRegions(internalSelectedRegions);
    onClose();
  }, [internalSelectedRegions, onSelectRegions, onClose]);

  // 삭제 버튼 클릭시
  const handleDelete = useCallback((regionIndex: number) => {
    setInternalSelectedRegions((prev) => {
      const newDepth1 = prev.depth1.filter(
        (_value, index) => index !== regionIndex,
      );
      const newDepth2 = prev.depth2.filter(
        (_value, index) => index !== regionIndex,
      );
      const newDepth3 = prev.depth3.filter(
        (_value, index) => index !== regionIndex,
      );

      return {
        depth1: newDepth1,
        depth2: newDepth2,
        depth3: newDepth3,
      };
    });
  }, []);

  // 초기화 버튼 클릭시
  const handleReset = useCallback(() => {
    setInternalSelectedRegions({ depth1: [], depth2: [], depth3: [] });
  }, []);

  // 이미 선택된 "00시 전체"인 경우 체크
  const checkSelectedRegion2Depth = useCallback(
    (region: string) => {
      if (!currentSelectedRegion.depth1) return false;

      if (
        region === '전체' &&
        isExistedFilter(currentSelectedRegion.depth1, region, 'none')
      )
        return true;
      return false;
    },
    [currentSelectedRegion.depth1, isExistedFilter],
  );

  // 이미 선택된 3depth인지 체크
  const checkSelectedRegion3Depth = useCallback(
    (region: string) => {
      const { depth1, depth2 } = currentSelectedRegion;
      if (!depth1 || !depth2) return false;

      if (isExistedFilter(depth1, depth2, region)) return true;
      return false;
    },
    [currentSelectedRegion, isExistedFilter],
  );

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <BaseHeader
          hasBackButton={true}
          onClickBackButton={onClose}
          hasMenuButton={false}
          title={title}
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
        selectedRegions={internalSelectedRegions}
        onClickDelete={handleDelete}
        onClickReset={handleReset}
        onClickSubmit={handleSubmit}
      />
    </>
  );
};

export default RegionSelect;
