import { PostDetailContentMenu } from '@/constants/postDetail';
import { postTranslation } from '@/constants/translation';
import { useUserStore } from '@/store/user';
import { isEmployerByAccountType } from '@/utils/signup';

type PostDetailContentMenuBarProps = {
  selectedMenu: PostDetailContentMenu;
  scrollToSelectedMenu: (menu: PostDetailContentMenu) => void;
};

const PostDetailContentMenuBar = ({
  selectedMenu,
  scrollToSelectedMenu,
}: PostDetailContentMenuBarProps) => {
  const { account_type } = useUserStore();

  return (
    <nav className="flex w-full px-4 bg-white border-b border-border-alternative">
      <button
        onClick={() => scrollToSelectedMenu(PostDetailContentMenu.RECUITMENT)}
        className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === PostDetailContentMenu.RECUITMENT ? 'text-text-strong border-b-2 border-b-[#1E1926]' : 'text-[#BDBDBD]'}`}
      >
        {postTranslation.recruitment[isEmployerByAccountType(account_type)]}
      </button>
      <button
        onClick={() => scrollToSelectedMenu(PostDetailContentMenu.WORPLACE)}
        className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === PostDetailContentMenu.WORPLACE ? 'text-text-strong border-b-2 border-b-[#1E1926]' : 'text-[#BDBDBD]'}`}
      >
        {postTranslation.workplace[isEmployerByAccountType(account_type)]}
      </button>
      <button
        onClick={() => scrollToSelectedMenu(PostDetailContentMenu.COMPANY)}
        className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === PostDetailContentMenu.COMPANY ? 'text-text-strong border-b-2 border-b-[#1E1926]' : 'text-[#BDBDBD]'}`}
      >
        {postTranslation.company[isEmployerByAccountType(account_type)]}
      </button>
    </nav>
  );
};

export default PostDetailContentMenuBar;
