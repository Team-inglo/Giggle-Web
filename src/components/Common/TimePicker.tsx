import { useState } from 'react';
import DownArrowIcon from '@/assets/icons/DownArrowIcon.svg?react';
import { HOUR_LIST, MINUTE_LIST } from '@/constants/time';
import Icon from './Icon';

type TimePickerProps = {
  isDisabled: boolean;
  onChangeTime: (time: string) => void;
};

const TimePicker = ({ isDisabled, onChangeTime }: TimePickerProps) => {
  const [time, setTime] = useState({ hour: '00', minute: '00' });

  const handleTimeChange = (field: 'hour' | 'minute', value: string) => {
    if (isDisabled) return;

    const newTime =
      field === 'hour' ? { ...time, hour: value } : { ...time, minute: value };

    setTime(newTime);
    onChangeTime(`${newTime.hour}:${newTime.minute}`);
  };

  return (
    <div
      className={`w-full flex justify-between items-center border  ${isDisabled ? 'border-[#EAE9F6] text-[#BDBDBD]' : 'border-gray-300'} rounded-lg px-[1rem] py-[0.5rem]`}
    >
      <div>
        <select
          className="appearance-none rounded-l-lg focus:outline-none"
          value={time.hour}
          onChange={(e) => handleTimeChange('hour', e.target.value)}
          disabled={isDisabled}
        >
          {HOUR_LIST.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span className="px-1">:</span>
        <select
          className="appearance-none rounded-r-lg focus:outline-none"
          value={time.minute}
          onChange={(e) => handleTimeChange('minute', e.target.value)}
          disabled={isDisabled}
        >
          {MINUTE_LIST.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <Icon
          icon={DownArrowIcon}
          strokeColor={
            isDisabled ? 'stroke-text-assistive' : 'stroke-text-strong'
          }
        />
      </div>
    </div>
  );
};

export default TimePicker;
