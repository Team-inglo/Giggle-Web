import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { partTimeRecruitPostRequest } from "../../../components/EmployerRegistration/types";

/*
고용주의 아르바이트 생성
*/

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESSTOKEN}`,
};

const postRecruitPartTimeForOwner = (partTimeRecruitPostRequest: partTimeRecruitPostRequest) => axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/owners/announcements/posting`, partTimeRecruitPostRequest, {
  headers: headers,
});

export const usePostRecruitPartTime = () => {
  // const queryClient = useQueryClient();
  console.log(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/owners/announcements/posting`);

  return useMutation({
    mutationFn: (partTimeRecruitPostRequest: partTimeRecruitPostRequest) => postRecruitPartTimeForOwner(partTimeRecruitPostRequest),
    onSuccess: (response) => {
      console.log('Response:', response);  // 서버 응답 출력
    },
    onError: (error) => {
      console.error('Mutation error:', error);  // Error handling
    },
  });
};