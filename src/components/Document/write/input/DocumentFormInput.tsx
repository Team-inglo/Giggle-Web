import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { applyFormat } from '@/utils/document';
import {
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

type DocumentFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  inputType: InputType;
  placeholder: string;
  canDelete: boolean;
  name: TName; // UseControllerProps에서 필수 prop
  control: UseControllerProps<TFieldValues, TName>['control']; // UseControllerProps에서 필수 prop
  rules?: UseControllerProps<TFieldValues, TName>['rules']; // 선택적 유효성 검사 규칙
  defaultValue?: UseControllerProps<TFieldValues, TName>['defaultValue']; // 선택적 기본값
  format?: string | string[];
  description?: string;
  // Input의 나머지 선택적 props
  clearInvalid?: () => void;
  onDelete?: () => void;
  isPrefix?: boolean;
  isPreventFocus?: boolean;
  prefix?: string;
  isUnit?: boolean;
  unit?: string;
};

const DocumentFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputType,
  placeholder,
  canDelete,
  name,
  control,
  rules,
  defaultValue,
  format,
  clearInvalid,
  onDelete,
  isPrefix,
  isPreventFocus,
  prefix,
  isUnit,
  unit,
  description,
}: DocumentFormInputProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: (defaultValue ?? '') as typeof defaultValue,
  });

  return (
    <>
      {description && (
        <p className="body-3 text-text-alternative px-1 pb-2">{description}</p>
      )}
      <Input
        inputType={inputType}
        placeholder={placeholder}
        value={field.value}
        onChange={(value) => {
          // 포맷팅 적용 후 값 업데이트
          const formattedValue = applyFormat(value, format);
          field.onChange(formattedValue);
        }}
        canDelete={canDelete}
        isInvalid={!!fieldState.error}
        clearInvalid={clearInvalid}
        onDelete={onDelete}
        isPrefix={isPrefix}
        isPreventFocus={isPreventFocus}
        prefix={prefix}
        isUnit={isUnit}
        unit={unit}
      />
    </>
  );
};

export default DocumentFormInput;
