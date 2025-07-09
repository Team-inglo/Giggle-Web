import { create } from 'zustand';

export enum ToastStatus {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  ONLYTEXT = 'ONLYTEXT',
}

type ToastStore = {
  isToastOpen: boolean;
  toastMessage: string;
  toastStatus: ToastStatus;
  show: (params: ShowToastParams) => void;
  close: () => void;
};

interface ShowToastParams {
  toastMessage: string;
  toastStatus?: ToastStatus;
}

export const useToastStore = create<ToastStore>((set) => ({
  isToastOpen: false, // UI 에서 현재 토스트가 열려있는지 여부
  toastMessage: '',   // 화면에 표시할 메시지, SUCCESS / INFO / ERROR / ONLYTEXT 중 하나
  toastStatus: ToastStatus.ONLYTEXT, // toastStatus 기본값은 ONLYTEXT (아이콘 없이 텍스트만)
  // 토스트 표시 메서드
  show: ({
    toastMessage,
    toastStatus = ToastStatus.ONLYTEXT,
  }: ShowToastParams) => {
    set({
      isToastOpen: true,
      toastMessage,
      toastStatus,
    });
  },
  // 토스트 닫기 메서드
  close: () => {
    set({
      isToastOpen: false,
      toastMessage: '',
      toastStatus: ToastStatus.ONLYTEXT,
    });
  },
}));
