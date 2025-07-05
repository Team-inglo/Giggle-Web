import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { VisaInfo } from '@/constants/post';
import { isEmployerByAccountType } from '@/utils/signup';
import CheckIcon from '@/assets/icons/CheckOfBoxIcon.svg?react';
import { VisaGroup } from '@/types/postCreate/postCreate';
import { buttonTranslation } from '@/constants/translation';
import { useState } from 'react';
import Icon from '@/components/Common/Icon';

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
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex-col">
        <div className="w-full h-[60vh] overflow-y-scroll no-scrollbar">
          <h3 className="py-3 heading-18-semibold text-text-strong">
            {account_type === UserType.OWNER
              ? '비자를 선택해주세요.'
              : 'Please select visas'}
          </h3>
          <div className="w-full flex flex-col">
            {Object.entries(VisaInfo).map(([key, visa]) => (
              <div
                className={`w-full self-stretch overflow-hidden rounded-[0.625rem] flex flex-row gap-2 items-center justify-between ${currentSelectVisas.includes(key as VisaGroup) ? 'body-16-medium' : 'body-16-regular'} py-3`}
                onClick={() => handleSelectVisa(key as VisaGroup)}
                key={key}
              >
                <p className="body-16-medium text-text-normal break-keep">
                  {visa[isEmployerByAccountType(account_type)]}
                </p>
                <div
                  className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full ${currentSelectVisas.includes(key as VisaGroup) ? 'bg-surface-invert' : 'bg-surface-tertiary'}`}
                >
                  <Icon icon={CheckIcon} fillColor="text-surface-base" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white flex items-center justify-center pt-3 box-border text-center button-16-semibold z-10">
          <div className="w-full flex gap-2">
            <Button
              type={buttonTypeKeys.BACK}
              bgColor="bg-surface-secondary"
              fontColor="text-text-normal"
              title={
                buttonTranslation.reset[isEmployerByAccountType(account_type)]
              }
              onClick={handleReset}
            />
            <Button
              type={buttonTypeKeys.CONTINUE}
              bgColor="bg-surface-primary"
              fontColor="text-text-normal"
              title={
                buttonTranslation.selectComplete[
                  isEmployerByAccountType(account_type)
                ]
              }
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default VisaSelectBottomSheet;
