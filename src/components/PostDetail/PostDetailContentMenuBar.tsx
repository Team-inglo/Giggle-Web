import { PostDetailContentMenu } from '@/constants/postDetail';

type PostDetailContentMenuBarProps = {
  selectedMenu: PostDetailContentMenu;
  scrollToSelectedMenu: (menu: PostDetailContentMenu) => void;
};

const PostDetailContentMenuBar = ({
  selectedMenu,
  scrollToSelectedMenu,
}: PostDetailContentMenuBarProps) => {
  return (
    <nav className="flex w-full pb-[0.25rem]">
      <button
        onClick={() => scrollToSelectedMenu(PostDetailContentMenu.RECUITMENT)}
        className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === PostDetailContentMenu.RECUITMENT ? 'text-[#1E1926] border-b-2 border-b-[#1E1926]' : 'text-[#BDBDBD] border-b border-b-[#BDBDBD]'}`}
      >
        Recruitment
      </button>
      <button
        onClick={() => scrollToSelectedMenu(PostDetailContentMenu.WORPLACE)}
        className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === PostDetailContentMenu.WORPLACE ? 'text-[#1E1926] border-b-2 border-b-[#1E1926]' : 'text-[#BDBDBD] border-b border-b-[#BDBDBD]'}`}
      >
        Workplace
      </button>
      <button
        onClick={() => scrollToSelectedMenu(PostDetailContentMenu.COMPANY)}
        className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === PostDetailContentMenu.COMPANY ? 'text-[#1E1926] border-b-2 border-b-[#1E1926]' : 'text-[#BDBDBD] border-b border-b-[#BDBDBD]'}`}
      >
        Company
      </button>
    </nav>
  );
};

export default PostDetailContentMenuBar;
