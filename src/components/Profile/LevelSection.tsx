import LevelIcon from '@/assets/icons/Profile/LevelIcon.svg?react';

const LevelSection = ({ title, level }: { title: string; level: number }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="head-2 text-[#1E1926] text-center">{title}</div>
        <div className="caption text-[#464646] text-center">
          {title} description description
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <LevelIcon />
        <div className="absolute flex flex-col justify-center items-center gap-1">
          <div className="text-center body-3 text-[#1E1926]">Level</div>
          <div className="text-center head-3 text-[#1E1926]">{level}</div>
        </div>
      </div>
    </div>
  );
};

export default LevelSection;
