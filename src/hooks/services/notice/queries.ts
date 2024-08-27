import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../constants/queryKey";
import axios from "axios";
import { NoticeListFilter } from "../../../interfaces/notice/noticeListFilter";

/*
아르바이트 공고 목록 검색하기
*/

const getNoticeList = (userId: number, jobType: string, noticeListFilter: NoticeListFilter) => {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
  };

  const params = { ...noticeListFilter, region: noticeListFilter.region?.join(","), userId: userId, jobType: jobType };

  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/users/announcements`, {
    params: params,
    headers: headers,
  });
};

export const useGetNoticeList = (userId: number, jobType: string, noticeListFilter: NoticeListFilter) =>
  useQuery({
    queryKey: [QueryKeys.NOTICE, userId, jobType, noticeListFilter],
    queryFn: () => getNoticeList(userId, jobType, noticeListFilter),
  });
