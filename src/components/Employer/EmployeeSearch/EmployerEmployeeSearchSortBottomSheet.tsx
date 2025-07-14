import { PostSortingType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { POST_SORTING, POST_SORTING_KR } from '@/constants/postSearch';
import { BottomSheet } from '@/components/Common/BottomSheet';
import SelectListItem from '@/components/Common/Select/SelectListItem';

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
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="정렬조건 선택" />
      <BottomSheet.Content>
        {Object.values(POST_SORTING).map((option) => (
          <SelectListItem
            key={option}
            selectionType={SelectListItem.SelectionType.SINGLE}
            title={POST_SORTING_KR[option]}
            isSelected={option === selectedSort}
            iconPosition={SelectListItem.IconPosition.RIGHT}
            onClick={() => handleClickSort(option)}
          />
        ))}
      </BottomSheet.Content>
    </BottomSheet>
  );
};

export default EmployerEmployeeSearchSortBottomSheet;
