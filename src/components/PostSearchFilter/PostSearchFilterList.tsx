import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';

type PostSearchFilterListProps = {
  showCategories: [string, string[]][];
  filterList: PostSearchFilterItemType;
  setFilterList: React.Dispatch<React.SetStateAction<PostSearchFilterItemType>>;
};

const PostSearchFilterList = ({
  showCategories,
  filterList,
  setFilterList,
}: PostSearchFilterListProps) => {
  const isSelectedFilter = (category: FILTER_CATEGORY, value: string) => {
    const foundFilter = filterList[category].find((filter) => filter === value);

    if (foundFilter) return true;
    return false;
  };

  const onClickSearchFilter = (category: FILTER_CATEGORY, value: string) => {
    if (isSelectedFilter(category, value)) {
      const updatedFilterList = {
        ...filterList,
        [category]: filterList[category].filter((filter) => filter !== value),
      };
      setFilterList(updatedFilterList);
    } else {
      const updatedFilterList = {
        ...filterList,
        [category]: [...filterList[category], value],
      };
      setFilterList(updatedFilterList);
    }
  };

  return (
    <>
      {showCategories.map(([category, options], index) => (
        <PostSearchFilterToggle title={category} key={`${index}_${category}`}>
          <div className="flex flex-wrap gap-2 w-full">
            {options.map((option, index) => (
              <button
                key={`${index}_${option}`}
                onClick={() =>
                  onClickSearchFilter(category as FILTER_CATEGORY, option)
                }
              >
                <Tag
                  value={option}
                  padding="py-[0.375rem] px-[0.675rem]"
                  isRounded={true}
                  hasCheckIcon={false}
                  color={
                    isSelectedFilter(category as FILTER_CATEGORY, option)
                      ? 'text-text-normal'
                      : 'text-text-alternative'
                  }
                  backgroundColor={
                    isSelectedFilter(category as FILTER_CATEGORY, option)
                      ? 'bg-surface-secondary'
                      : 'bg-surface-base'
                  }
                  borderColor="border-border-alternative"
                  fontStyle="body-2"
                />
              </button>
            ))}
          </div>
        </PostSearchFilterToggle>
      ))}
    </>
  );
};

export default PostSearchFilterList;
