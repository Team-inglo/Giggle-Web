import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import { phone } from '@/constants/information';
import { InputType } from '@/types/common/input';
import { applyFormat } from '@/utils/document';
import {
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
  useFormContext,
} from 'react-hook-form';

// 전화번호 입력을 위한 커스텀 컴포넌트
type PhoneNumberInputProps<T extends FieldValues = FieldValues> = {
  name?: FieldPath<T>;
};

const PhoneNumberInputController = <T extends FieldValues>({
  name,
}: PhoneNumberInputProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <div className="w-full flex flex-row gap-2 justify-between mb-[0rem]">
      <div className="flex-shrink-0 max-w-[30%] h-[2.75rem]">
        <Controller
          name={`${name}.start` as FieldPath<T>}
          control={control}
          defaultValue={'010' as PathValue<T, FieldPath<T>>}
          render={({ field }) => (
            <Dropdown
              title=""
              value={field.value}
              placeholder="010"
              options={phone}
              setValue={(value) => field.onChange(value)}
            />
          )}
        />
      </div>
      <div className="w-full h-[2.75rem]">
        <Controller
          name={`${name}.rest` as FieldPath<T>}
          control={control}
          defaultValue={'' as PathValue<T, FieldPath<T>>}
          render={({ field }) => (
            <Input
              inputType={InputType.TEXT}
              placeholder="'-' 없이 숫자만 입력"
              value={field.value}
              onChange={(value) => {
                const formattedValue = applyFormat(value, 'phone-rest');
                field.onChange(formattedValue);
              }}
              canDelete={false}
              maxLength={9}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInputController;
