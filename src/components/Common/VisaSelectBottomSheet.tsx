import Button from '@/components/Common/Button';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { VisaInfo } from '@/constants/post';
import { isEmployerByAccountType } from '@/utils/signup';
import { VisaGroup } from '@/types/postCreate/postCreate';
import { buttonTranslation } from '@/constants/translation';
import { useState } from 'react';
import { BottomSheet } from '@/components/Common/BottomSheet';
import SelectListItem from '@/components/Common/Select/SelectListItem';

type VisaSelectBottomSheetPropsType = {
  selectVisas: VisaGroup[];
  setSelectVisas: (selectVisas: VisaGroup[]) => void;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const VisaSelectBottomSheet = ({
  selectVisas,
  setSelectVisas,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: VisaSelectBottomSheetPropsType) => {
  const { account_type } = useUserStore();
  const [currentSelectVisas, setCurrentSelectVisa] =
    useState<VisaGroup[]>(selectVisas);
  const handleSelectVisa = (visa: VisaGroup) => {
    if (currentSelectVisas.includes(visa)) {
      const filteredVisas = currentSelectVisas.filter(
        (selectedVisa) => selectedVisa !== visa,
      );
      setCurrentSelectVisa(filteredVisas);
    } else {
      setCurrentSelectVisa([...currentSelectVisas, visa]);
    }
  };

  const handleReset = () => {
    setCurrentSelectVisa([]);
  };

  const handleSubmit = () => {
    setSelectVisas([...currentSelectVisas]);
    setIsShowBottomSheet(false);
  };

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header
        title={
          account_type === UserType.OWNER
            ? '비자를 선택해주세요.'
            : 'Please select visas'
        }
      />
      <BottomSheet.Content>
        <div className="w-full flex flex-col">
          {Object.entries(VisaInfo).map(([key, visa]) => (
            <SelectListItem
              selectionType={SelectListItem.SelectionType.MULTIPLE}
              title={visa[isEmployerByAccountType(account_type)]}
              isSelected={currentSelectVisas.includes(key as VisaGroup)}
              iconPosition={SelectListItem.IconPosition.RIGHT}
              onClick={() => handleSelectVisa(key as VisaGroup)}
            />
          ))}
        </div>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_HORIZONTAL}
      >
        <Button
          type={Button.Type.NEUTRAL}
          layout={Button.Layout.SMALL_BUTTON}
          size={Button.Size.LG}
          title={buttonTranslation.reset[isEmployerByAccountType(account_type)]}
          onClick={handleReset}
        />
        <Button
          type={Button.Type.PRIMARY}
          layout={Button.Layout.FLEX_BUTTON}
          isFullWidth
          size={Button.Size.LG}
          title={
            buttonTranslation.selectComplete[
              isEmployerByAccountType(account_type)
            ]
          }
          onClick={handleSubmit}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default VisaSelectBottomSheet;
