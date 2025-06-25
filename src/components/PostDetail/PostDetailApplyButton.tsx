import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import PostDetailConfirmBottomSheet from '@/components/PostDetail/PostDetailConfirmBottomSheet';
import LoginBottomSheet from '@/components/Common/LoginBottomSheet';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostValidation } from '@/hooks/api/useApplication';
import { UserType } from '@/constants/user';
import { usePutPostBookmark } from '@/hooks/api/usePost';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';

type PostDetailApplyButtonProps = {
  isBookmarked: boolean;
  isRecruiting: boolean;
};

const PostDetailApplyButton = ({
  isBookmarked,
  isRecruiting,
}: PostDetailApplyButtonProps) => {
  const { account_type } = useUserStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const { refetch } = useGetPostValidation(Number(id), false);
  const { mutate } = usePutPostBookmark();

  const [isOpenConfirmBottomSheet, setIsOpenConfirmBottomSheet] =
    useState<boolean>(false);
  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);

  const onClickApply = async () => {
    if (!account_type) {
      setIsOpenLoginBottomSheet(true);
      return;
    }
    if (account_type === UserType.USER && !isNaN(Number(id))) {
      const { data } = await refetch();
      if (data?.data?.is_qualification_verified) {
        navigate(`/post/apply/${id}`);
      } else {
        setIsOpenConfirmBottomSheet(true);
      }
    }
  };

  const onClickBookmark = async () => {
    if (account_type && !isNaN(Number(id))) {
      mutate(Number(id));
    }
  };

  return (
    <>
      <BottomButtonPanel>
        <footer className="w-full flex gap-2 z-20">
          {account_type && (
            <button
              className="flex justify-center items-center min-w-[3.25rem] w-[3.25rem] h-[3.25rem] rounded-lg bg-[#F4F4F980]"
              onClick={onClickBookmark}
            >
              {isBookmarked ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
            </button>
          )}
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={
              isRecruiting ? 'bg-primary-normal' : 'bg-surface-secondary'
            }
            fontColor={isRecruiting ? 'text-text-strong' : 'text-text-disabled'}
            title="Apply Now"
            {...(isRecruiting && { onClick: onClickApply })}
          />
        </footer>
      </BottomButtonPanel>
      <PostDetailConfirmBottomSheet
        isShowBottomsheet={isOpenConfirmBottomSheet}
        setIsShowBottomSheet={setIsOpenConfirmBottomSheet}
      />
      <LoginBottomSheet
        isShowBottomsheet={isOpenLoginBottomSheet}
        setIsShowBottomSheet={setIsOpenLoginBottomSheet}
      />
    </>
  );
};

export default PostDetailApplyButton;
