import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
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
import BottomSheetCheckIcon from '@/assets/icons/BottomSheetCheckIcon';

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
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full">
        <h3 className="px-1 py-3 head-3 text-text-strong heading-18-semibold">
          {EMPLOYEE_SEARCH_CATEGORY_KO[filterType]}을 선택해주세요
        </h3>
        <main className="max-h-[50vh] overflow-y-scroll">
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
              <BottomSheetCheckIcon
                bgColor={
                  checkedFilter.includes(option.enum)
                    ? 'bg-surface-invert'
                    : 'bg-surface-tertiary'
                }
                strokeColor="#fff"
              />
            </button>
          ))}
        </main>

        <div className="w-full flex justify-center items-center gap-2 pt-3 text-center">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-surface-secondary"
            fontColor="text-text-strong"
            title={'초기화'}
            isBorder={false}
            onClick={handleReset}
          />
          <Button
            type={buttonTypeKeys.CONTINUE}
            bgColor="bg-surface-primary"
            fontColor="text-text-strong"
            title={'적용하기'}
            isBorder={false}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default EmployerEmployeeSearchFilterBottomSheet;
