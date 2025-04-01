import { getNewestVersion } from '@/api/version';
import { RESTYPE } from '@/types/api/common';
import { VersionType } from '@/types/api/version';
import { sendReactNativeMessage } from '@/utils/reactNativeMessage';
import { useMutation } from '@tanstack/react-query';

// 0.1 최신 버전 확인하기
export const useGetNewestVersion = () => {
  const { mutate } = useMutation({
    mutationFn: getNewestVersion,
    onSuccess: (response: RESTYPE<VersionType>) => {
      if (
        !response?.data ||
        typeof response.data.major !== 'number' ||
        typeof response.data.minor !== 'number' ||
        typeof response.data.patch !== 'number'
      ) {
        console.error('유효하지 않은 버전 정보 형식입니다.', response);
        return;
      }
      const versionString = `${response.data.major}.${response.data.minor}.${response.data.patch}`;
      sendReactNativeMessage({ type: 'VERSION_CHECK', payload: versionString });
    },
    onError: (error) => {
      console.error('버전 확인 중 오류 발생:', error);
    },
  });
  return { mutate };
};
