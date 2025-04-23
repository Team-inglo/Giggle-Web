/* eslint-disable @typescript-eslint/no-explicit-any */
import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import { phone } from '@/constants/information';
import { InputType } from '@/types/common/input';
import { applyFormat } from '@/utils/document';
import { Control, Controller, FieldValues } from 'react-hook-form';

// 전화번호 입력을 위한 커스텀 컴포넌트
type PhoneNumberInputProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name?: string;
};

const PhoneNumberInput = <T extends FieldValues>({
  control,
  name = 'phone_number',
}: PhoneNumberInputProps<T>) => {
  return (
    <div className="w-full flex flex-row gap-2 justify-between mb-[0rem]">
      <div className="w-full h-[2.75rem]">
        <Controller
          name={`${name}.start` as any}
          control={control}
          defaultValue={'010' as unknown as any}
          render={({ field }) => (
            <Dropdown
              value={field.value}
              placeholder="010"
              options={phone}
              setValue={(value) => field.onChange(value)}
            />
          )}
        />
      </div>
      <Controller
        name={`${name}.middle` as any}
        control={control}
        defaultValue={'' as unknown as any}
        render={({ field }) => (
          <Input
            inputType={InputType.TEXT}
            placeholder="0000"
            value={field.value}
            onChange={(value) => {
              // 포맷팅 적용 후 값 업데이트
              const formattedValue = applyFormat(value, 'numbers-only');
              field.onChange(formattedValue);
            }}
            canDelete={false}
          />
        )}
      />
      <Controller
        name={`${name}.end` as any}
        control={control}
        defaultValue={'' as unknown as any}
        render={({ field }) => (
          <Input
            inputType={InputType.TEXT}
            placeholder="0000"
            value={field.value}
            onChange={(value) => {
              // 포맷팅 적용 후 값 업데이트
              const formattedValue = applyFormat(value, 'numbers-only');
              field.onChange(formattedValue);
            }}
            canDelete={false}
          />
        )}
      />
    </div>
  );
};

export default PhoneNumberInput;
