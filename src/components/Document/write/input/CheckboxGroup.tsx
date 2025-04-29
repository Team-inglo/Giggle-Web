import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import { CheckboxOption } from '@/constants/documents';
import { ValueTransformer } from '@/types/api/document';

// CheckboxGroup 컴포넌트 타입 정의
type CheckboxGroupProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  options: CheckboxOption[];
  description?: string;
  variant?: 'checkbox' | 'button';
  // 커스텀 값 변환 로직 (옵션)
  transformer?: ValueTransformer;
};

// 체크박스 그룹을 핸들링하는 공용 컴포넌트
const CheckboxGroup = <T extends FieldValues = FieldValues>({
  control,
  name,
  options,
  description,
  variant = 'checkbox',
}: CheckboxGroupProps<T>) => {
  return (
    <>
      {description && (
        <p className="body-3 text-text-alternative px-1 pb-2">{description}</p>
      )}
      <Controller
        control={control}
        name={name as FieldPath<T>}
        render={({ field: { value = [], onChange } }) => (
          <div
            className={`flex ${variant === 'button' ? 'flex-wrap gap-[0.5rem] w-full' : 'flex-row gap-3'}`}
          >
            {options.map((info, index) => {
              const isChecked = value.includes(info.key as never);
              // 버튼 버전인 경우 버튼 렌더링
              return variant === 'button' ? (
                <button
                  key={info.key}
                  className={`py-[0.375rem] px-[0.875rem] body-2 border-border-alternative rounded-md ${isChecked ? 'bg-primary-normal text-text-normal border border-border-primary' : 'bg-white text-text-alternative border'}`}
                  onClick={() => {
                    const newValue = isChecked
                      ? value.filter((v: string) => v !== info.key)
                      : [...value, info.key];
                    onChange(newValue);
                  }}
                  type="button"
                >
                  {info.name}
                </button>
              ) : (
                // 체크박스 버전인 경우 체크박스 렌더링
                <label
                  className="w-full relative flex items-center justify-start py-2 gap-2 text-left body-3 text-text-alternative cursor-pointer"
                  key={`${info.key}_${index}`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={() => {
                      const newValue = isChecked
                        ? value.filter((v: string) => v !== info.key)
                        : [...value, info.key];
                      onChange(newValue);
                    }}
                  />
                  <div className="w-6 h-6 relative">
                    <div
                      className={`w-full h-full border border-border-alternative flex items-center justify-center ${
                        isChecked ? 'bg-primary-dark' : 'bg-white'
                      }`}
                    >
                      <CheckIcon />
                    </div>
                  </div>
                  <div className="flex items-start justify-start">
                    {info.name}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      />
    </>
  );
};

export default CheckboxGroup;
