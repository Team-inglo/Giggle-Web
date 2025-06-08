import { useState } from 'react';
import ArrowIcon from '@/assets/icons/ArrowUp.svg?react';
import Icon from './Icon';

// Dropdown 컴포넌트의 props 타입을 정의합니다.
type DropDownProps = {
  title?: string; // 드롭다운의 제목 (선택적)
  value: string | null; // 현재 선택된 값
  placeholder: string; // 플레이스홀더 텍스트
  options: Array<string>; // 드롭다운 옵션 목록
  setValue: (value: string) => void; // 선택된 값을 설정하는 함수
};

// DropdownModal 컴포넌트: 드롭다운 옵션을 표시하는 모달
export const DropdownModal = ({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string | null;
  onSelect: (option: string) => void;
}) => {
  return (
    <div className="max-h-[13.3rem] overflow-y-scroll w-full relative rounded-lg bg-white border border-[#dcdcdc] flex flex-row items-start justify-start p-2 text-left body-14-regular text-primary-dark z-10">
      <div className="flex-1 flex flex-col items-start justify-start gap-[5px]">
        {/* 각 옵션을 매핑하여 표시합니다. */}
        {options.map((option) => (
          <div
            className={`self-stretch overflow-hidden ${value == option && 'bg-surface-secondary text-text-strong'} rounded-lg flex flex-row items-center justify-start p-2.5`}
            onClick={() => onSelect(option)}
            key={option}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

// Dropdown 컴포넌트: 드롭다운 선택 기능을 제공합니다.
const Dropdown = ({
  title,
  value,
  placeholder,
  options,
  setValue,
}: DropDownProps) => {
  // 드롭다운의 열림/닫힘 상태를 관리합니다.
  const [isOpen, setIsOpen] = useState(false);

  // 옵션 선택 핸들러
  const handleSelect = (option: string) => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <div className="w-full flex flex-col">
      {/* 드롭다운 제목 (있는 경우에만 표시) */}
      {title && (
        <div className="w-full relative flex flex-row items-center justify-start px-1 py-1.5 box-border text-left caption-12-regular text-[#222]">
          <div className="flex-1 overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-start">
              <div className="relative leading-4">{title}</div>
            </div>
          </div>
        </div>
      )}
      {/* 드롭다운 입력 영역 */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-[3.125rem] relative rounded-lg bg-white border border-[#eae9f6] box-border flex flex-row items-center justify-center px-4 py-2.5 pl-4 text-left body-14-regular text-primary-dark">
          <div
            className="flex-1 h-5 flex flex-row items-center justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <input
              className="w-full relative leading-5 outline-none bg-white"
              value={value ?? ''}
              placeholder={placeholder}
              readOnly
            />
            {/* 드롭다운 토글 버튼 */}
            <button className="p-0 rounded-full transition-colors">
              <div
                className={`flex items-center justify-center w-5 h-6 transition-transform duration-300 ${
                  isOpen ? '' : 'rotate-180'
                }`}
              >
                <Icon icon={ArrowIcon} strokeColor={
                    value !== ''
                      ? 'stroke-text-strong'
                      : 'stroke-text-assistive'
                  }/>
              </div>
            </button>
          </div>
        </div>
        {/* 드롭다운 선택지 모달 (열려있을 때만 표시) */}
        {isOpen ? (
          <DropdownModal
            value={value ?? ''}
            options={options}
            onSelect={handleSelect}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
