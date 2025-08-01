import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePutScrapResume } from '@/hooks/api/useResume';
import { EmployeeResumeListItemType } from '@/types/api/resumes';

export const useEmployeeCard = (cardData: EmployeeResumeListItemType) => {
  const navigate = useNavigate();
  const { mutate } = usePutScrapResume();

  const handleClickBookmark = (e: MouseEvent) => {
    e.stopPropagation();
    mutate(cardData.id);
  };

  const goToResumeDetailPage = () => {
    navigate(`/employer/search/${cardData.id}`);
  };

  return {
    handleClickBookmark,
    goToResumeDetailPage,
  };
};
