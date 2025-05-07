import Dropdown from '@/components/Common/Dropdown';
import {
  useController,
  FieldValues,
  FieldPath,
  useFormContext,
} from 'react-hook-form';

// key-value 쌍을 위한 타입 정의
export type DropdownOption = {
  key: string;
  name: string;
};

// 기본 드롭다운 props 타입
type BaseDropdownProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  placeholder: string;
};

// 일반 드롭다운 props 타입
type DropdownProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseDropdownProps<TFieldValues, TName> & {
  options: string[];
};

// key-value 드롭다운 props 타입
type KeyValueDropdownProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseDropdownProps<TFieldValues, TName> & {
  options: DropdownOption[];
};

// 일반 드롭다운 컴포넌트
const DropdownInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  placeholder,
  options,
}: DropdownProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();
  const { field } = useController({
    name,
    control,
  });

  return (
    <Dropdown
      value={field.value || ''}
      placeholder={placeholder}
      options={options}
      setValue={(value) => field.onChange(value)}
    />
  );
};

// key-value 드롭다운 컴포넌트
const KeyValueDropdownInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  placeholder,
  options,
}: KeyValueDropdownProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  const { field } = useController({
    name,
    control,
  });

  const selectedOption = options.find((opt) => opt.key === field.value);
  const displayValue = selectedOption ? selectedOption.name : '';

  return (
    <Dropdown
      value={displayValue}
      placeholder={placeholder}
      options={options.map((opt) => opt.name)}
      setValue={(value) => {
        const selected = options.find((opt) => opt.name === value);
        if (selected) {
          field.onChange(selected.key);
        }
      }}
    />
  );
};

export { DropdownInput, KeyValueDropdownInput };
export default DropdownInput;
