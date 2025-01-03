import LeftArrowIcon from '@/assets/icons/LeftArrowIcon.svg?react';
import SearchIcon from '@/assets/icons/SearchIcon.svg?react';
import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';
import { useState } from 'react';

type HeaderProps = {
  onClickBackButton: () => void;
  onClickSearchButton: (value: string) => void;
  onClickFilterButton?: () => void;
  initialValue?: string;
  placeholder: string;
};

const TextFieldHeader = ({
  onClickBackButton,
  onClickSearchButton,
  onClickFilterButton,
  initialValue,
  placeholder,
}: HeaderProps) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const onClickDeleteButton = () => {
    setValue('');
  };

  return (
    <section className="w-full h-16 px-2 flex justify-between items-center bg-white border-b border-solid border-[#1E1926] sticky top-0 z-40">
      <button className="p-[0.5rem]" onClick={onClickBackButton}>
        <LeftArrowIcon />
      </button>
      <div className="flex-1 flex items-center">
        <input
          className="flex-1 p-[0.5rem] body-2 text-[#1E1926]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button onClick={onClickDeleteButton} className="ml-2">
            <CircleDeleteIcon />
          </button>
        )}
      </div>
      <div className="flex items-center">
        {onClickFilterButton && (
          <button className="px-[0.5rem]" onClick={onClickFilterButton}>
            <FilterIcon />
          </button>
        )}
        <button
          className="px-[0.5rem]"
          onClick={() => onClickSearchButton(value)}
        >
          <SearchIcon />
        </button>
      </div>
    </section>
  );
};

export default TextFieldHeader;
