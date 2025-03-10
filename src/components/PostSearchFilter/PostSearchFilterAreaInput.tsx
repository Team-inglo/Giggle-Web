import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import SearchIcon from '@/assets/icons/MagnifyGlassIcon.svg?react';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { useEffect, useState } from 'react';
import { FILTER_CATEGORY } from '@/constants/postSearch';

type PostSearchFilterAreaInputProps = {
  setIsOpenAreaFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterList: PostSearchFilterItemType;
  setFilterList: React.Dispatch<React.SetStateAction<PostSearchFilterItemType>>;
};

const PostSearchFilterAreaInput = ({
  setIsOpenAreaFilter,
  filterList,
  setFilterList,
}: PostSearchFilterAreaInputProps) => {
  const [region1Depth, setRegion1Depth] = useState<string[]>([]);
  const [region2Depth, setRegion2Depth] = useState<string[]>([]);
  const [region3Depth, setRegion3Depth] = useState<string[]>([]);

  useEffect(() => {
    const region1Depth = filterList[FILTER_CATEGORY.REGION_1DEPTH];
    const region2Depth = filterList[FILTER_CATEGORY.REGION_2DEPTH];
    const region3Depth = filterList[FILTER_CATEGORY.REGION_3DEPTH];

    setRegion1Depth(region1Depth ?? []);
    setRegion2Depth(region2Depth ?? []);
    setRegion3Depth(region3Depth ?? []);
  }, [filterList]);

  const formatRegionArrayToString = (index: number) => {
    return `${region1Depth[index]} ${region2Depth[index]} ${region3Depth[index] === 'none' ? '' : region3Depth[index]}`;
  };

  const onClickDelete = (regionIndex: number) => {
    const updatedFilterList = {
      ...filterList,
      [FILTER_CATEGORY.REGION_1DEPTH]: region1Depth.filter(
        (_value, index) => index !== regionIndex,
      ),
      [FILTER_CATEGORY.REGION_2DEPTH]: region2Depth.filter(
        (_value, index) => index !== regionIndex,
      ),
      [FILTER_CATEGORY.REGION_3DEPTH]: region3Depth.filter(
        (_value, index) => index !== regionIndex,
      ),
    };
    setFilterList(updatedFilterList);
  };

  return (
    <PostSearchFilterToggle title={'Select Areas'}>
      <div
        className={`w-full flex gap-2 items-center justify-between text-left text-sm font-[Pretendard] border rounded-xl border-[#BDBDBD] bg-white py-[0.625rem] pl-4 pr-[14px] mb-[0.5rem]`}
        onClick={() => setIsOpenAreaFilter(true)}
      >
        <SearchIcon />
        <input
          placeholder={'Select Area'}
          className={
            'w-full outline-none placeholder:text-[var(--input-color)]'
          }
          readOnly
        />
      </div>
      <div className="flex flex-wrap gap-[0.5rem] px-[0.5rem] w-full">
        {region1Depth.map((region, index) => (
          <Tag
            key={`${region}_${index}`}
            value={formatRegionArrayToString(index)}
            padding="0.313rem 0.625rem 0.313rem 0.75rem"
            isRounded={true}
            hasCheckIcon={false}
            backgroundColor={'#FEF387'}
            color="#1E1926"
            fontStyle="body-3"
            onDelete={() => onClickDelete(index)}
          />
        ))}
      </div>
    </PostSearchFilterToggle>
  );
};

export default PostSearchFilterAreaInput;
