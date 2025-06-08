import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import BottomSheetCheckIcon from '@/assets/icons/BottomSheetCheckIcon.svg?react';
import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { POST_SORTING, POST_SORTING_KR } from '@/constants/postSearch';
import Icon from '@/components/Common/Icon';

type EmployerEmployeeSearchSortBottomSheetPropsType = {
  selectedSort: PostSortingType;
  handleClickSort: (selectedSort: PostSortingType) => void;
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: (isShowBottomsheet: boolean) => void;
};

const EmployerEmployeeSearchSortBottomSheet = ({
  selectedSort,
  handleClickSort,
  isShowBottomsheet,
  setIsShowBottomSheet,
}: EmployerEmployeeSearchSortBottomSheetPropsType) => {
  return (
    <BottomSheetLayout
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="px-1 w-full">
        <h3 className="py-3 head-3 text-text-strong heading-18-semibold">
          정렬조건 선택
        </h3>
        {Object.values(POST_SORTING).map((option, index) => (
          <button
            key={`${index}_${option}`}
            className="relative w-full py-3 text-start"
            onClick={() => handleClickSort(option)}
          >
            <p
              className={`body-2 text-text-strong ${option === selectedSort ? 'body-16-medium' : 'body-16-regular'}`}
            >
              {POST_SORTING_KR[option]}
            </p>
            {option === selectedSort && (
              <div className="absolute right-0 top-3">
                <div className={`p-1 rounded-full bg-surface-base`}>
                  <Icon
                    icon={BottomSheetCheckIcon}
                    strokeColor="stroke-surface-invert"
                  />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </BottomSheetLayout>
  );
};

export default EmployerEmployeeSearchSortBottomSheet;
