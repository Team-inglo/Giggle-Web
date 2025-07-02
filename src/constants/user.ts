import PeopleIcon from '@/assets/icons/PeopleIcon.svg?react';
import BuildingIcon from '@/assets/icons/BuildingIcon.svg?react';

export enum UserType {
  USER = 'USER',
  OWNER = 'OWNER',
}
export const cardData = [
  {
    icon: PeopleIcon,
    title: 'International Student',
    description: 'I want to find a job 💼',
    accountType: UserType.USER,
  },
  {
    icon: BuildingIcon,
    title: '고용주',
    description: '외국인 유학생을 채용하고 싶어요 🤝',
    accountType: UserType.OWNER,
  },
];
