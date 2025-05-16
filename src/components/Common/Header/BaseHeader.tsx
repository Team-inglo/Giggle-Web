import BackButtonIcon from '@/assets/icons/BackButtonIcon.svg?react';
import RowMenuIcon from '@/assets/icons/RowMenuIcon.svg?react';

type HeaderProps = {
  hasBackButton: boolean; // 뒤로 가기 버튼 여부
  onClickBackButton?: () => void;
  hasMenuButton: boolean; // 메뉴 버튼 여부
  onClickMenuButton?: () => void;
  title?: string; // 페이지 제목
};

const BaseHeader = ({
  hasBackButton,
  onClickBackButton,
  hasMenuButton,
  onClickMenuButton,
  title,
}: HeaderProps) => {
  return (
    <section className="w-full h-[3.75rem] pl-[0.5rem] pr-[0.75rem] py-[0.75rem] flex justify-between items-center bg-white sticky top-0 z-40">
      {hasBackButton ? (
        <button className="p-[0.5rem] border-white" onClick={onClickBackButton}>
          <BackButtonIcon />
        </button>
      ) : (
        <div className="w-[2.5rem] h-[2.5rem]"></div>
      )}
      {title ? <span className="head-3">{title}</span> : <div></div>}
      {hasMenuButton ? (
        <button
          className="p-[0.5rem] rounded-[0.75rem] border border-solid border-[#ECECEC]"
          onClick={onClickMenuButton}
        >
          <RowMenuIcon />
        </button>
      ) : (
        <div className="w-[2.5rem] h-[2.5rem]"></div>
      )}
    </section>
  );
};

export default BaseHeader;
