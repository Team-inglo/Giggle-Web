import { useEmailTryCountStore } from '@/store/signup';
import {
  useCurrentApplicantIdStore,
  useCurrentPostIdEmployeeStore,
  useCurrentPostIdStore,
} from '@/store/url';
import { useUserStore } from '@/store/user';

// store 전역 변수 초기화
export const clearAllStore = () => {
  useUserStore.persist.clearStorage();
  useEmailTryCountStore.persist.clearStorage();
  useCurrentPostIdStore.persist.clearStorage();
  useCurrentApplicantIdStore.persist.clearStorage();
  useCurrentPostIdEmployeeStore.persist.clearStorage();
};
