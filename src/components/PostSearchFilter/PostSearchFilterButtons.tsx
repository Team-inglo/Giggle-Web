import Button from '@/components/Common/Button';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { initialFilterList } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { buttonTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

type PostSearchFilterButtonsType = {
  setFilterList: (filterList: PostSearchFilterItemType) => void;
  onClickApply: () => void;
};

const PostSearchFilterButtons = ({
  setFilterList,
  onClickApply,
}: PostSearchFilterButtonsType) => {
  const { account_type } = useUserStore();

  const onClickReset = () => {
    setFilterList(initialFilterList);
  };

  return (
    <section className="w-full flex justify-center items-center gap-2 pt-3 pb-10 px-6">
      <Button
        type={Button.Type.NEUTRAL}
        layout={Button.Layout.SMALL_BUTTON}
        size={Button.Size.LG}
        title={buttonTranslation.reset[isEmployerByAccountType(account_type)]}
        onClick={onClickReset}
      />
      <Button
        type={Button.Type.PRIMARY}
        layout={Button.Layout.FLEX_BUTTON}
        size={Button.Size.LG}
        isFullWidth
        title={buttonTranslation.apply[isEmployerByAccountType(account_type)]}
        onClick={onClickApply}
      />
    </section>
  );
};

export default PostSearchFilterButtons;
