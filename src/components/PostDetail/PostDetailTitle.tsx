import Tag from '@/components/Common/Tag';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import { PostDetailItemType } from '@/types/postDetail/postDetailItem';
import { formatMoney } from '@/utils/formatMoney';

type PostDetailTitleProps = {
  postDetailData: PostDetailItemType;
};

const PostDetailTitle = ({ postDetailData }: PostDetailTitleProps) => {
  return (
    <section className="flex flex-col items-center gap-[1rem] w-full mt-[-2.5rem] pt-[2.5rem] pb-[2rem] px-[1.5rem] rounded-t-[2.5rem] shadow-bottomSheetShadow bg-white">
      {postDetailData?.icon_img_url ? (
        <div
          className="w-[5.125rem] h-[5.125rem] rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${postDetailData.icon_img_url})` }}
        ></div>
      ) : (
        <div className="w-[5.125rem] h-[5.125rem] rounded-full bg-[#F4F4F9]"></div>
      )}
      <div className="flex flex-col gap-[0.5rem] text-center">
        <p className="button-2 text-[#656565]">{postDetailData.company_name}</p>
        <h2 className="text-[#33384B] font-bold text-lg">
          {postDetailData.title}
        </h2>
      </div>
      <div className="flex gap-[0.25rem]">
        <Tag
          value={postDetailData.tags.is_recruiting ? 'Opening' : 'Closed'}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption"
        />
        <Tag
          value={postDetailData.tags.job_category
            .replace(/_/g, ' ')
            .toLowerCase()}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption"
        />
        <Tag
          value={postDetailData.tags.visa.replace(/_/g, '-')}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption"
        />
      </div>
      <div className="grid grid-cols-2 gap-[0.5rem] py-[0.375rem]">
        <div className="flex justify-end gap-[0.5rem] px-[0.5rem]">
          <LocationIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            {postDetailData.company_information.company_address}
          </p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <ClockIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            {postDetailData.summaries.work_days_per_week}
          </p>
        </div>
        <div className="flex justify-end gap-[0.5rem] px-[0.5rem]">
          <MoneyIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            ${formatMoney(postDetailData.summaries.hourly_rate)}
          </p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <ClockIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            {postDetailData.summaries.work_period
              .replace(/_/g, ' ')
              .toLowerCase()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PostDetailTitle;
