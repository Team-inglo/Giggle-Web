import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import Tag from '@/components/Common/Tag';
import { buttonTypeKeys } from '@/constants/components';

type PostSearchFilterBottomSheetType = {
  currentRegion1: string[];
  currentRegion2: string[];
  currentRegion3: string[];
  onClickDelete: (index: number) => void;
  onClickReset: () => void;
  onClickSubmit: () => void;
};

const PostSearchFilterBottomSheet = ({
  currentRegion1,
  currentRegion2,
  currentRegion3,
  onClickDelete,
  onClickReset,
  onClickSubmit,
}: PostSearchFilterBottomSheetType) => {
  const formatRegionArrayToString = (index: number) => {
    return `${currentRegion1[index]} ${currentRegion2[index]} ${currentRegion3[index] === 'none' ? '' : currentRegion3[index]}`;
  };

  return (
    <BottomSheetLayout
      hasHandlebar={false}
      isAvailableHidden={false}
      isShowBottomsheet={true}
      isFixedBackground={false}
    >
      <div className="w-full flex flex-col gap-6">
        <h3 className="w-full head-3 text-black">
          Selected Areas
          <span className="pl-2 text-[#FFD817]">{currentRegion1.length}</span>
        </h3>
        <div className="w-full flex flex-wrap gap-2">
          {currentRegion1.map((region, index) => (
            <Tag
              key={`${region}_${index}`}
              value={formatRegionArrayToString(index)}
              padding="py-[0.375rem] pr-[0.5rem] pl-[0.675rem]"
              isRounded={true}
              hasCheckIcon={false}
              borderColor={'border-border-alternative'}
              backgroundColor={'bg-surface-base'}
              color="text-text-normal"
              fontStyle="body-2"
              onDelete={() => onClickDelete(index)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor={'bg-[#F4F4F9]'}
            fontColor="text-[#BDBDBD] button-1"
            title="Reset"
            isBorder={false}
            onClick={onClickReset}
          />
          <Button
            type={buttonTypeKeys.CONTINUE}
            bgColor={'bg-[#FEF387]'}
            fontColor="text-[#1E1926] button-1"
            title="Apply"
            isBorder={false}
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default PostSearchFilterBottomSheet;
