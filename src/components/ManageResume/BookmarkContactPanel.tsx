import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import PostDetailConfirmBottomSheet from '@/components/PostDetail/PostDetailConfirmBottomSheet';
import LoginBottomSheet from '@/components/Common/LoginBottomSheet';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { useParams } from 'react-router-dom';
import { usePutPostBookmark } from '@/hooks/api/usePost';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';

type PostDetailApplyButtonProps = {
  isBookmarked: boolean;
};

const BookmarkContactPanel = ({ isBookmarked }: PostDetailApplyButtonProps) => {
  const { account_type } = useUserStore();
  const { id } = useParams();

  const { mutate } = usePutPostBookmark();

  const [isOpenConfirmBottomSheet, setIsOpenConfirmBottomSheet] =
    useState<boolean>(false);
  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const onClickApply = async () => {
    sendReactNativeMessage({
      type: 'PHONE_CALL',
      payload: '01012345678',
    });
  };

  const onClickBookmark = async () => {
    if (account_type && !isNaN(Number(id))) {
      mutate(Number(id));
      setIsBookmark(!isBookmark);
    }
  };

  useEffect(() => {
    setIsBookmark(isBookmarked);
  }, [setIsBookmark, isBookmarked]);

  return (
    <>
      <BottomButtonPanel>
        <footer className="w-full flex gap-2 z-20">
          {account_type && (
            <button
              className="flex justify-center items-center min-w-[3.25rem] w-[3.25rem] h-[3.25rem] rounded-lg bg-[#F4F4F980]"
              onClick={onClickBookmark}
            >
              {isBookmark ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
            </button>
          )}
          <Button
            type={buttonTypeKeys.APPLY}
            bgColor={'bg-surface-primary'}
            fontColor={'text-text-strong'}
            isBorder={false}
            title="연락하기"
            onClick={onClickApply}
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

export default BookmarkContactPanel;
