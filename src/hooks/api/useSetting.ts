import {
  patchNotificationAllowed,
  patchUserLanguage,
} from '@/api/mypage';
import { smartNavigate } from '@/utils/application';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 3.7 (유학생/고용주) 알람 설정 변경하기
export const usePatchNotificationAllowed = () => {
  return useMutation({
    mutationFn: patchNotificationAllowed,
    onError: (error) => {
      console.error('알람 설정 변경 실패', error);
    },
  });
};

// 3.8 (유학생) 앱 내 언어 수정
export const usePatchUserLanguage = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: patchUserLanguage,
    onSuccess: () => {
      smartNavigate(navigate, '/profile');
    },
    onError: (error) => {
      console.error('언어 수정 실패', error);
    },
  });
};