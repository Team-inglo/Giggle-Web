// src/components/Document/write/input/ValueWithCheckboxInput.tsx
import {
  Controller,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';
import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { formatDateInput } from '@/utils/information';
import { parseStringToSafeNumber } from '@/utils/document';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import Icon from '@/components/Common/Icon';

interface ValueWithCheckboxInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  placeholder?: string;
  description?: string;
  checkboxLabel?: string;
  isUnit?: boolean;
  unit?: string;
  isDate?: boolean;
  format?: string;
  inputType?: InputType;
  isValid?: (value: string) => boolean;
  errorMessage?: string;
}

const ValueWithCheckboxInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  placeholder = '',
  description,
  checkboxLabel = '상시모집',
  isUnit = false,
  unit = '',
  isDate = false,
  inputType = InputType.TEXT,
  isValid,
  errorMessage,
}: ValueWithCheckboxInputProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        // 값 변환 함수
        const handleValueChange = (newValue: string) => {
          // 날짜인 경우 formatDateInput 적용
          if (isDate) {
            onChange(formatDateInput(newValue));
          } else {
            // 숫자인 경우 parseStringToSafeNumber 적용
            onChange(isUnit ? parseStringToSafeNumber(newValue) : newValue);
          }
        };

        return (
          <div className="flex flex-col gap-2">
            {description && (
              <p className="caption-12-regular text-text-alternative px-1 pb-2">
                {description}
              </p>
            )}

            <Input
              inputType={inputType}
              placeholder={placeholder}
              value={value === null ? '' : String(value)}
              onChange={handleValueChange}
              canDelete={false}
              isUnit={isUnit}
              unit={unit}
            />
            {!!value && !isValid?.(value) && errorMessage && (
              <p className="caption-12-regular text-text-error px-1 py-1.5">
                {errorMessage}
              </p>
            )}
            <div className="w-full relative flex items-center justify-start py-3 gap-2 text-left body-16-medium text-text-alternative">
              <div
                className={`w-6 h-6 relative rounded-full flex items-center justify-center ${value === null ? 'bg-primary-dark' : 'bg-surface-tertiary'}`}
                onClick={() => onChange(value === null ? '' : null)}
              >
                <Icon icon={CheckIcon} />
              </div>
              <span>{checkboxLabel}</span>
            </div>
          </div>
        );
      }}
    />
  );
};

export default ValueWithCheckboxInput;
