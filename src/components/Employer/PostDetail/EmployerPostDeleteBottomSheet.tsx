import BottomSheetLayout from '@/components/Common/BottomSheetLayout';
import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
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
    <BottomSheetLayout
      hasHandlebar={true}
      isAvailableHidden={true}
      isShowBottomsheet={isShowBottomsheet}
      setIsShowBottomSheet={setIsShowBottomSheet}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="px-[1.625rem] pb-[0.75rem] head-2 text-[#1E1926]">
          Delete Post
        </h3>
        <p className="px-[1.625rem] pb-[0.25rem] body-3 text-[#656565]">
          Unable to recover after deletion.
        </p>
      </div>
      <div className="w-full py-[3rem] flex flex-col gap-[0.5rem]">
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#FEF387]"
          fontColor="text-[#1E1926]"
          isBorder={false}
          title="Delete Post"
          onClick={onClickDelete}
        />
        <Button
          type={buttonTypeKeys.LARGE}
          bgColor="bg-[#F4F4F9]"
          fontColor="text-[#BDBDBD]"
          isBorder={false}
          title="Cancel"
          onClick={() => setIsShowBottomSheet(false)}
        />
      </div>
    </BottomSheetLayout>
  );
};

export default EmployerPostDeleteBottomSheet;
