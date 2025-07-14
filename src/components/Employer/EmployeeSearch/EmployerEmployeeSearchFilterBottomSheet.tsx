import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import { useEffect, useState } from 'react';
import {
  EMPLOYEE_SEARCH_CATEGORY_KO,
  EMPLOYEE_SEARCH_OPTIONS,
} from '@/constants/manageResume';
import {
  EmployeeSearchCategoryEnType,
  EmployeeSearchFilterItemType,
} from '@/types/api/resumes';
import BottomSheetCheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import Icon from '@/components/Common/Icon';
import { BottomSheet } from '@/components/Common/BottomSheet';

type EmployerEmployeeSearchFilterBottomSheetPropsType = {
  filterType: EmployeeSearchCategoryEnType;
  filterList: EmployeeSearchFilterItemType;
  handleChangeFilter: (newFilterList: EmployeeSearchFilterItemType) => void;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const EmployerEmployeeSearchFilterBottomSheet = ({
  filterType,
  filterList,
  handleChangeFilter,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: EmployerEmployeeSearchFilterBottomSheetPropsType) => {
  const [checkedFilter, setCheckedFilter] = useState<string[]>(
    filterList[filterType],
  );

  const handleClickFilter = (filter: string) => {
    const filterSet = new Set(checkedFilter);

    if (filterSet.has(filter)) filterSet.delete(filter);
    else filterSet.add(filter);

    setCheckedFilter([...filterSet]);
  };

  const handleReset = () => {
    handleChangeFilter({ ...filterList, [filterType]: [] });
    setIsShowBottomSheet(false);
  };

  const handleSubmit = () => {
    handleChangeFilter({ ...filterList, [filterType]: [...checkedFilter] });
    setIsShowBottomSheet(false);
  };

  useEffect(() => {
    setCheckedFilter(filterList[filterType]);
  }, [filterType, filterList]);

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title={EMPLOYEE_SEARCH_CATEGORY_KO[filterType]} />
      <BottomSheet.Content>
        {EMPLOYEE_SEARCH_OPTIONS[filterType].map((option, index) => (
          <button
            key={`${index}_${option.ko}`}
            className="w-full px-1 py-3 flex justify-between items-center"
            onClick={() => handleClickFilter(option.enum)}
          >
            <p
              className={`body-2 text-text-strong ${checkedFilter.includes(option.enum) ? 'body-16-medium' : 'body-16-regular'}`}
            >
              {option.ko}
            </p>
            <div
              className={`p-1 rounded-full                 ${
                checkedFilter.includes(option.enum)
                  ? 'bg-surface-invert'
                  : 'bg-surface-tertiary'
              }`}
            >
              <Icon
                icon={BottomSheetCheckIcon}
                strokeColor="stroke-surface-base"
              />
            </div>
          </button>
        ))}
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_HORIZONTAL}
      >
        <Button
          type={buttonTypeKeys.BACK}
          bgColor="bg-surface-secondary"
          fontColor="text-text-strong"
          title={'초기화'}
          onClick={handleReset}
        />
        <Button
          type={buttonTypeKeys.CONTINUE}
          bgColor="bg-surface-primary"
          fontColor="text-text-strong"
          title={'적용하기'}
          onClick={handleSubmit}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default EmployerEmployeeSearchFilterBottomSheet;
