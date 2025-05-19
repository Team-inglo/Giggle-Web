import { memo, useCallback } from 'react';
import Tag from '@/components/Common/Tag';
import { EmploymentType } from '@/types/postCreate/postCreate';

const jobTypes = Object.values(EmploymentType).map((jobType) =>
  jobType.toLowerCase(),
);

interface WorkPreferenceJobTypeSelectProps {
  selectedJobTypes: string[];
  onJobTypesChange: (jobTypes: string[]) => void;
}

const WorkPreferenceJobTypeSelect = memo(
  ({
    selectedJobTypes,
    onJobTypesChange,
  }: WorkPreferenceJobTypeSelectProps) => {
    const onClickPreferences = useCallback(
      (value: string) => {
        const updatedValues = selectedJobTypes.includes(value)
          ? selectedJobTypes.filter((item: string) => item !== value)
          : [...selectedJobTypes, value];

        onJobTypesChange(updatedValues);
      },
      [selectedJobTypes, onJobTypesChange],
    );

    const isSelected = (value: string) => selectedJobTypes.includes(value);

    return (
      <div className="flex flex-wrap gap-2 w-full">
        {jobTypes.map((jobType, index) => (
          <button
            key={`${index}_${jobType}`}
            onClick={() => onClickPreferences(jobType)}
            data-job-type={jobType}
          >
            <Tag
              value={jobType}
              padding="py-[0.375rem] px-[0.675rem]"
              isRounded={true}
              hasCheckIcon={false}
              color={
                isSelected(jobType)
                  ? 'text-text-normal'
                  : 'text-text-alternative'
              }
              backgroundColor={
                isSelected(jobType) ? 'bg-surface-secondary' : 'bg-surface-base'
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

export default WorkPreferenceJobTypeSelect;
