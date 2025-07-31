import { useState } from 'react';
import ArrowIcon from '@/assets/icons/ArrowUp.svg?react';
import Icon from '@/components/Common/Icon';
import SelectListItem from '@/components/Common/Select/SelectListItem';
import { BottomSheet } from '@/components/Common/BottomSheet';

// Dropdown 컴포넌트의 props 타입을 정의합니다.
type DropDownProps = {
  title: string; // 드롭다운의 제목 (선택적)
  value: string | null; // 현재 선택된 값
  placeholder: string; // 플레이스홀더 텍스트
  options: Array<string>; // 드롭다운 옵션 목록
  setValue: (value: string) => void; // 선택된 값을 설정하는 함수
};

//  DropdownModal 컴포넌트: 드롭다운 옵션을 표시하는 모달(바텀시트 사용으로 변경됨)
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
    <div className="flex-col max-h-[33.3rem] overflow-y-scroll overflow-x-hidden no-scrollbar w-full relative rounded-[0.625rem] bg-white flex items-start justify-start px-1 text-left z-10">
      <div className="flex-1 flex flex-col w-full items-start gap-[5px]">
        {/* 각 옵션을 매핑하여 표시합니다. */}
        {options.map((option) => (
          <SelectListItem
            selectionType={SelectListItem.SelectionType.SINGLE}
            title={option}
            isSelected={value === option}
            iconPosition={SelectListItem.IconPosition.RIGHT}
            onClick={() => onSelect(option)}
          />
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
      {/* 드롭다운 입력 영역 */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-[3.25rem] relative rounded-[0.625rem] bg-white border-[0.05rem] border-border-assistive box-border flex flex-row items-center justify-center px-4 py-[0.875rem] pl-4 text-left body-16-medium">
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
                <Icon
                  icon={ArrowIcon}
                  strokeColor={
                    value !== ''
                      ? 'stroke-text-strong'
                      : 'stroke-text-assistive'
                  }
                />
              </div>
            </button>
          </div>
        </div>
        {/* 드롭다운 선택지 모달 (열려있을 때만 표시) */}
        {isOpen ? (
          <BottomSheet
            isAvailableHidden={true}
            isShowBottomsheet={isOpen}
            setIsShowBottomSheet={() => setIsOpen(false)}
          >
            <BottomSheet.Header title={title ?? ''} />
            <BottomSheet.Content>
              <DropdownModal
                value={value ?? ''}
                options={options}
                onSelect={handleSelect}
              />
            </BottomSheet.Content>
          </BottomSheet>
        ) : null}
      </div>
    </div>
  );
};

export default Dropdown;
