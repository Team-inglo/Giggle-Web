/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import { CheckboxOption } from '@/constants/documents';

// 값 변환 핸들러 타입 정의
export type ValueTransformer<T = any> = {
  // 화면에 표시될 값을 저장 형식으로 변환 (예: 'Male' → 'MALE' 또는 'Accredited...' → true)
  transformValue: (selectedOption: string) => T;
  // 저장된 값과 옵션 항목을 비교하는 함수 (예: 'MALE'과 'Male' 비교, true와 'Accredited...' 비교)
  compareValue: (currentValue: T, option: string) => boolean;
};

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
                <div
                  className="w-full relative flex items-center justify-start py-2 gap-2 text-left body-3 text-text-alternative"
                  key={`${info.key}_${index}`}
                >
                  <div className="w-6 h-6 relative">
                    <div
                      className={`w-full h-full border border-border-alternative flex items-center justify-center ${
                        isChecked ? 'bg-primary-dark' : 'bg-white'
                      }`}
                      onClick={() => {
                        const newValue = isChecked
                          ? value.filter((v: string) => v !== info.key)
                          : [...value, info.key];
                        onChange(newValue);
                      }}
                    >
                      <CheckIcon />
                    </div>
                  </div>
                  <div className="flex items-start justify-start">
                    {info.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />
    </>
  );
};

export default CheckboxGroup;
