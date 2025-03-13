import FilterIcon from '@/assets/icons/FilterIcon.svg?react';
import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';
import { useState } from 'react';

type HeaderProps = {
  handleSearch: (value: string) => void;
  handleClickFilter?: () => void;
  initialValue?: string;
  placeholder: string;
};

const TextFieldHeader = ({
  handleSearch,
  handleClickFilter,
  initialValue,
  placeholder,
}: HeaderProps) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const onClickDeleteButton = () => {
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch(value);
  };

  return (
    <section className="w-full mt-2 py-2 px-4 flex justify-between items-center gap-2 bg-white sticky top-0 z-40">
      <div className="flex-1 flex items-center p-3 rounded bg-surface-secondary border border-border-alternative">
        <input
          className="flex-1 body-2 text-text-strong rounded bg-transparent focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        {value && (
          <button onClick={onClickDeleteButton}>
            <CircleDeleteIcon />
          </button>
        )}
      </div>
      <button
        className="w-[2.875rem] h-[2.875rem] flex justify-center items-center rounded bg-surface-secondary border border-border-alternative"
        onClick={handleClickFilter}
      >
        <FilterIcon />
      </button>
    </section>
  );
};

export default TextFieldHeader;
