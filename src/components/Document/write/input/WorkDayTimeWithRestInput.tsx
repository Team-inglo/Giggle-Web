import {
  Controller,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';
import { useState } from 'react';
import WorkDayTimeWithRestBottomSheet from '@/components/Common/WorkDayTimeWithRestBottomSheet';
import { WorkDayTimeWithRest } from '@/types/api/document';
import { workDayTimeToString } from '@/utils/post';
import AddIcon from '@/assets/icons/FileAddIcon.svg?react';

interface WorkDayTimeWithRestInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  placeholder?: string;
  description?: string;
}

const WorkDayTimeWithRestInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  description,
}: WorkDayTimeWithRestInputProps<TFieldValues, TName>) => {
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
          {/* 트리거 버튼 */}
          {value?.length > 0 && (
            <div className="w-full h-8 overflow-x-auto flex items-center gap-2 mb-1">
              {value.map((workdaytime: WorkDayTimeWithRest, index: number) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: '124px' }}
                >
                  <div className="w-full h-6 flex items-center justify-center px-3 py-1 bg-primary-normal button-14-semibold rounded-[1.125rem] whitespace-nowrap">
                    {workDayTimeToString(workdaytime)}
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="w-full flex gap-2 items-center justify-center text-left body-14-regular border rounded-xl shadow-sm border-border-alternative [--input-color:text-alternative] bg-white py-[10px] pl-4 pr-[14px] cursor-pointer"
            onClick={() => setIsModal(true)}
          >
            <span className="text-text-alternative">
              <AddIcon />
            </span>
          </button>

          {/* 모달 */}
          {isModal && (
            <WorkDayTimeWithRestBottomSheet
              isShowBottomsheet={isModal}
              setIsShowBottomSheet={setIsModal}
              onClose={(selected: WorkDayTimeWithRest[]) => {
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

export default WorkDayTimeWithRestInput;
