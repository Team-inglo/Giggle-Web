import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { useLocation, useParams } from 'react-router-dom';
import {
  useGetOwnerResume,
  useGetResume,
  useGetResumeDetail,
} from '@/hooks/api/useResume';

const useResumeData = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { account_type } = useUserStore();

  const getDataSourceType = (): 'applicantAccept' | 'owner' | 'user' => {
    if (account_type === UserType.OWNER) {
      if (pathname.includes('employer/applicant')) {
        return 'applicantAccept';
      }
      return 'owner';
    }
    return 'user';
  };

  const dataSourceType = getDataSourceType();

  const shouldFetchUserData = dataSourceType === 'user';
  const shouldFetchOwnerData = dataSourceType === 'owner' && id !== undefined;
  const shouldFetchEmployerData =
    dataSourceType === 'applicantAccept' && id !== undefined;

  // 데이터 페칭 훅들
  const { data: userData, isPending: userDataPending } =
    useGetResume(shouldFetchUserData);

  // 7.25 (고용주) 이력서 조회하기(인재 검색, 그 외)
  const { data: ownerData, isPending: ownerDataPending } = useGetResumeDetail(
    id as string,
    shouldFetchOwnerData,
  );

  // 7.19 (고용주) 이력서 조회하기(지원자 확인)
  const { data: employerData, isPending: employerDataPending } =
    useGetOwnerResume(id as string, shouldFetchEmployerData);

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
      case 'applicantAccept':
        return {
          data: employerData,
          isPending: employerDataPending,
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
