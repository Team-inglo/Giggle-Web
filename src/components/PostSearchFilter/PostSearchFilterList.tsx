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
          <div className="flex flex-wrap gap-[0.5rem] mb-[0.5rem] px-[0.5rem] w-full">
            {options.map((option, index) => (
              <button
                key={`${index}_${option}`}
                onClick={() =>
                  onClickSearchFilter(category as FILTER_CATEGORY, option)
                }
              >
                <Tag
                  value={option}
                  padding="0.375rem 0.875rem"
                  isRounded={true}
                  hasCheckIcon={false}
                  backgroundColor={
                    isSelectedFilter(category as FILTER_CATEGORY, option)
                      ? '#FEF387'
                      : 'white'
                  }
                  color="#1E1926"
                  borderColor="#EFEFEF"
                  borderWidth="1px"
                  fontStyle="body-3"
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
