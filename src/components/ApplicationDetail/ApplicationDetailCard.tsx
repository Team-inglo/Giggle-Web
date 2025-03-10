import { ApplicationDetailItemType } from '@/types/application/applicationItem';

type ApplicationDetailCardProps = {
  applicationData: ApplicationDetailItemType;
};

const ApplicationDetailCard = ({
  applicationData,
}: ApplicationDetailCardProps) => {
  return (
    <article className="w-full border-[0.031rem] border-[#1E19263D] rounded-[1.125rem]">
      <div className="flex flex-col gap-[1.25rem] w-full px-[1.5rem] pt-[1.5rem] pb-[1rem]">
        <div className="flex gap-[0.75rem]">
          {applicationData?.icon_img_url ? (
            <div
              className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-cover"
              style={{
                backgroundImage: `url(${applicationData.icon_img_url})`,
              }}
            ></div>
          ) : (
            <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] bg-[#F4F4F9]"></div>
          )}
          <div>
            <h3 className="pb-[0.25rem] head-3 text-[#1E1926]">
              {applicationData.title}
            </h3>
            <p className="body-3 text-[#464646]">
              {applicationData.address_name}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-end pt-[0.25rem]">
          <p className="body-3 text-[#656565]">
            {applicationData.duration_of_days} Days After
          </p>
        </div>
      </div>
    </article>
  );
};

export default ApplicationDetailCard;
