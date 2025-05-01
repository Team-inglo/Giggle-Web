// src/components/Document/write/input/DateWithCheckboxInput.tsx
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { formatDateInput } from '@/utils/information';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';

interface DateWithCheckboxInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  description?: string;
}

const DateWithCheckboxInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder = 'YYYY-MM-DD',
}: DateWithCheckboxInputProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col gap-2">
          <Input
            inputType={InputType.TEXT}
            placeholder={placeholder}
            value={value === null ? '' : String(value)}
            onChange={(newValue) => onChange(formatDateInput(newValue))}
            canDelete={false}
          />

          <div className="w-full relative flex items-center justify-start py-2 gap-3 text-left body-3 text-text-alternative">
            <div className="w-6 h-6 relative">
              <div
                className={`w-full h-full border border-border-alternative rounded-sm flex items-center justify-center ${value === null ? 'bg-primary-dark' : 'bg-white'}`}
                onClick={() => onChange(value === null ? '' : null)}
              >
                <CheckIcon />
              </div>
            </div>
            <span>상시모집</span>
          </div>
        </div>
      )}
    />
  );
};

export default DateWithCheckboxInput;
