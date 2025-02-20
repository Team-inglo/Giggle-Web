import { ApplicationDetailItemType } from '@/types/application/applicationItem';
import { formatMoney } from '@/utils/formatMoney';

type ApplicationDetailCardProps = {
  applicationData: ApplicationDetailItemType;
};

const ApplicationDetailInfo = ({
  applicationData,
}: ApplicationDetailCardProps) => {
  return (
    <section className="w-full flex gap-[0.25rem]">
      <div className="flex-1 flex flex-col gap-[0.25rem]">
        <div className="px-[0.75rem] py-[0.5rem] bg-[#F4F4F9] rounded-[0.5rem] text-center">
          <h5 className="pb-[0.25rem] caption text-black">Hourly wage</h5>
          <p className="caption text-[#656565]">
            {formatMoney(applicationData.job_info.hourly_rate)} KRW
          </p>
        </div>
        <div className="px-[0.75rem] py-[0.5rem] bg-[#F4F4F9] rounded-[0.5rem] text-center">
          <h5 className="pb-[0.25rem] caption text-black">Working Period</h5>
          <p className="caption text-[#656565]">
            {applicationData.job_info.work_period
              .replace(/_/g, ' ')
              .toLowerCase()}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-[0.75rem] py-[0.5rem] bg-[#F4F4F9] rounded-[0.5rem]">
        <h5 className="pb-[0.5rem] caption text-black">Working days/Hours</h5>
        {applicationData.job_info.work_day_times?.map((data, index) => (
          <p
            className="caption text-[#656565]"
            key={`${index}_${data.day_of_week}`}
          >
            {data.day_of_week.slice(0, 3)} {data.work_start_time}-
            {data.work_end_time}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ApplicationDetailInfo;
