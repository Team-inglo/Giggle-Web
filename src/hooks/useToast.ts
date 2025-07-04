import { ToastStatus, useToastStore } from '@/store/toast';

// 컴포넌트에서 전역 토스트를 간단히 호출하기 위한 래퍼
// 예) const toast = useToast(); toast.success('저장 완료');
export function useToast() {
  const show = useToastStore((s) => s.show);
  return {
    info: (msg: string) =>
      show({ toastMessage: msg, toastStatus: ToastStatus.INFO }),
    success: (msg: string) =>
      show({ toastMessage: msg, toastStatus: ToastStatus.SUCCESS }),
    error: (msg: string) =>
      show({ toastMessage: msg, toastStatus: ToastStatus.ERROR }),
    onlyText: (msg: string) =>
      show({ toastMessage: msg, toastStatus: ToastStatus.ONLYTEXT }),
  };
}
