import RadioOnIcon from '@/assets/icons/btn_radio_on.svg?react';
import RadioOffIcon from '@/assets/icons/btn_radio_off.svg?react';

type NumberRadioButtonProps = {
  value: number;
  setValue: (value: number) => void;
  isOn: boolean;
};

const NumberRadioButton = ({
  value,
  setValue,
  isOn,
}: NumberRadioButtonProps) => {
  return (
    <div
      className={
        'relative flex flex-row items-center justify-start gap-[0.75rem] text-[#656565] body-14-regular'
      }
    >
      <div onClick={() => setValue(value)}>
        {isOn ? <RadioOnIcon /> : <RadioOffIcon />}
      </div>
    </div>
  );
};

export default NumberRadioButton;
