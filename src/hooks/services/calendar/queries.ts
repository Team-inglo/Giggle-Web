import { useQuery } from "@tanstack/react-query";

enum QueryKeys {
  CALENDAR = "calendar",
}

/*
근로 캘린더 조회
*/
const getCalendar = async (year: string, month: string) => {
  const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/applicants/schedules?year=${year}&month=${month}`);
  return res.json();
};

export const useGetCalendar = (year: string, month: string) =>
  useQuery({ queryKey: [QueryKeys.CALENDAR, year, month], queryFn: () => getCalendar(year, month) });
