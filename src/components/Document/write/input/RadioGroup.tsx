/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import RadioButton from '@/components/Information/RadioButton';

// 값 변환 핸들러 타입 정의
export type ValueTransformer<T = any> = {
  // 화면에 표시될 값을 저장 형식으로 변환 (예: 'Male' → 'MALE' 또는 'Accredited...' → true)
  transformValue: (selectedOption: string) => T;
  // 저장된 값과 옵션 항목을 비교하는 함수 (예: 'MALE'과 'Male' 비교, true와 'Accredited...' 비교)
  compareValue: (currentValue: T, option: string) => boolean;
};

// RadioGroup 컴포넌트 타입 정의
type RadioGroupProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  options: string[];
  description?: string;
  // 커스텀 값 변환 로직 (옵션)
  transformer?: ValueTransformer;
};

// 라디오 버튼 그룹을 핸들링하는 공용 컴포넌트
const RadioGroup = <T extends FieldValues = FieldValues>({
  control,
  name,
  options,
  description,
  transformer,
}: RadioGroupProps<T>) => {
  // 긴 옵션인지 확인 (레이아웃 결정)
  const isLongOption = options.some((option) => option.length > 10);

  return (
    <>
      {description && (
        <p className="body-3 text-text-alternative px-1 pb-2">{description}</p>
      )}
      <Controller
        control={control}
        name={name as FieldPath<T>}
        render={({ field: { value, onChange } }) => (
          <div
            className={`flex ${isLongOption ? 'flex-col' : 'flex-row'} gap-4`}
          >
            {options.map((option) => {
              // 선택 상태 확인 로직
              let isSelected: boolean;

              if (transformer) {
                // 커스텀 비교 로직 사용
                isSelected = transformer.compareValue(value, option);
              } else {
                // 기본 비교 로직: 직접 비교
                isSelected = value === option;
              }

              return (
                <RadioButton
                  key={option}
                  value={option}
                  setValue={(selectedValue) => {
                    if (transformer) {
                      // 커스텀 변환 로직 사용
                      onChange(transformer.transformValue(selectedValue));
                    } else {
                      // 기본 변환 로직: 그대로 저장
                      onChange(selectedValue);
                    }
                  }}
                  isOn={isSelected}
                />
              );
            })}
          </div>
        )}
      />
    </>
  );
};

export default RadioGroup;
