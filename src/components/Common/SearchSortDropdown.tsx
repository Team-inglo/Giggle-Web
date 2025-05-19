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
    <div className="min-w-28 absolute top-[1.7rem] right-0 shadow rounded-lg bg-white flex flex-row items-start justify-start py-2 text-left caption text-text-alternative z-40">
      <div className="flex-1 flex flex-col items-center justify-start gap-1">
        {options.map((option, index) => (
          <div
            key={index}
            className={`w-full px-3 py-2 ${value == option && 'text-text-strong'} rounded-lg  caption`}
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
        className="flex items-center gap-1 text-text-strong body-3"
      >
        {value}
        <div
          className={` transition-transform duration-300 ${
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
