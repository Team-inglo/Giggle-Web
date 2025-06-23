import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import CompleteButtonModal from '@/components/Common/CompleteButtonModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { usePostApplyPost } from '@/hooks/api/useApplication';
import PostApplyErrorBottomSheet from '@/components/PostApply/PostApplyErrorBottomSheet';
import axios from 'axios';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useErrorStore } from '@/store/error';

const PostApplyButton = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isShowBottomsheet, setIsShowBottomSheet] = useState<boolean>(false);

  const { mutate } = usePostApplyPost();
  const { updateCurrentPostId, currentPostId } =
    useCurrentPostIdEmployeeStore();
  const { openErrorBottomSheet } = useErrorStore();

  const onClickApply = () => {
    if (isNaN(Number(id))) return;

    mutate(Number(id), {
      onSuccess: (data) => {
        updateCurrentPostId(data?.data?.id);
        setIsComplete(true);
      },
      onError: (error) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.data?.error?.code === 40011
        ) {
          setIsShowBottomSheet(true);
        } else {
          openErrorBottomSheet(error);
        }
      },
    });
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
            onClick={() => navigate('/profile/manage-resume')}
          />
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-[#FEF387]'}
            fontColor="text-text-strong"
            title="Apply Now"
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
