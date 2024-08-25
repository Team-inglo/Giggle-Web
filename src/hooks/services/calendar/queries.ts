import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../constants/queryKey";
import axios from "axios";

/*
근로 캘린더 조회
*/
const getCalendar = (year: string, month: string) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules?year=${year}&month=${month}`);
};

export const useGetCalendar = (year: string, month: string) =>
  useQuery({ queryKey: [QueryKeys.CALENDAR, year, month], queryFn: () => getCalendar(year, month) });

/*
아르바이트 리스트 조회
*/
const getPartTimeList = async () => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times`);
};

export const useGetPartTimeList = () => useQuery({ queryKey: [QueryKeys.CALENDAR], queryFn: getPartTimeList });

/*
아르바이트 상세 조회
*/
const getPartTimeDetail = async (id: number) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/part-times/${id}`);
};

export const useGetPartTimeDetail = (id: number) => useQuery({ queryKey: [QueryKeys.CALENDAR, id], queryFn: () => getPartTimeDetail(id) });

/*
특정 아르바이트 캘린더 조회
*/
const getPartTimeCalendar = async (partTimeId: number) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules/${partTimeId}`);
};

export const useGetPartTimeCalendar = (partTimeId: number) =>
  useQuery({ queryKey: [QueryKeys.CALENDAR, partTimeId], queryFn: () => getPartTimeCalendar(partTimeId) });
