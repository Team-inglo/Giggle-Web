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
      <div className="w-full flex flex-col gap-[1.5rem] pb-[2rem]">
        <h3 className="w-full px-[0.75rem] head-3 text-black">
          Selected Areas
        </h3>
        <div className="w-full px-[0.5rem] flex flex-wrap gap-[0.5rem]">
          {currentRegion1.map((region, index) => (
            <Tag
              key={`${region}_${index}`}
              value={formatRegionArrayToString(index)}
              padding="0.313rem 0.625rem 0.313rem 0.75rem"
              isRounded={true}
              hasCheckIcon={false}
              backgroundColor={'#FEF387'}
              color="#1E1926"
              fontStyle="body-3"
              onDelete={() => onClickDelete(index)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center items-center gap-[0.5rem]">
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
            title="Continue"
            isBorder={false}
            onClick={onClickSubmit}
          />
        </div>
      </div>
    </BottomSheetLayout>
  );
};

export default PostSearchFilterBottomSheet;
