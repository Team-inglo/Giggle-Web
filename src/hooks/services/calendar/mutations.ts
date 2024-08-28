import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ParTimeInput } from "../../../interfaces/calendar/partTime";
import axios from "axios";
import { QueryKeys } from "../../../constants/queryKey";
import { TimeScheduleList } from "../../../interfaces/calendar/totalSchedule";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
};

/*
아르바이트 생성
*/
const postPartTime = (partTime: ParTimeInput) =>
  axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times`, partTime, {
    headers: headers,
  });

export const usePostPartTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (partTime: ParTimeInput) => postPartTime(partTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CALENDAR] });
    },
  });
};

/*
아르바이트 수정
*/
const patchPartTime = (id: number, partTime: ParTimeInput) =>
  axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times${id}`, partTime, {
    headers: headers,
  });

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
const deletePartTime = (id: number) =>
  axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times${id}`, {
    headers: headers,
  });

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

type postSchedulesProp = {
  partTimeId: number;
  schedules: TimeScheduleList;
};

const postSchedules = (schedule: postSchedulesProp) =>
  axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules/${schedule.partTimeId}`, schedule.schedules, {
    headers: headers,
  });

export const usePostSchedules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schedule: postSchedulesProp) => postSchedules(schedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CALENDAR] });
    },
  });
};
