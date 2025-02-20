import TopRightArrowIcons from '@/assets/icons/Home/TopRightArrowIcon.svg?react';
import { useCurrentPostIdEmployeeStore } from '@/store/url';
import { OngoingInterviewItemType } from '@/types/home/ongoingInterviewItem';
import { useNavigate } from 'react-router-dom';

type HomeApplicationCardProps = {
  applicationData: OngoingInterviewItemType;
};

const HomeApplicationCard = ({ applicationData }: HomeApplicationCardProps) => {
  const navigate = useNavigate();
  const { updateCurrentPostId } = useCurrentPostIdEmployeeStore();

  const goToApplicationDetailPage = () => {
    updateCurrentPostId(applicationData.id);
    navigate(`/application/${applicationData.id}`);
  };

  return (
    <article className="flex flex-col gap-2 px-5 pt-3 pb-5 min-w-fit bg-white rounded-2xl shadow-cardShadow">
      <div className="w-fit px-[0.438rem] py-[0.125rem] caption bg-[#1E1926] rounded-sm text-[#F4F4F9]">
        Under the Review
      </div>
      <div className="w-full flex gap-4 items-center">
        {applicationData?.icon_img_url ? (
          <div
            className="w-8 min-w-8 h-8 rounded-lg bg-cover bg-[#F4F4F9]"
            style={{
              backgroundImage: `url(${applicationData.icon_img_url})`,
            }}
          ></div>
        ) : (
          <div className="w-8 min-w-8 h-8 rounded-lg bg-[#F4F4F9]"></div>
        )}
        <div className="flex-1">
          <h5 className="pb-[0.125rem] button-2 text-[#171719]">
            {applicationData.title}
          </h5>
          <p className="caption text-[#BDBDBD]">
            {applicationData.address_name}
          </p>
        </div>
        <button
          className="px-[0.75rem] py-[0.25rem] bg-[#1B1B1B] rounded-[1.313rem]"
          onClick={goToApplicationDetailPage}
        >
          <TopRightArrowIcons />
        </button>
      </div>
    </article>
  );
};

export default HomeApplicationCard;
