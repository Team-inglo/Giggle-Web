import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { ValueTransformer } from '@/types/api/document';
import CardSelect from '@/components/Common/CardSelect';
import Chip from '@/components/Common/Chip';
import { SelectOption } from '@/constants/formFields';

export enum RadioGroupVariant {
  CARDSELECT = 'cardselect',
  CHIP = 'chip',
}

// RadioGroup 컴포넌트 타입 정의
type RadioGroupProps<T extends FieldValues = FieldValues> = {
  name: FieldPath<T>;
  type: RadioGroupVariant;
  options: string[];
  optionsWithIcon?: SelectOption[];
  description?: string;
  // 커스텀 값 변환 로직 (옵션)
  transformer?: ValueTransformer;
};

// 라디오 버튼 그룹을 핸들링하는 공용 컴포넌트
const RadioGroup = <T extends FieldValues = FieldValues>({
  name,
  type,
  options,
  optionsWithIcon,
  description,
  transformer,
}: RadioGroupProps<T>) => {
  const { control } = useFormContext<T>();
  // 긴 옵션인지 확인 (레이아웃 결정)
  const isLongOption = options.some((option) => option.length > 10);

  return (
    <>
      {description && (
        <p className="caption-12-regular text-text-alternative px-1 pb-2">
          {description}
        </p>
      )}
      <Controller
        control={control}
        name={name as FieldPath<T>}
        render={({ field: { value, onChange } }) => (
          <div
            className={`flex ${isLongOption ? 'flex-col' : 'flex-row'} gap-2`}
          >
            {type === RadioGroupVariant.CARDSELECT &&
              optionsWithIcon?.map((option) => {
                let isSelected: boolean;
                // 선택 상태 확인 로직
                if (transformer) {
                  // 커스텀 비교 로직 사용
                  isSelected = transformer.compareValue(value, option.name);
                } else {
                  // 기본 비교 로직: 직접 비교
                  isSelected = value === option.name;
                }
                return (
                  <CardSelect
                    key={option.name}
                    title={option.name}
                    icon={option.icon}
                    selected={isSelected}
                    onClick={() => {
                      if (transformer) {
                        onChange(transformer.transformValue(option.name));
                      } else {
                        onChange(option.name);
                      }
                    }}
                  />
                );
              })}
            {type === RadioGroupVariant.CHIP &&
              options?.map((option) => {
                let isSelected: boolean;
                if (transformer) {
                  isSelected = transformer.compareValue(value, option);
                } else {
                  isSelected = value === option;
                }
                return (
                  <Chip
                    key={option}
                    text={option}
                    state={isSelected ? Chip.State.ACTIVE : Chip.State.DEFAULT}
                    onClick={() => {
                      if (transformer) {
                        onChange(transformer.transformValue(option));
                      } else {
                        onChange(option);
                      }
                    }}
                  />
                );
              })}
          </div>
        )}
      />
    </>
  );
};

RadioGroup.Type = RadioGroupVariant;

export default RadioGroup;
