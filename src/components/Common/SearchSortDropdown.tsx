import { useState } from 'react';
import DownArrowIcon from '@/assets/icons/PostSearch/DownArrowIcon.svg?react';

type DropdownProps = {
  options: string[];
  value: string | undefined;
  onSelect: (option: string) => void;
};

// DropdownModal 컴포넌트: 드롭다운 옵션을 표시하는 모달
const DropdownModal = ({ options, value, onSelect }: DropdownProps) => {
  return (
    <div className="w-max absolute top-[1.7rem] right-0 shadow rounded-2xl bg-white border border-[#dcdcdc] flex flex-row items-start justify-start p-2 text-left text-sm text-black">
      <div className="flex-1 flex flex-col items-center justify-start gap-[5px]">
        {options.map((option, index) => (
          <div
            key={index}
            className={`w-full px-4 py-2 ${value == option && 'bg-[#37383C9C] text-white'} rounded-lg  caption`}
            onClick={() => onSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchSortDropdown = ({ options, value, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[0.625rem] py-[0.375rem] pl-[0.625rem] pr-2 rounded-3xl border-[0.031rem] border-[#BDBDBD] text-[#1E1926] caption"
      >
        {value}
        <div
          className={`transition-transform duration-300 ${
            isOpen && 'rotate-180'
          }`}
        >
          <DownArrowIcon />
        </div>
      </button>
      {isOpen && (
        <DropdownModal
          value={value}
          options={options}
          onSelect={onSelectOption}
        />
      )}
    </div>
  );
};
export default SearchSortDropdown;
