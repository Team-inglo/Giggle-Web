import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ParTimeInput } from "../../../interfaces/calendar/partTime";
import axios from "axios";
import { QueryKeys } from "../../../constants/queryKey";
import { TimeScheduleList } from "../../../interfaces/calendar/totalSchedule";

/*
아르바이트 생성
*/

const postPartTime = (partTime: ParTimeInput) => axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times`, partTime);

export const usePostPartTime = (partTime: ParTimeInput) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postPartTime(partTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CALENDAR] });
    },
  });
};

/*
아르바이트 수정
*/
const patchPartTime = (id: number, partTime: ParTimeInput) =>
  axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times${id}`, partTime);

export const usePatchPartTime = (id: number, partTime: ParTimeInput) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchPartTime(id, partTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CALENDAR] });
    },
  });
};

/*
아르바이트 삭제
*/
const deletePartTime = (id: number) => axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times${id}`);

export const useDeletePartTime = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePartTime(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CALENDAR] });
    },
  });
};

/*
아르바이트 스케쥴 편집
*/
const postSchedules = (partTimeId: number, schedules: TimeScheduleList) =>
  axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules/${partTimeId}`, schedules);

export const usePostSchedules = (partTimeId: number, schedules: TimeScheduleList) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postSchedules(partTimeId, schedules),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CALENDAR] });
    },
  });
};
