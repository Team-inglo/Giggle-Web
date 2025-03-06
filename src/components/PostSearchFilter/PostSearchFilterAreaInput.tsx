import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import ArrowIcon from '@/assets/icons/ArrowUp.tsx';
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
      <div className="w-full relative rounded bg-white border border-[#eae9f6] box-border flex flex-row items-center justify-center p-4 text-left body-2 text-text-assistive">
        <div className="flex-1 h-5 flex flex-row items-center justify-between">
          <input
            className="w-full relative leading-5 outline-none bg-white"
            placeholder={'Select Areas'}
            disabled
          />
          {/* 드롭다운 토글 버튼 */}
          <button
            onClick={() => setIsOpenAreaFilter(true)}
            className="p-0 rounded-full transition-colors"
          >
            <div
              className={`flex items-center justify-center w-5 h-6 transition-transform duration-300 rotate-180`}
            >
              <ArrowIcon isMarked={false} />
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 py-2 w-full">
        {region1Depth.map((region, index) => (
          <Tag
            key={`${region}_${index}`}
            value={formatRegionArrayToString(index)}
            padding="0.375rem 0.5rem 0.375rem 0.675rem"
            isRounded={true}
            hasCheckIcon={false}
            borderColor={'#E2E5EB'}
            backgroundColor={'#fff'}
            color="#252525"
            fontStyle="body-2"
            onDelete={() => onClickDelete(index)}
          />
        ))}
      </div>
      <p className="caption text-text-assistive">
        Multiple selection is available.
      </p>
    </PostSearchFilterToggle>
  );
};

export default PostSearchFilterAreaInput;
