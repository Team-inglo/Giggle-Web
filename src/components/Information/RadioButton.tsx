import RadioOnIcon from '@/assets/icons/btn_radio_on.svg?react';
import RadioOffIcon from '@/assets/icons/btn_radio_off.svg?react';

const RadioButton = ({
  value,
  setValue,
  isOn,
}: {
  value: string;
  setValue: (value: string) => void;
  isOn: boolean;
}) => {
  return (
    <div className="w-full relative flex flex-row items-center justify-start gap-[0.75rem] text-[#656565] text-xs font-[Pretendard]">
      <div onClick={() => setValue(value)}>
        {isOn ? <RadioOnIcon /> : <RadioOffIcon />}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default RadioButton;
