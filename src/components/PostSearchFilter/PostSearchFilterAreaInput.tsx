import PostSearchFilterToggle from '@/components/PostSearchFilter/PostSearchFilterToggle';
import Tag from '@/components/Common/Tag';
import ArrowIcon from '@/assets/icons/ArrowUp.tsx';
import { PostSearchFilterItemType } from '@/types/PostSearchFilter/PostSearchFilterItem';
import { memo, useEffect, useState } from 'react';
import { FILTER_CATEGORY } from '@/constants/postSearch';
import { useUserStore } from '@/store/user';
import { postSearchTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';

type PostSearchFilterAreaInputProps = {
  setIsOpenAreaFilter: (value: boolean) => void;
  filterListRegion1: string[];
  filterListRegion2: string[];
  filterListRegion3: string[];
  setFilterList: (
    value: (prev: PostSearchFilterItemType) => PostSearchFilterItemType,
  ) => void;
};

const PostSearchFilterAreaInput = memo(
  ({
    setIsOpenAreaFilter,
    filterListRegion1,
    filterListRegion2,
    filterListRegion3,
    setFilterList,
  }: PostSearchFilterAreaInputProps) => {
    const { account_type } = useUserStore();

    const [region1Depth, setRegion1Depth] = useState<string[]>([]);
    const [region2Depth, setRegion2Depth] = useState<string[]>([]);
    const [region3Depth, setRegion3Depth] = useState<string[]>([]);

    useEffect(() => {
      setRegion1Depth(filterListRegion1 ?? []);
      setRegion2Depth(filterListRegion2 ?? []);
      setRegion3Depth(filterListRegion3 ?? []);
    }, [filterListRegion1, filterListRegion2, filterListRegion3]);

    const formatRegionArrayToString = (index: number) => {
      return `${region1Depth[index]} ${region2Depth[index]} ${region3Depth[index] === 'none' ? '' : region3Depth[index]}`;
    };

    const onClickDelete = (regionIndex: number) => {
      setFilterList((prevFilterList) => {
        const updateRegion1Depth = region1Depth.filter(
          (_value, index) => index !== regionIndex,
        );
        const updateRegion2Depth = region2Depth.filter(
          (_value, index) => index !== regionIndex,
        );
        const updateRegion3Depth = region3Depth.filter(
          (_value, index) => index !== regionIndex,
        );

        return {
          ...prevFilterList,
          [FILTER_CATEGORY.REGION_1DEPTH]: updateRegion1Depth,
          [FILTER_CATEGORY.REGION_2DEPTH]: updateRegion2Depth,
          [FILTER_CATEGORY.REGION_3DEPTH]: updateRegion3Depth,
        };
      });
    };

    return (
      <PostSearchFilterToggle
        title={
          postSearchTranslation.areaInputTitle[
            isEmployerByAccountType(account_type)
          ]
        }
      >
        <div
          className="w-full relative rounded bg-white border border-[#eae9f6] box-border flex flex-row items-center justify-center p-4 text-left body-2 text-text-assistive cursor-pointer"
          onClick={() => setIsOpenAreaFilter(true)}
        >
          <div className="flex-1 h-5 flex flex-row items-center justify-between">
            <p className="w-full relative leading-5 outline-none bg-white">
              {
                postSearchTranslation.areaInputPlaceholder[
                  isEmployerByAccountType(account_type)
                ]
              }
            </p>
            {/* 드롭다운 토글 버튼 */}
            <button className="p-0 rounded-full transition-colors">
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
              padding="py-[0.375rem] pr-[0.5rem] pl-[0.675rem]"
              isRounded={true}
              hasCheckIcon={false}
              borderColor={'border-border-alternative'}
              backgroundColor={'bg-surface-base'}
              color="text-text-normal"
              fontStyle="body-2"
              onDelete={() => onClickDelete(index)}
            />
          ))}
        </div>
      </PostSearchFilterToggle>
    );
  },
);

export default PostSearchFilterAreaInput;
