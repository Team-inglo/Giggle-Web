import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { EmployeeResumeListItemType } from '@/types/api/resumes';
import { LoadingItem } from '@/components/Common/LoadingItem';
import {
  EmployeeCard,
  EmployeeCardEmptyState,
} from '@/components/Common/EmployeeCard';

type EmployerEmployeeCardListProps = {
  title?: string;
  resumeData: EmployeeResumeListItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
  onSeeMoreClick?: () => void;
};

const HomeEmployeeCardList = ({
  title,
  resumeData,
  isLoading,
  isInitialLoading,
  onSeeMoreClick,
}: EmployerEmployeeCardListProps) => {
  if (isInitialLoading) {
    return (
      <div className="pt-[20vh] flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (!resumeData || resumeData.length === 0) {
    return <EmployeeCardEmptyState />;
  }

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <div className="flex items-center justify-between py-1 px-4">
          <h3 className="text-text-strong heading-18-semibold">{title}</h3>
          {onSeeMoreClick && (
            <button
              className="caption-12-regular text-text-alternative"
              onClick={onSeeMoreClick}
            >
              더보기
            </button>
          )}
        </div>
      )}

      <div className="flex gap-2 px-4 overflow-x-scroll whitespace-nowrap no-scrollbar">
        {resumeData.map((value) => (
          <EmployeeCard key={value.id} cardData={value} variant="vertical" />
        ))}
      </div>

      {isLoading && <LoadingItem />}
    </div>
  );
};

export default HomeEmployeeCardList;
