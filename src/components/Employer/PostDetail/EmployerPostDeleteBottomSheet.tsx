import { BottomSheet } from '@/components/Common/BottomSheet';
import Button from '@/components/Common/Button';
import { useDeletePost } from '@/hooks/api/usePost';
import { useParams } from 'react-router-dom';

type EmployerPostDeleteBottomSheetType = {
  isShowBottomsheet: boolean;
  setIsShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployerPostDeleteBottomSheet = ({
  isShowBottomsheet,
  setIsShowBottomSheet,
}: EmployerPostDeleteBottomSheetType) => {
  const { mutate } = useDeletePost();
  const { id } = useParams();

  const onClickDelete = () => {
    // 고용주 공고 - 작성한 공고 조회 페이지로 이동하기
    if (isNaN(Number(id))) return;
    mutate(Number(id));
  };

  return (
    <BottomSheet
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <BottomSheet.Header title="공고를 삭제하시겠습니까?" />

      <BottomSheet.Content>
        <p className="pb-[0.25rem] caption-12-regular text-text-normal">
          공고를 삭제할 시 다시 복구할 수 없어요. 그래도 진행하시겠어요?
        </p>
      </BottomSheet.Content>
      <BottomSheet.ButtonGroup
        variant={BottomSheet.ButtonGroupVariant.TWO_VERTICAL}
      >
        <Button
          type={Button.Type.PRIMARY}
          size={Button.Size.LG}
          isFullWidth
          title="삭제"
          onClick={onClickDelete}
        />
        <Button
          type={Button.Type.NEUTRAL}
          size={Button.Size.LG}
          isFullWidth
          title="아니요"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </BottomSheet.ButtonGroup>
    </BottomSheet>
  );
};

export default EmployerPostDeleteBottomSheet;
