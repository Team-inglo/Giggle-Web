import Button from '@/components/Common/Button';
import { buttonTypeKeys } from '@/constants/components';
import PostDetailConfirmBottomSheet from '@/components/PostDetail/PostDetailConfirmBottomSheet';
import LoginBottomSheet from '@/components/Common/LoginBottomSheet';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import { useState } from 'react';
import { useUserStore } from '@/store/user';
import { useParams } from 'react-router-dom';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { usePutScrapResume } from '@/hooks/api/useResume';

type PostDetailApplyButtonProps = {
  isBookmarked: boolean;
  phoneNumber: string;
};

const BookmarkContactPanel = ({
  isBookmarked,
  phoneNumber,
}: PostDetailApplyButtonProps) => {
  const { account_type } = useUserStore();
  const { id } = useParams();

  const { mutate } = usePutScrapResume();

  const [isOpenConfirmBottomSheet, setIsOpenConfirmBottomSheet] =
    useState<boolean>(false);
  const [isOpenLoginBottomSheet, setIsOpenLoginBottomSheet] =
    useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(isBookmarked);

  const onClickApply = async () => {
    if (window.ReactNativeWebView) {
      sendReactNativeMessage({
        type: 'SEND_MESSAGE_TO_USER',
        payload: phoneNumber.replace(/[-]/g, ''),
      });
      return;
    }
  };

  const onClickBookmark = async () => {
    if (!id) {
      console.error('이력서 ID가 없습니다.');
      return;
    }
    mutate(id);
    setIsBookmark(!isBookmark);
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
