import Button from '@/components/Common/Button';
import Tag from '@/components/Common/Tag';
import { postSearchTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';
import { BottomSheet } from '@/components/Common/BottomSheet';

type PostSearchFilterBottomSheetType = {
  selectedRegions: {
    depth1: string[];
    depth2: string[];
    depth3: string[];
  };
  onClickDelete: (index: number) => void;
  onClickReset: () => void;
  onClickSubmit: () => void;
};

const PostSearchFilterBottomSheet = ({
  selectedRegions,
  onClickDelete,
  onClickReset,
  onClickSubmit,
}: PostSearchFilterBottomSheetType) => {
  const formatRegionArrayToString = (index: number) => {
    return `${selectedRegions.depth1[index]} ${selectedRegions.depth2[index]} ${selectedRegions.depth3[index] === 'none' ? '' : selectedRegions.depth3[index]}`;
  };
  const { account_type } = useUserStore();

  return (
    <BottomSheet
      isAvailableHidden={false}
      isShowBottomsheet={true}
      isFixedBackground={false}
    >
      <BottomSheet.Header
        title={
          postSearchTranslation.selectedAreas[
            isEmployerByAccountType(account_type)
          ]
        }
      />
      <BottomSheet.Content>
        <h3 className="w-full heading-18-semibold text-text-normal">
          {
            postSearchTranslation.selectedAreas[
              isEmployerByAccountType(account_type)
            ]
          }
          <span className="pl-2 text-primary-normal">
            {selectedRegions.depth1.length}
          </span>
        </h3>
        <div className="w-full flex flex-wrap gap-2">
          {selectedRegions.depth1.map((region, index) => (
            <Tag
              key={`${region}_${index}`}
              value={formatRegionArrayToString(index)}
              padding="py-[0.375rem] pr-[0.5rem] pl-[0.675rem]"
              isRounded={true}
              hasCheckIcon={false}
              borderColor={'border-border-alternative'}
              backgroundColor={'bg-surface-base'}
              color="text-text-normal"
              fontStyle="body-14-regular"
              onDelete={() => onClickDelete(index)}
            />
          ))}
        </div>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_VERTICAL}
      >
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          layout={Button.Layout.SMALL_BUTTON}
          title={
            postSearchTranslation.reset[isEmployerByAccountType(account_type)]
          }
          onClick={onClickReset}
        />
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          layout={Button.Layout.FLEX_BUTTON}
          title={
            postSearchTranslation.apply[isEmployerByAccountType(account_type)]
          }
          onClick={onClickSubmit}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default PostSearchFilterBottomSheet;
