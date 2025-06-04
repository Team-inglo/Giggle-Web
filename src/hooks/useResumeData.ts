import { UserType } from '@/constants/user';
import { useCurrentApplicantIdStore } from '@/store/url';
import { useUserStore } from '@/store/user';
import { useLocation, useParams } from 'react-router-dom';
import {
  useGetApplicantResume,
  useGetResume,
  useGetResumeDetail,
} from './api/useResume';

const useResumeData = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { currentApplicantId } = useCurrentApplicantIdStore();
  const { account_type } = useUserStore();

  const getDataSourceType = ():
    | 'employerSearch'
    | 'ownerApplicant'
    | 'user' => {
    if (pathname === '/employer/search' && id) {
      return 'employerSearch';
    }

    if (account_type === UserType.OWNER) {
      return 'ownerApplicant';
    }

    return 'user';
  };

  const dataSourceType = getDataSourceType();

  const shouldFetchUserData = dataSourceType === 'user';
  const shouldFetchOwnerData =
    dataSourceType === 'ownerApplicant' && !isNaN(Number(currentApplicantId));
  const shouldFetchOwnerResumeData = dataSourceType === 'employerSearch';

  // 데이터 페칭 훅들
  const { data: userData, isPending: userDataPending } =
    useGetResume(shouldFetchUserData);

  const { data: ownerData, isPending: ownerDataPending } =
    useGetApplicantResume(Number(currentApplicantId), shouldFetchOwnerData);

  const { data: ownerResumeData, isPending: ownerResumeDataPending } =
    useGetResumeDetail(id ?? '', shouldFetchOwnerResumeData);

  const getActiveData = () => {
    switch (dataSourceType) {
      case 'employerSearch':
        return {
          data: ownerResumeData,
          isPending: ownerResumeDataPending,
        };
      case 'ownerApplicant':
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
