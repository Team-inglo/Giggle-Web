import { CAREER_CATEGORY } from '@/constants/postSearch';

export type CareerListItemType = {
  id: number;
  title: string;
  career_category: keyof typeof CAREER_CATEGORY;
  visa: string[];
  host_name: string; // 주최
  organizer_name: string; // 주관
  left_days: string; // 남은 날짜
  status: string;
  recruitment_start_date: string;
  recruitment_end_date: string;
  created_at: string;
  is_book_marked?: boolean; // 유학생인 경우
};

export type GetCareerListReqType = {
  size: number;
  search?: string | null;
  sorting?: string | null;
  category?: string | null;
};
