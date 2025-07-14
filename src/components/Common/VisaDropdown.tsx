import { useState } from 'react';
import ArrowIcon from '@/assets/icons/ArrowUp.svg?react';
import VisaSelectBottomSheet from '@/components/Common/VisaSelectBottomSheet';
import { VisaGroup } from '@/types/postCreate/postCreate';
import Tag from '@/components/Common/Tag';
import Icon from '@/components/Common/Icon';

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
        <div className="w-full h-[3.25rem] relative rounded-[0.625rem] bg-surface-base border-[0.05rem] border-border-assistive box-border flex flex-row items-center justify-center px-4 py-[0.875rem] pl-4 text-left body-16-medium">
          <div
            className="flex-1 h-5 flex flex-row items-center justify-between"
            onClick={() => setIsBottomSheetOpen(!isBottomSheetOpen)}
          >
            <input
              className="w-full relative leading-5 outline-none bg-white"
              value={value.join(', ').replace(/_/g, '-')}
              placeholder={placeholder}
              readOnly
            />
            {/* 드롭다운 토글 버튼 */}
            <button className="p-0 rounded-full transition-colors">
              <div
                className={`flex items-center justify-center w-5 h-6 transition-transform duration-300 ${
                  isBottomSheetOpen ? '' : 'rotate-180'
                }`}
              >
                <Icon
                  icon={ArrowIcon}
                  strokeColor={
                    value.length > 0
                      ? 'stroke-text-strong'
                      : 'stroke-text-assistive'
                  }
                />
              </div>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-2">
          {value?.map((value, index) => (
            <Tag
              key={`${value}_${index}`}
              value={value.replace(/_/g, '-')}
              padding="py-2 pr-[0.625rem] pl-[0.875rem] rounded-full"
              isRounded
              hasCheckIcon={false}
              backgroundColor={'bg-surface-base'}
              color="text-text-strong"
              fontStyle="body-14-regular"
              onDelete={() => handleDelete(value)}
              borderColor={'border-border-disabled'}
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
