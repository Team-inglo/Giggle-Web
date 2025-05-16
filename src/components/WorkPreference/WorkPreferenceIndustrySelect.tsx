import { memo, useCallback } from 'react';
import Tag from '@/components/Common/Tag';
import { JobCategory } from '@/types/postCreate/postCreate';

// enum 값을 표시 이름으로 변환하는 함수
const formatEnumToDisplayName = (enumValue: string): string => {
  return enumValue.toLowerCase().replace(/_/g, ' ');
};

// 업직종 표시 이름과 Enum 값을 매핑
const industryOptions = Object.values(JobCategory).map((enumValue) => ({
  displayName: formatEnumToDisplayName(enumValue), // 영어 표시 이름 (소문자, 공백)
  enumValue: enumValue as JobCategory, // enum 값
}));

interface WorkPreferenceIndustrySelectProps {
  selectedIndustries: JobCategory[];
  onIndustriesChange: (industries: JobCategory[]) => void;
}

const WorkPreferenceIndustrySelect = memo(
  ({
    selectedIndustries,
    onIndustriesChange,
  }: WorkPreferenceIndustrySelectProps) => {
    const onClickPreferences = useCallback(
      (enumValue: JobCategory) => {
        const updatedValues = selectedIndustries.includes(enumValue)
          ? selectedIndustries.filter((item) => item !== enumValue)
          : [...selectedIndustries, enumValue];

        onIndustriesChange(updatedValues);
      },
      [selectedIndustries, onIndustriesChange],
    );

    const isSelected = (enumValue: JobCategory) =>
      selectedIndustries.includes(enumValue);

    return (
      <div className="flex flex-row flex-wrap gap-2 w-full">
        {industryOptions.map((industry) => (
          <button
            key={industry.enumValue}
            onClick={() => onClickPreferences(industry.enumValue)}
            data-industry
            data-industry-value={industry.enumValue}
          >
            <Tag
              value={industry.displayName}
              padding="py-[0.375rem] px-[0.675rem]"
              isRounded={true}
              hasCheckIcon={false}
              color={
                isSelected(industry.enumValue)
                  ? 'text-text-normal'
                  : 'text-text-alternative'
              }
              backgroundColor={
                isSelected(industry.enumValue)
                  ? 'bg-surface-secondary'
                  : 'bg-surface-base'
              }
              borderColor="border-border-alternative"
              fontStyle="body-2"
            />
          </button>
        ))}
      </div>
    );
  },
);

export default WorkPreferenceIndustrySelect;
