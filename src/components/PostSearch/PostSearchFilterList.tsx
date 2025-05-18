import Tag from '@/components/Common/Tag';
import {
  EN_FILTER_CATEGORY_OPTIONS,
  FILTER_CATEGORY,
} from '@/constants/postSearch';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';

type TagType = {
  category: string;
  value: string;
};

type PostSearchFilterListProps = {
  filterList: PostSearchFilterItemType;
  handleUpdateFilterList: (value: PostSearchFilterItemType) => void;
};

const PostSearchFilterList = ({
  filterList,
  handleUpdateFilterList,
}: PostSearchFilterListProps) => {
  const { account_type } = useUserStore();

  const formatFilterListToTag = () => {
    const excludedCategories = [
      FILTER_CATEGORY.REGION_1DEPTH,
      FILTER_CATEGORY.REGION_2DEPTH,
      FILTER_CATEGORY.REGION_3DEPTH,
    ];

    const filteredValues = Object.entries(filterList)
      .filter(([key]) => !excludedCategories.includes(key as FILTER_CATEGORY))
      .flatMap(([key, values]) =>
        values.map((value) => ({
          category: key,
          value,
        })),
      );

    const region1Depth = filterList[FILTER_CATEGORY.REGION_1DEPTH];
    const region2Depth = filterList[FILTER_CATEGORY.REGION_2DEPTH];
    const region3Depth = filterList[FILTER_CATEGORY.REGION_3DEPTH];

    const filteredRegions = region1Depth.map((region, index) => {
      return {
        category: 'region',
        value: `${region} ${region2Depth[index]} ${region3Depth[index] === 'none' ? '' : region3Depth[index]}`,
      };
    });

    const tagList = [...filteredValues, ...filteredRegions];
    return tagList;
  };

  const updateRegionFilter = (
    category: FILTER_CATEGORY,
    regionIndex: number,
  ) => {
    const newRegionFilter = filterList[category].filter(
      (_value, index) => index !== regionIndex,
    );

    return newRegionFilter;
  };

  const findFilterIndex = (
    region1: string,
    region2: string,
    region3: string,
  ) => {
    for (let i = 0; i < filterList[FILTER_CATEGORY.REGION_1DEPTH].length; i++) {
      if (
        region1 === filterList[FILTER_CATEGORY.REGION_1DEPTH][i] &&
        region2 === filterList[FILTER_CATEGORY.REGION_2DEPTH][i] &&
        (region3 === filterList[FILTER_CATEGORY.REGION_3DEPTH][i] ||
          region2 === '전체')
      )
        return i;
    }
    return -1;
  };

  const onDeleteFilter = (tag: TagType) => {
    if (tag.category === 'region') {
      const [region1, region2, region3] = tag.value.split(' ');

      const regionIndex = findFilterIndex(region1, region2, region3);

      if (regionIndex === -1) return;

      const newFilterList = {
        ...filterList,
        [FILTER_CATEGORY.REGION_1DEPTH]: updateRegionFilter(
          FILTER_CATEGORY.REGION_1DEPTH,
          regionIndex,
        ),
        [FILTER_CATEGORY.REGION_2DEPTH]: updateRegionFilter(
          FILTER_CATEGORY.REGION_2DEPTH,
          regionIndex,
        ),
        [FILTER_CATEGORY.REGION_3DEPTH]: updateRegionFilter(
          FILTER_CATEGORY.REGION_3DEPTH,
          regionIndex,
        ),
      };
      handleUpdateFilterList(newFilterList);
    } else {
      const newFilterList = {
        ...filterList,
        [tag.category]: filterList[tag.category as FILTER_CATEGORY].filter(
          (value) => value !== tag.value,
        ),
      };
      handleUpdateFilterList(newFilterList);
    }
  };

  return (
    <section className="flex-1 w-full py-2">
      <div className="w-full min-h-8 pl-4 pr-14 flex items-center gap-1 overflow-x-scroll whitespace-nowrap no-scrollbar">
        {formatFilterListToTag()?.map((filter, index) => (
          <Tag
            key={`${index}_${filter.category}`}
            value={
              account_type === UserType.OWNER
                ? EN_FILTER_CATEGORY_OPTIONS[filter.value.toLowerCase()] ||
                  filter.value
                : filter.value
            }
            onDelete={() => onDeleteFilter(filter)}
            padding="py-[0.375rem] pr-[0.5rem] pl-[0.675rem]"
            isRounded={true}
            hasCheckIcon={false}
            borderColor={'border-border-alternative'}
            backgroundColor={'bg-surface-base'}
            color="text-text-normal"
            fontStyle="body-2"
          />
        ))}
      </div>
    </section>
  );
};

export default PostSearchFilterList;
