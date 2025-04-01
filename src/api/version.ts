import { RESTYPE } from '@/types/api/common';
import { apiWithoutAuth } from '@/api/index.ts';
import { VersionType } from '@/types/api/version';

// 0.1 최신 버전 확인하기
export const getNewestVersion = async (): Promise<RESTYPE<VersionType>> => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const deviceOS = isIOS ? 'IOS' : isAndroid ? 'ANDROID' : 'OTHER';
  const response = await apiWithoutAuth.get(`/versions?os=${deviceOS}`);
  return response.data;
};
