import Tag from '@/components/Common/Tag';
import LocationIcon from '@/assets/icons/LocationIcon.svg?react';
import ClockIcon from '@/assets/icons/ClockIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import TopRightArrowIcons from '@/assets/icons/Home/TopRightArrowIcon.svg?react';
import { PostSummaryItemType } from '@/types/post/postSummaryItem';

import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '@/utils/formatMoney';

type EmployerApplicantListTitlePropsType = {
  postData: PostSummaryItemType;
};

const EmployerApplicantListTitle = ({
  postData,
}: EmployerApplicantListTitlePropsType) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section className="flex flex-col items-center gap-[0.25rem] w-full pt-[0.5rem]">
      {postData?.icon_img_url ? (
        <div
          className="w-[5.125rem] h-[5.125rem] rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${postData.icon_img_url})`,
          }}
        ></div>
      ) : (
        <div className="w-[5.125rem] h-[5.125rem] rounded-full bg-[#F4F4F9]"></div>
      )}
      <div className="flex flex-col gap-[0.5rem] text-center">
        <p className="button-2 text-[#656565]">{postData.company_name}</p>
        <h2 className="text-[#33384B] font-bold text-lg">{postData.title}</h2>
      </div>
      <div className="flex gap-[0.25rem] my-[0.5rem]">
        <Tag
          value={postData.tags.is_recruiting ? 'Opening' : 'Closed'}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption"
        />
        <Tag
          value={postData.tags.job_category.replace(/_/g, ' ').toLowerCase()}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption"
        />
        <Tag
          value={postData.tags.visa.replace(/_/g, '-')}
          padding="0.375rem 0.75rem"
          isRounded={true}
          hasCheckIcon={false}
          backgroundColor="#1E1926"
          color="#F4F4F9"
          fontStyle="caption"
        />
      </div>
      <div className="grid grid-cols-2 gap-[0.5rem] py-[0.375rem] px-[1.5rem]">
        <div className="flex justify-end gap-[0.5rem] px-[0.5rem]">
          <LocationIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">{postData.summaries.address}</p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <ClockIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            {postData.summaries.work_days_per_week} days a week
          </p>
        </div>
        <div className="flex justify-end gap-[0.5rem] px-[0.5rem]">
          <MoneyIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            ${formatMoney(postData.summaries.hourly_rate)}
          </p>
        </div>
        <div className="flex gap-[0.5rem] px-[0.5rem]">
          <ClockIcon className="min-w-[0.5rem]" />
          <p className="text-[#464646] caption">
            {postData.summaries.work_period.replace(/_/g, ' ').toLowerCase()}
          </p>
        </div>
      </div>
      <div className="w-full px-[1.5rem] py-[0.5rem] flex justify-end items-center gap-[0.625rem] bg-[#FFFFFF3D]">
        <p className="caption text-black">See my post</p>
        <button
          className="px-[0.625rem] py-[0.125rem] bg-[#1B1B1B] rounded-[1.313rem]"
          onClick={() => navigate(`/employer/post/${id}`)}
        >
          <TopRightArrowIcons />
        </button>
      </div>
    </section>
  );
};

export default EmployerApplicantListTitle;
