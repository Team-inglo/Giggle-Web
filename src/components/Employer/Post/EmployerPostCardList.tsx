import { KoAscendingSortType } from '@/types/common/sort';
import EmployerPostCard from '@/components/Employer/Post/EmployerPostCard';
import { useEffect } from 'react';
import { useGetEmployerPostList } from '@/hooks/api/usePost';
import { MATCH_KO_EN_ASCENDING_SORT } from '@/constants/sort';
import { EmployerPostItemType } from '@/types/post/employerPostItem';

type EmployerPostCardListProps = {
  selectedSort: KoAscendingSortType;
};

const EmployerPostCardList = ({ selectedSort }: EmployerPostCardListProps) => {
  const {
    data: postListData,
    isError,
    refetch,
  } = useGetEmployerPostList(MATCH_KO_EN_ASCENDING_SORT[selectedSort]);

  useEffect(() => {
    refetch();
  }, [selectedSort, refetch]);

  if (isError) return <></>;
  return (
    <>
      {postListData?.data?.job_posting_list?.map(
        (data: EmployerPostItemType) => (
          <EmployerPostCard key={data.id} postData={data} />
        ),
      )}
    </>
  );
};

export default EmployerPostCardList;
