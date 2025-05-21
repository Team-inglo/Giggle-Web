import { api } from '.';
import {
  GetApplyPostListReqType,
  GetEmployerPostListReqType,
  GetPostListReqType,
} from '@/types/api/post';
import { filterNullParams } from '@/utils/filterNullParams';

// 4.1 (게스트) 공고 리스트 조회
export const getPostListGuest = async (
  req: GetPostListReqType,
  page: number,
) => {
  const response = await api.get(`/guests/job-postings/overviews`, {
    params: { ...filterNullParams(req), page },
  });
  return response.data;
};

// 4.2 (게스트) 공고 상세 조회하기
export const getPostDetailGuest = async (id: number) => {
  const response = await api.get(`/guests/job-postings/${id}/details`);
  return response.data;
};

// 4.3 (유학생/고용주) 공고 리스트 조회
export const getPostList = async (req: GetPostListReqType, page: number) => {
  const response = await api.get(`/job-postings/overviews`, {
    params: { ...filterNullParams(req), page },
  });
  return response.data;
};

// 4.4 (유학생/고용주) 공고 상세 조회하기
export const getPostDetail = async (id: number) => {
  const response = await api.get(`/job-postings/${id}/details`);
  return response.data;
};

// 4.6 (고용주) 공고에 대한 지원자 리스트 조회
export const getApplicantList = async (
  page: number,
  id: number,
  sorting: string,
  status: string | null,
) => {
  const size = 10;
  const response = await api.get(
    `/owners/job-postings/${id}/user-owner-job-postings/users/overviews?page=${page}&size=${size}&sorting=${sorting}${!!status && `&status=${status}`}`,
  );
  return response.data;
};

// 4.7 (유학생/고용주) 공고 요약 정보 조회하기
export const getPostSummary = async (id: number) => {
  const response = await api.get(`/job-postings/${id}/summaries`);
  return response.data;
};

// 4.10 (고용주) 공고 등록하기
export const createPost = async (newPost: FormData) => {
  const response = await api.post(`/owners/job-postings`, newPost);
  return response.data;
};

// 4.10 (고용주) 공고 수정하기
export const editPost = async ({
  newPost,
  id,
}: {
  newPost: FormData;
  id: number;
}) => {
  const response = await api.put(`/owners/job-postings/${id}`, newPost);
  return response.data;
};

// 4.12 (유학생) 북마크 추가/삭제
export const putPostBookmark = async (id: number) => {
  const response = await api.put(`/users/job-postings/${id}/book-marks`);
  return response.data;
};

// 4.13 (고용주) 공고 삭제하기
export const deletePost = async (id: number) => {
  const response = await api.delete(`/owners/job-postings/${id}`);
  return response.data;
};

// 6.1 (유학생) 지원한 공고 리스트 조회하기
export const getApplyPostList = async ({
  page,
  size,
  sorting,
  status,
}: GetApplyPostListReqType) => {
  const response = await api.get(
    `/users/user-owner-job-postings/overviews?page=${page}&size=${size}&sorting=${sorting.toUpperCase()}${!!status && `&status=${status}`}`,
  );
  return response.data;
};

// 6.6 (고용주) 등록한 공고 리스트 조회하기
export const getEmployerPostList = async ({
  page,
  size,
  sorting,
}: GetEmployerPostListReqType) => {
  // TODO: 무한 스크롤 구현하기
  const response = await api.get(
    `/owners/job-postings/overviews?page=${page}&size=${size}&sorting=${sorting}`,
  );
  return response.data;
};
