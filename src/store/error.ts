import axios from 'axios';
import { create } from 'zustand';

type ErrorStore = {
  isOpenServerErrorBottomSheet: boolean;
  isOpenErrorBottomSheet: boolean;
  errorMessage: string;
  setIsOpenServerErrorBottomSheet: (isOpen: boolean) => void;
  setIsOpenErrorBottomSheet: (isOpen: boolean) => void;
  openErrorBottomSheet: (error: unknown) => void;
};

export const useErrorStore = create<ErrorStore>((set) => ({
  isOpenServerErrorBottomSheet: false,
  isOpenErrorBottomSheet: false,
  errorMessage: '',
  setIsOpenServerErrorBottomSheet: (isOpen) =>
    set(() => ({ isOpenServerErrorBottomSheet: isOpen })),
  setIsOpenErrorBottomSheet: (isOpen) =>
    set(() => ({ isOpenErrorBottomSheet: isOpen })),
  openErrorBottomSheet: (error) => {
    if (!axios.isAxiosError(error)) return;

    if (error.response?.status === 500 || error.response?.status === 408) {
      set({ isOpenServerErrorBottomSheet: true });
    } else if (error.response?.status !== 401) {
      set({
        isOpenErrorBottomSheet: true,
        errorMessage: error.response?.data?.error?.message ?? '',
      });
    }
  },
}));
