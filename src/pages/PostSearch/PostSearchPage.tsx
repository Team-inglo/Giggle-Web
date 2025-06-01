import TextFieldHeader from '@/components/Common/Header/TextFieldHeader';
import CareerSearchSection from '@/components/PostSearch/CareerSearchSection';
import PostSearchSection from '@/components/PostSearch/PostSearchSection';
import { UserType } from '@/constants/user';
import { usePostSearch } from '@/hooks/usePostSearch';
import { useUserStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const enum PostSearchMenu {
  POST = 'POST',
  CAREER = 'CAREER',
}

const PostSearchPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { account_type } = useUserStore();
  const { searchOption, updateSearchOption } = usePostSearch(state);

  const [selectedMenu, setSelectedMenu] = useState<PostSearchMenu>(
    PostSearchMenu.POST,
  );

  const onClickSearch = (text: string) => {
    updateSearchOption('searchText', text);
  };

  // 새로 고침 시에 검색필터를 모두 초기화 위해 사용
  useEffect(() => {
    const isReload =
      (
        performance.getEntriesByType(
          'navigation',
        )[0] as PerformanceNavigationTiming
      )?.type === 'reload';

    if (isReload) {
      navigate('/search', {
        state: {},
        replace: true,
      });
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <TextFieldHeader
        handleSearch={onClickSearch}
        placeholder={
          account_type === UserType.OWNER
            ? '이름으로 검색'
            : 'Your perfect part-time job starts here!'
        }
        initialValue={searchOption.searchText}
      />
      {account_type !== UserType.OWNER && (
        <nav className="flex w-full bg-surface-base">
          <button
            onClick={() => setSelectedMenu(PostSearchMenu.POST)}
            className={`flex-1 py-[0.625rem] button-16-semibold ${selectedMenu === PostSearchMenu.POST ? 'text-text-strong border-b-2 border-b-text-strong' : 'text-text-disabled'}`}
          >
            Job
          </button>
          <button
            onClick={() => setSelectedMenu(PostSearchMenu.CAREER)}
            className={`flex-1 py-[0.625rem] button-16-semibold ${selectedMenu === PostSearchMenu.CAREER ? 'text-text-strong border-b-2 border-b-text-strong' : 'text-text-disabled'}`}
          >
            Career
          </button>
        </nav>
      )}
      {selectedMenu === PostSearchMenu.POST && (
        <PostSearchSection
          searchOption={searchOption}
          updateSearchOption={updateSearchOption}
        />
      )}
      {selectedMenu === PostSearchMenu.CAREER && (
        <CareerSearchSection
          searchOption={searchOption}
          updateSearchOption={updateSearchOption}
        />
      )}
    </div>
  );
};

export default PostSearchPage;
