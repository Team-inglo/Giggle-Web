import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../constants/queryKey";
import axios from "axios";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
};

/*
근로 캘린더 조회
*/
const getCalendar = (year: string, month: string) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules?year=${year}&month=${month}`, {
    headers: headers,
  });
};

export const useGetCalendar = (year: string, month: string) =>
  useQuery({ queryKey: [QueryKeys.CALENDAR, year, month], queryFn: () => getCalendar(year, month) });

/*
아르바이트 리스트 조회
*/
const getPartTimeList = async () => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times`, {
    headers: headers,
  });
};

export const useGetPartTimeList = () => useQuery({ queryKey: [QueryKeys.CALENDAR], queryFn: getPartTimeList });

/*
아르바이트 상세 조회
*/
const getPartTimeDetail = async (id: number | null) => {
  if (!id) return;
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times/${id}`, {
    headers: headers,
  });
};

export const useGetPartTimeDetail = (id: number | null) =>
  useQuery({
    queryKey: [QueryKeys.CALENDAR, id],
    queryFn: () => getPartTimeDetail(id),
    enabled: id ? true : false, // id가 존재할 때만 쿼리 활성화
    retry: 3,
  });

/*
특정 아르바이트 캘린더 조회
*/
const getPartTimeCalendar = async (partTimeId: number) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules/${partTimeId}`, {
    headers: headers,
  });
};

export const useGetPartTimeCalendar = (partTimeId: number) =>
  useQuery({ queryKey: [QueryKeys.CALENDAR, partTimeId], queryFn: () => getPartTimeCalendar(partTimeId) });
