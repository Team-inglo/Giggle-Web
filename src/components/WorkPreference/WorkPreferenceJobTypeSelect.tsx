import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Tag from '@/components/Common/Tag';
import { EmploymentType } from '@/types/postCreate/postCreate';

const jobTypes = Object.values(EmploymentType).map((jobType) => jobType.toLowerCase());

interface WorkPreferenceJobTypeSelectProps {
  onValidityChange: (isValid: boolean) => void;
}

export type JobTypeSelectRef = {
  getSelectedJobs: () => string[];
};

const WorkPreferenceJobTypeSelect = memo(forwardRef<
  JobTypeSelectRef,
  WorkPreferenceJobTypeSelectProps
>(({ onValidityChange }, ref) => {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  // 외부에서 접근 가능한 메서드 노출
  useImperativeHandle(ref, () => ({
    getSelectedJobs: () => selectedJobTypes,
  }));

  // 상태가 변경될 때마다 유효성 보고
  useEffect(() => {
    onValidityChange(selectedJobTypes.length > 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobTypes]);

  const onClickPreferences = useCallback(
    (value: string) => {
      setSelectedJobTypes((prevList) => {
        const selectedValues = prevList ?? [];

        const updatedValues = selectedValues.includes(value)
          ? selectedValues.filter((item: string) => item !== value)
          : [...selectedValues, value];

        return updatedValues;
      });
    },
    [setSelectedJobTypes],
  );
  const isSelected = (value: string) =>
    (selectedJobTypes ?? []).includes(value);

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {jobTypes.map((jobType, index) => (
        <button
          key={`${index}_${jobType}`}
          onClick={() => onClickPreferences(jobType)}
        >
          <Tag
            value={jobType}
            padding="py-[0.375rem] px-[0.675rem]"
            isRounded={true}
            hasCheckIcon={false}
            color={
              isSelected(jobType) ? 'text-text-normal' : 'text-text-alternative'
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
}));

export default WorkPreferenceJobTypeSelect;
