import CircleDeleteIcon from '@/assets/icons/CircleDeleteIcon.svg?react';
import { useState } from 'react';

type HeaderProps = {
  handleSearch: (value: string) => void;
  initialValue?: string;
  placeholder: string;
};

const TextFieldHeader = ({
  handleSearch,
  initialValue,
  placeholder,
}: HeaderProps) => {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const onClickDeleteButton = () => {
    setValue('');
    handleSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch(value);
  };

  return (
    <section className="w-full mt-2 py-2 px-4 bg-white sticky top-0 z-40">
      <div className="w-full flex items-center p-3 rounded bg-surface-secondary">
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
    </section>
  );
};

export default TextFieldHeader;
