import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import { phone } from '@/constants/information';
import { Phone } from '@/types/api/document';
import { InputType } from '@/types/common/input';
import { applyFormat } from '@/utils/document';

type PhoneNumberInputProps = {
  value: Phone;
  onChange: (newValue: Phone) => void;
};

const PhoneNumberInput = ({ value, onChange }: PhoneNumberInputProps) => {
  const handleStartChange = (newStart: string) => {
    onChange({ ...value, start: newStart });
  };

  const handleRestChange = (newRest: string) => {
    const formattedValue = applyFormat(newRest, 'phone-rest');
    onChange({ ...value, rest: formattedValue });
  };

  return (
    <div className="w-full flex flex-row gap-2 justify-between">
      <div className="flex-shrink-0 max-w-[30%] h-[2.75rem]">
        <Dropdown
          title=""
          value={value.start}
          placeholder="010"
          options={phone}
          setValue={handleStartChange}
        />
      </div>
      <div className="w-full h-[2.75rem]">
        <Input
          inputType={InputType.TEXT}
          placeholder="'-' 없이 숫자만 입력"
          value={value.rest}
          onChange={handleRestChange}
          canDelete={false}
          maxLength={9}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
