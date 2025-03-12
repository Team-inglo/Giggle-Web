import ApplicationCard from '@/components/Application/ApplicationCard';
import { AppicationItemType } from '@/types/application/applicationItem';

type ApplicationCardListType = {
  applicationListData: AppicationItemType[];
};

const ApplicationCardList = ({
  applicationListData,
}: ApplicationCardListType) => {
  return (
    <section className="flex flex-col gap-[1.5rem] w-full pb-[5rem]">
      {applicationListData.map((data) => (
        <ApplicationCard
          key={data.user_owner_job_posting_id}
          applicationData={data}
        />
      ))}
    </section>
  );
};

export default ApplicationCardList;
