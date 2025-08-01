import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { EmployeeResumeListItemType } from '@/types/api/resumes';
import { LoadingItem } from '@/components/Common/LoadingItem';
import {
  EmployeeCard,
  EmployeeCardEmptyState,
} from '@/components/Common/EmployeeCard';

type EmployerEmployeeCardListProps = {
  resumeData: EmployeeResumeListItemType[];
  isLoading: boolean;
  isInitialLoading: boolean;
};

const EmployerEmployeeCardList = ({
  resumeData,
  isLoading,
  isInitialLoading,
}: EmployerEmployeeCardListProps) => {
  if (isInitialLoading) {
    return (
      <div className="pt-[20vh] flex flex-col justify-center items-center">
        <LoadingPostItem />
      </div>
    );
  }

  if (resumeData?.length === 0) {
    return <EmployeeCardEmptyState />;
  }

  return (
    <>
      <main className="flex flex-col divide-y divide-surface-secondary">
        {resumeData.map((value: EmployeeResumeListItemType) => (
          <EmployeeCard cardData={value} variant="horizontal" key={value.id} />
        ))}
      </main>
      {isLoading && <LoadingItem />}
    </>
  );
};

export default EmployerEmployeeCardList;
