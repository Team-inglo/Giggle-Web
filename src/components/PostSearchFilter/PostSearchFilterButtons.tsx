import { buttonTypeKeys } from '@/constants/components';
import Button from '@/components/Common/Button';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { initialFilterList } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { buttonTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

type PostSearchFilterButtonsType = {
  setFilterList: React.Dispatch<React.SetStateAction<PostSearchFilterItemType>>;
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
    <section className="w-full flex justify-center items-center gap-[0.5rem] pt-[0.75rem] pb-[2.5rem] px-[1.5rem]">
      <Button
        type={buttonTypeKeys.BACK}
        bgColor={'bg-[#F4F4F9]'}
        fontColor="text-[#BDBDBD] button-1"
        title={buttonTranslation.reset[isEmployerByAccountType(account_type)]}
        isBorder={false}
        onClick={onClickReset}
      />
      <Button
        type={buttonTypeKeys.CONTINUE}
        bgColor={'bg-[#FEF387]'}
        fontColor="text-[#1E1926] button-1"
        title={buttonTranslation.apply[isEmployerByAccountType(account_type)]}
        isBorder={false}
        onClick={onClickApply}
      />
    </section>
  );
};

export default PostSearchFilterButtons;
