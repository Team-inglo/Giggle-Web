// components/WorkPreference/WorkPreferenceAreaSelect.tsx
import RegionSelect from '@/components/Common/RegionSelect';

interface WorkPreferenceAreaSelectProps {
  selectedAreas: string[];
  onSelectAreas: (areas: string[]) => void;
  onClose: () => void;
}

type regionType = {
  depth1: string[];
  depth2: string[];
  depth3: string[];
};

const WorkPreferenceAreaSelect = ({
  selectedAreas,
  onSelectAreas,
  onClose,
}: WorkPreferenceAreaSelectProps) => {
  // 문자열 배열을 depth 구조로 변환
  const selectedRegions: regionType = {
    depth1: [],
    depth2: [],
    depth3: [],
  };

  selectedAreas.forEach((area) => {
    const parts = area.trim().split(/\s+/);
    selectedRegions.depth1.push(parts[0] || '');
    selectedRegions.depth2.push(parts[1] || '');
    selectedRegions.depth3.push(parts[2] || '');
  });

  // RegionSelect의 결과를 WorkPreference에서 사용할 형태로 변환
  const handleRegionsChange = (regions: regionType) => {
    const areas = regions.depth1.map((item, index) => {
      let areaName = item;
      if (regions.depth2[index] && regions.depth2[index] !== '전체') {
        areaName += ` ${regions.depth2[index]}`;
      }
      if (
        regions.depth3[index] &&
        regions.depth3[index] !== '전체' &&
        regions.depth3[index] !== 'none'
      ) {
        areaName += ` ${regions.depth3[index]}`;
      }
      return areaName;
    });

    onSelectAreas(areas);
  };

  return (
    <RegionSelect
      title="Select Areas"
      selectedRegions={selectedRegions}
      onSelectRegions={handleRegionsChange}
      onClose={onClose}
      maxSelections={3}
    />
  );
};

export default WorkPreferenceAreaSelect;
