import {
  useGetApplicationCounts,
  userGetBookmarksCounts,
} from '@/hooks/api/useProfile';
import { ApplicationCountType, BookmarkCountType } from '@/types/api/profile';
import { useEffect, useState } from 'react';

const ApplicationStatus = () => {
  const { data: applcationData } = useGetApplicationCounts();
  const { data: bookmarkData } = userGetBookmarksCounts();

  const [applicationCounts, setApplicationCounts] =
    useState<ApplicationCountType>({
      application_counts: 0,
      successful_hire_counts: 0,
    });
  const [bookmarkCounts, setBookmarkCounts] = useState<BookmarkCountType>({
    book_mark_counts: 0,
  });

  useEffect(() => {
    if (applcationData?.success) {
      setApplicationCounts({
        application_counts: applcationData.data.application_counts,
        successful_hire_counts: applcationData.data.successful_hire_counts,
      });
    }
    if (bookmarkData?.success) {
      setBookmarkCounts({
        book_mark_counts: bookmarkData.data.book_mark_counts,
      });
    }
  }, [applcationData, bookmarkData]);

  return (
    <div className="flex gap-2 items-stretch justify-center p-4 bg-white rounded-lg">
      <div className="flex flex-col justify-between w-full p-3 bg-[#F4F4F9] rounded-lg">
        <div className="body-3 text-[#1E1926] text-center break-all">
          Applications
        </div>
        <div className="head-3 text-[#1E1926] text-center">
          {applicationCounts.application_counts}
        </div>
      </div>
      <div className="flex flex-col justify-between w-full gap-3 p-3 bg-[#F4F4F9] rounded-lg">
        <div className="body-3 text-[#1E1926] text-center break-all">Hired</div>
        <div className="head-3 text-[#1E1926] text-center">
          {applicationCounts.successful_hire_counts}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 w-full p-3 bg-[#F4F4F9] rounded-lg">
        <div className="body-3 text-[#1E1926] text-center break-all">
          Scraps
        </div>
        <div className="head-3 text-[#1E1926] text-center">
          {bookmarkCounts.book_mark_counts}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
