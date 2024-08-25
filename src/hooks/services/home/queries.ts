import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../constants/queryKey";

/*
홈 조회
*/
const getHome = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/users`);
  return res.json();
};

export const useGetHome = () => useQuery({ queryKey: [QueryKeys.HOME], queryFn: getHome });
