import { CAREER_CATEGORY } from '@/constants/postSearch';

export type CareerListItemType = {
  id: number;
  title: string;
  career_category?: keyof typeof CAREER_CATEGORY;
  visa?: string[] | null;
  host_name?: string; // 주최
  organizer_name?: string; // 주관
  left_days?: string; // 남은 날짜
  status?: string;
  recruitment_start_date?: string;
  recruitment_end_date?: string;
  created_at?: string;
  is_book_marked?: boolean; // 유학생인 경우
};

export type GetCareerListReqType = {
  size: number;
  search?: string | null;
  sorting?: string | null;
  category?: string | null;
};

export type CareerDetailItemType = {
  img_urls: string[] | null;
  is_book_marked?: boolean; // 유학생인 경우
  title: string;
  career_category?: keyof typeof CAREER_CATEGORY;
  host_name?: string; // 주최
  organizer_name?: string; // 주관
  address?: string;
  recruitment_start_date?: string;
  recruitment_end_date?: string;
  reward?: number;
  visa?: string[];
  recruitment_number?: number;
  education?: string;
  preferred_conditions?: string;
  details?: string;
  application_url: string;
};

// 14.3 (유학생/고용주) 커리어 리스트 조회 Response
export type GetCareerListResponse = {
  data: {
    career_list: CareerListItemType[];
    has_next: boolean;
  };
};
