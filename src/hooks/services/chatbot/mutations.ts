/*
아르바이트 생성
*/

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ChatBody = {
  userId: number;
  prompt: string;
};

const postChat = (chat: ChatBody) => {
  const body = {
    user_id: chat.userId.toString(),
    prompt: chat.prompt,
  };

  return axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/chatbot`, body);
};

export const usePostChat = () => {
  return useMutation({
    mutationFn: (chat: ChatBody) => postChat(chat),
  });
};
