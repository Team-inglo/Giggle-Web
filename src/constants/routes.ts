import HomeIcon from '@/assets/icons/HomeIcon.svg?react';
import SearchIcon from '@/assets/icons/NavSearchIcon.svg?react';
import ApplicantsIcon from '@/assets/icons/NavApplicantsIcon.svg?react';
import ProfileIcon from '@/assets/icons/ProfileIcon.svg?react';
import ScrappedIcon from '@/assets/icons/NavScrappedIcon.svg?react';
export const userRoutes = [
  {
    path: '/',
    svg: HomeIcon,
    label: 'Home',
  },
  {
    path: '/search',
    svg: SearchIcon,
    label: 'Search',
  },
  {
    path: '/application',
    svg: ApplicantsIcon,
    label: 'Applicants',
  },
  {
    path: '/resume/scrapped',
    svg: ScrappedIcon,
    label: 'Saved',
  },
  {
    path: '/profile',
    svg: ProfileIcon,
    label: 'Mypage',
  },
];

export const employerRoutes = [
  {
    path: '/',
    svg: HomeIcon,
    label: '홈',
  },
  {
    path: '/search',
    svg: SearchIcon,
    label: '검색',
  },
  {
    path: '/employer/post',
    svg: ApplicantsIcon,
    label: '공고관리',
  },
  {
    path: '/employer/scrapped',
    svg: ScrappedIcon,
    label: '스크랩',
  },
  {
    path: '/employer/profile',
    svg: ProfileIcon,
    label: '마이페이지',
  },
];

export const guestRoutes = [
  {
    path: '/',
    svg: HomeIcon,
    label: 'Home',
  },
  {
    path: '/search',
    svg: SearchIcon,
    label: 'Search',
  },
  {
    path: '/signin',
    svg: ApplicantsIcon,
    label: 'Applicants',
  },
  {
    path: '/signin',
    svg: ScrappedIcon,
    label: 'Saved',
  },
  {
    path: '/signin',
    svg: ProfileIcon,
    label: 'Mypage',
  },
];
