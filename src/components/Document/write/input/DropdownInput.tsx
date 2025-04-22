import Dropdown from '@/components/Common/Dropdown';
import {
  useController,
  Control,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

type FormDropdownProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder: string;
  options: string[];
};

const DropdownInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder,
  options,
}: FormDropdownProps<TFieldValues, TName>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Dropdown
      value={field.value}
      placeholder={placeholder}
      options={options}
      setValue={(value) => field.onChange(value)}
    />
  );
};

export default DropdownInput;
