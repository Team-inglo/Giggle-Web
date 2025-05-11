import { buttonTypeKeys } from '@/constants/components';
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
        type={buttonTypeKeys.BACK}
        bgColor="bg-surface-secondary"
        fontColor="text-text-normal button-1"
        title={buttonTranslation.reset[isEmployerByAccountType(account_type)]}
        isBorder={false}
        onClick={onClickReset}
      />
      <Button
        type={buttonTypeKeys.CONTINUE}
        bgColor="bg-surface-primary"
        fontColor="text-text-strong button-1"
        title={buttonTranslation.apply[isEmployerByAccountType(account_type)]}
        isBorder={false}
        onClick={onClickApply}
      />
    </section>
  );
};

export default PostSearchFilterButtons;
