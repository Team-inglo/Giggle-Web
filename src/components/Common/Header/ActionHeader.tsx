import BackButtonIcon from '@/assets/icons/BackButtonIcon.svg?react';
import LikeIcon from '@/assets/icons/LikeIcon.svg?react';
import ShareIcon from '@/assets/icons/ShareIcon.svg?react';
import ColumnMenuIcon from '@/assets/icons/ColumnMenuIcon.svg?react';

type HeaderProps = {
  hasBackButton: boolean; // 뒤로 가기 버튼 여부
  onClickBackButton?: () => void;
  onClickLikeButton: () => void;
  onClickShareButton: () => void;
  onClickMenuButton: () => void;
  title: string; // 페이지 제목
};

const ActionHeader = ({
  hasBackButton,
  onClickBackButton,
  onClickLikeButton,
  onClickShareButton,
  onClickMenuButton,
  title,
}: HeaderProps) => {
  return (
    <section className="w-full h-[3.5rem] px-[0.75rem] py-[0.5rem] flex justify-between items-center bg-white sticky top-0">
      <div className="flex items-center">
        {hasBackButton && (
          <button
            className="mr-[0.5rem] p-[0.5rem] rounded-[0.75rem] border border-solid border-[#ECECEC]"
            onClick={onClickBackButton}
          >
            <BackButtonIcon />
          </button>
        )}
        <p className="ml-[0.5rem] head-3">{title}</p>
      </div>
      <div className="flex gap-[0.125rem] ">
        <button
          className="w-[2.188rem] flex justify-center items-center"
          onClick={onClickLikeButton}
        >
          <LikeIcon />
        </button>
        <button
          className="w-[2.188rem] flex justify-center items-center"
          onClick={onClickShareButton}
        >
          <ShareIcon />
        </button>
        <button
          className="w-[2.188rem] flex justify-center items-center"
          onClick={onClickMenuButton}
        >
          <ColumnMenuIcon />
        </button>
      </div>
    </section>
  );
};

export default ActionHeader;
