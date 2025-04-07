import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentPostIdStore = {
  currentPostId: number | null;
  updateCurrentPostId: (id: number) => void;
};

export const useCurrentPostIdStore = create(
  persist<CurrentPostIdStore>(
    (set) => ({
      currentPostId: null,
      updateCurrentPostId: (newId: number) =>
        set(() => ({ currentPostId: newId })),
    }),
    {
      name: 'currentPostIdStore',
    },
  ),
);

type CurrentApplicantIdStore = {
  currentApplicantId: number | null;
  updateCurrentApplicantId: (id: number) => void;
};

export const useCurrentApplicantIdStore = create(
  persist<CurrentApplicantIdStore>(
    (set) => ({
      currentApplicantId: null,
      updateCurrentApplicantId: (newId: number) =>
        set(() => ({ currentApplicantId: newId })),
    }),
    {
      name: 'currentApplicantIdStore',
    },
  ),
);

type CurrentPostIdStoreEmployee = {
  currentPostId: number | null;
  updateCurrentPostId: (id: number) => void;
};

export const useCurrentPostIdEmployeeStore = create(
  persist<CurrentPostIdStoreEmployee>(
    (set) => ({
      currentPostId: null,
      updateCurrentPostId: (newId: number) =>
        set(() => ({ currentPostId: newId })),
    }),
    {
      name: 'useCurrentPostIdEmployeeStore',
    },
  ),
);
