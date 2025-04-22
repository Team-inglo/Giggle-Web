import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
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
  clearInvalid,
  onDelete,
  isPrefix,
  isPreventFocus,
  prefix,
  isUnit,
  unit,
}: DocumentFormInputProps<TFieldValues, TName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <Input
      inputType={inputType}
      placeholder={placeholder}
      value={field.value}
      onChange={(value) => field.onChange(value)}
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
  );
};

export default DocumentFormInput;
