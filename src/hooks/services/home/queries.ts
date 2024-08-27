import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../constants/queryKey";
import axios from "axios";

/*
홈 조회
*/
const getHome = async () => {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
  };

  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/users`, {
    headers: headers,
  });
};

export const useGetHome = () => useQuery({ queryKey: [QueryKeys.HOME], queryFn: getHome });
