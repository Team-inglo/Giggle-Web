import {
  useGetApplicationCounts,
  userGetBookmarksCounts,
} from '@/hooks/api/useProfile';
import { ApplicationCountType, BookmarkCountType } from '@/types/api/profile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationStatus = () => {
  const { data: applicationData } = useGetApplicationCounts();
  const { data: bookmarkData } = userGetBookmarksCounts();
  const navigate = useNavigate();

  const [applicationCounts, setApplicationCounts] =
    useState<ApplicationCountType>({
      application_counts: 0,
      successful_hire_counts: 0,
    });
  const [bookmarkCounts, setBookmarkCounts] = useState<BookmarkCountType>({
    book_mark_counts: 0,
  });

  useEffect(() => {
    if (applicationData?.success) {
      setApplicationCounts({
        application_counts: applicationData.data.application_counts,
        successful_hire_counts: applicationData.data.successful_hire_counts,
      });
    }
    if (bookmarkData?.success) {
      setBookmarkCounts({
        book_mark_counts: bookmarkData.data.book_mark_counts,
      });
    }
  }, [applicationData, bookmarkData]);

  const statusItems = [
    { label: 'Applications', value: applicationCounts.application_counts },
    { label: 'Hired', value: applicationCounts.successful_hire_counts },
    { label: 'Scraps', value: bookmarkCounts.book_mark_counts },
  ];

  return (
    <>
      <div className="flex divide-x divide-gray-200 items-stretch justify-center p-3 bg-white rounded-lg">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 w-full justify-center bg-white"
          >
            <span className="head-3 text-text-strong text-center">
              {item.value}
            </span>
            <span className="body-3 text-text-assistive text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4">
        <button
          className="grow w-full bg-[#FEF387] rounded-lg px-5 py-3 text-center button-2 text-text-strong"
          onClick={() => navigate('/profile/manage-resume')}
        >
          Manage your Resume
        </button>
      </div>
    </>
  );
};

export default ApplicationStatus;
