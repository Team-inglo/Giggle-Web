import ApplicationPostCard from '@/components/Application/ApplicationPostCard';
import { AppicationItemType } from '@/types/application/applicationItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import {
  useCurrentPostIdEmployeeStore,
  useCurrentPostIdStore,
} from '@/store/url';

type ApplicationCardListType = {
  applicationListData: AppicationItemType[];
  isInitialLoading: boolean;
};

const ApplicationCardList = ({
  applicationListData,
  isInitialLoading,
}: ApplicationCardListType) => {
  const navigate = useNavigate();
  const { updateCurrentPostId } = useCurrentPostIdStore();
  const { updateCurrentPostId: updateCurrentEmployeePostId } =
    useCurrentPostIdEmployeeStore();

  if (isInitialLoading) {
    return (
      <div className="mt-10 flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (applicationListData.length === 0) {
    return (
      <div className="mt-10 flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <h3 className="heading-20-semibold text-[#252525]">No results found</h3>
        <p className="body-14-regular text-[#9397A1] text-center">
          We couldn’t find any jobs matching your search. <br />
          Try adjusting your filters!
        </p>
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col gap-4 w-full px-4 pt-4 pb-24 bg-surface-secondary">
      {applicationListData.map((data) => (
        <ApplicationPostCard
          key={data.user_owner_job_posting_id}
          postData={data}
          handleClickLeftButton={() => {
            updateCurrentPostId(data.job_posting_id);
            navigate(`/post/${data.job_posting_id}`);
          }}
          leftButtonText="View Details"
          handleClickRightButton={() => {
            updateCurrentPostId(data.job_posting_id);
            updateCurrentEmployeePostId(data.user_owner_job_posting_id);
            navigate(`/application/${data.user_owner_job_posting_id}`);
          }}
          rightButtonText="Check Status"
        />
      ))}
    </section>
  );
};

export default ApplicationCardList;
