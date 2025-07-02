import Input from '@/components/Common/Input';
import { InputType } from '@/types/common/input';
import { applyFormat } from '@/utils/document';
import {
  useController,
  UseControllerProps,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';

type DocumentFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  inputType: InputType;
  placeholder: string;
  canDelete: boolean;
  name: TName; // UseControllerProps에서 필수 prop
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
  isValid?: (value: string) => boolean;
  errorMessage?: string;
};

const DocumentFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputType,
  placeholder,
  canDelete,
  name,
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
  isValid,
  errorMessage,
}: DocumentFormInputProps<TFieldValues, TName>) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: (defaultValue ?? '') as typeof defaultValue,
  });

  return (
    <>
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
      {!field.value && description && (
        <p className="caption-12-regular text-text-alternative px-1 py-1.5">
          {description}
        </p>
      )}
      {!!field.value && !isValid?.(field.value) && errorMessage && (
        <p className="caption-12-regular text-text-error px-1 py-1.5">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default DocumentFormInput;
