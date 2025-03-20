import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import CompleteButtonModal from '@/components/Common/CompleteButtonModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { usePostApplyPost } from '@/hooks/api/useApplication';
import PostApplyErrorBottomSheet from '@/components/PostApply/PostApplyErrorBottomSheet';
import { AxiosError } from 'axios';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';

const PostApplyButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const { mutateAsync } = usePostApplyPost();
  const { updateCurrentPostId, currentPostId } =
    useCurrentPostIdEmployeeStore();

  const onClickApply = async () => {
    if (isNaN(Number(id))) return;
    try {
      const result = await mutateAsync(Number(id));

      if (result?.success) {
        updateCurrentPostId(result?.data?.id);
        setIsComplete(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: { code: number } }>;

      if (axiosError.response?.data.error.code === 40011) {
        setIsShowBottomSheet(true);
      }
    }
  };

  return (
    <>
      <BottomButtonPanel>
        <section className="w-full flex gap-2">
          <Button
            type={buttonTypeKeys.BACK}
            bgColor="bg-surface-secondary"
            fontColor="text-text-normal"
            title="Edit"
            isBorder={false}
            onClick={() => navigate('/profile/manage-resume')}
          />
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-[#FEF387]'}
            fontColor="text-text-strong"
            title="Apply Now"
            isBorder={false}
            onClick={onClickApply}
          />
        </section>
      </BottomButtonPanel>
      {isComplete && (
        <CompleteButtonModal
          title="Application Completed"
          content="You can check the status of your documents"
          buttonContent="Check Now"
          // TODO: 추후에 지원상태 - 상세 페이지로 이동시키기
          onClick={() => navigate(`/application/${currentPostId}`)}
        />
      )}
      <PostApplyErrorBottomSheet
        isShowBottomsheet={isShowBottomsheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
      />
    </>
  );
};

export default PostApplyButton;
