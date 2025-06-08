import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { useParams } from 'react-router-dom';
import { useGetResume, useGetResumeDetail } from '@/hooks/api/useResume';

const useResumeData = () => {
  const { id } = useParams();

  const { account_type } = useUserStore();

  const getDataSourceType = (): 'employerSearch' | 'owner' | 'user' => {
    if (account_type === UserType.OWNER) {
      return 'owner';
    }
    return 'user';
  };

  const dataSourceType = getDataSourceType();

  const shouldFetchUserData = dataSourceType === 'user';
  const shouldFetchOwnerData = dataSourceType === 'owner' && id !== undefined;

  // 데이터 페칭 훅들
  const { data: userData, isPending: userDataPending } =
    useGetResume(shouldFetchUserData);

  const { data: ownerData, isPending: ownerDataPending } = useGetResumeDetail(
    id as string,
    shouldFetchOwnerData,
  );

  const getActiveData = () => {
    switch (dataSourceType) {
      case 'owner':
        return {
          data: ownerData,
          isPending: ownerDataPending,
        };
      case 'user':
      default:
        return {
          data: userData,
          isPending: userDataPending,
        };
    }
  };

  const { data, isPending } = getActiveData();

  return {
    data,
    isPending,
    dataSourceType,
  };
};

export default useResumeData;
