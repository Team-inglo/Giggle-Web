// WorkDayTimeInput.tsx
import {
  Controller,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';
import { useState } from 'react';
import WorkDayTimeBottomSheet from '@/components/Common/WorkDayTimeBottomSheet';
import { WorkDayTime } from '@/types/api/document';
import { workDayTimeToString } from '@/utils/post';
import AddIcon from '@/assets/icons/FileAddIcon.svg?react';

interface WorkDayTimeInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  placeholder?: string;
  description?: string;
}

const WorkDayTimeInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  description,
}: WorkDayTimeInputProps<TFieldValues, TName>) => {
  const [isModal, setIsModal] = useState(false);
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          {description && (
            <p className="caption-12-regular text-text-alternative px-1 pb-2">
              {description}
            </p>
          )}
          {/* 선택된 근무 시간 표시 */}
          <div className="w-full h-8">
            <div className="w-full h-full overflow-x-auto flex items-center gap-2">
              {(value as WorkDayTime[])?.map((workdaytime, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="w-full h-6 flex items-center justify-center px-3 py-1 bg-surface-primary button-14-semibold rounded-[1.125rem] whitespace-nowrap">
                    {workDayTimeToString(workdaytime)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 근무 시간 추가 버튼 */}
          <button
            className="w-full flex gap-2 items-center justify-center text-left body-14-regular border rounded-xl shadow-sm border-border-alternative [--input-color:text-text-alternative] bg-white py-[0.625rem] pl-4 pr-[0.875rem] cursor-pointer"
            onClick={() => setIsModal(true)}
          >
            <span className="text-text-alternative">
              <AddIcon />
            </span>
          </button>

          {/* 근무 시간 선택 모달 */}
          {isModal && (
            <WorkDayTimeBottomSheet
              isShowBottomsheet={isModal}
              setIsShowBottomSheet={setIsModal}
              onClose={(selected: WorkDayTime[]) => {
                onChange(selected);
                setIsModal(false);
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default WorkDayTimeInput;
