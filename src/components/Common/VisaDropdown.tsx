import { useState } from 'react';
import ArrowIcon from '@/assets/icons/ArrowUp.tsx';
import VisaSelectBottomSheet from './VisaSelectBottomSheet';
import { VisaGroup } from '@/types/postCreate/postCreate';
import Tag from '@/components/Common/Tag';

type VisaDropDownProps = {
  value: VisaGroup[]; // 현재 선택된 값
  placeholder: string; // 플레이스홀더 텍스트
  setValue: (selectVisas: VisaGroup[]) => void; // 선택된 값을 설정하는 함수
};

const VisaDropdown = ({ value, placeholder, setValue }: VisaDropDownProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleDelete = (selectedVisa: VisaGroup) => {
    const filteredVisas = value.filter((visa) => visa !== selectedVisa);
    setValue(filteredVisas);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full relative rounded-lg bg-white border border-[#eae9f6] box-border h-11 flex flex-row items-center justify-center px-4 py-2.5 pl-4 text-left body-2 text-[#656565]">
          <div className="flex-1 h-5 flex flex-row items-center justify-between">
            <input
              className="w-full relative leading-5 outline-none bg-white"
              value={value.join(', ').replace(/_/g, '-')}
              placeholder={placeholder}
              disabled
            />
            {/* 드롭다운 토글 버튼 */}
            <button
              onClick={() => setIsBottomSheetOpen(true)}
              className="p-0 rounded-full transition-colors"
            >
              <div
                className={`flex items-center justify-center w-5 h-6 transition-transform duration-300 ${
                  isBottomSheetOpen ? '' : 'rotate-180'
                }`}
              >
                <ArrowIcon isMarked={value !== null} />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-2">
          {value?.map((value, index) => (
            <Tag
              key={`${value}_${index}`}
              value={value.replace(/_/g, '-')}
              padding="py-[0.375rem] pr-[0.5rem] pl-[0.625rem]"
              isRounded={false}
              hasCheckIcon={false}
              backgroundColor={'bg-surface-base'}
              color="text-text-normal"
              fontStyle="body-2"
              onDelete={() => handleDelete(value)}
              borderColor={'border-border-alternative'}
            />
          ))}
        </div>
      </div>
      {isBottomSheetOpen && (
        <VisaSelectBottomSheet
          selectVisas={value}
          setSelectVisas={setValue}
          isShowBottomsheet={isBottomSheetOpen}
          setIsShowBottomSheet={setIsBottomSheetOpen}
        />
      )}
    </>
  );
};

export default VisaDropdown;
