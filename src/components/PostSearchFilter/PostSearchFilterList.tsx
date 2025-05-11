import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import {
  EN_FILTER_CATEGORY_OPTIONS,
  FILTER_CATEGORY,
  FILTER_CATEGORY_KR,
  FILTER_CATEGORY_OPTIONS,
} from '@/constants/postSearch';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { memo, useCallback } from 'react';

type PostSearchFilterListProps = {
  filterList: PostSearchFilterItemType;
  setFilterList: (
    value: (prev: PostSearchFilterItemType) => PostSearchFilterItemType,
  ) => void;
};

const PostSearchFilterList = memo(
  ({ filterList, setFilterList }: PostSearchFilterListProps) => {
    const { account_type } = useUserStore();

    const onClickSearchFilter = useCallback(
      (category: FILTER_CATEGORY, value: string) => {
        setFilterList((prevFilterList) => {
          const selectedValues = prevFilterList[category] ?? [];

          const updatedValues = selectedValues.includes(value)
            ? selectedValues.filter((item) => item !== value)
            : [...selectedValues, value];

          return {
            ...prevFilterList,
            [category]: updatedValues,
          };
        });
      },
      [setFilterList],
    );

    return (
      <>
        {Object.entries(FILTER_CATEGORY_OPTIONS).map(([category, options]) => (
          <FilterCategory
            key={category}
            category={category as FILTER_CATEGORY}
            options={options}
            selectedOptions={filterList[category as FILTER_CATEGORY]}
            onClickSearchFilter={onClickSearchFilter}
            accountType={account_type}
          />
        ))}
      </>
    );
  },
);

type FilterCategoryProps = {
  category: FILTER_CATEGORY;
  options: string[];
  selectedOptions: string[];
  onClickSearchFilter: (category: FILTER_CATEGORY, value: string) => void;
  accountType: UserType | undefined;
};

const FilterCategory = memo(
  ({
    category,
    options,
    selectedOptions,
    onClickSearchFilter,
    accountType,
  }: FilterCategoryProps) => {
    const isSelected = (value: string) =>
      (selectedOptions ?? []).includes(value);

    return (
      <PostSearchFilterToggle
        title={
          accountType === UserType.OWNER
            ? FILTER_CATEGORY_KR[category]
            : category
        }
      >
        <div className="flex flex-wrap gap-2 w-full">
          {options.map((option, index) => (
            <button
              key={`${index}_${option}`}
              onClick={() => onClickSearchFilter(category, option)}
            >
              <Tag
                value={
                  accountType === UserType.OWNER
                    ? EN_FILTER_CATEGORY_OPTIONS[option.toLowerCase()]
                    : option
                }
                padding="py-[0.375rem] px-[0.675rem]"
                isRounded={true}
                hasCheckIcon={false}
                color={
                  isSelected(option)
                    ? 'text-text-normal'
                    : 'text-text-alternative'
                }
                backgroundColor={
                  isSelected(option)
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
    );
  },
);

PostSearchFilterList.displayName = 'PostSearchFilterList';
FilterCategory.displayName = 'FilterCategory';

export default PostSearchFilterList;
