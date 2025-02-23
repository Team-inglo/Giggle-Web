import { LanguageLevelType, MetaDataType } from '@/types/api/profile';
import { useNavigate } from 'react-router-dom';
import LevelSection from '@/components/Profile/LevelSection';

type LicenseCardProps = {
  languageData: LanguageLevelType;
  metaData: MetaDataType;
};

const LicenseCard = ({ languageData, metaData }: LicenseCardProps) => {
  const navigate = useNavigate();

  // 언어설정 화면으로 이동
  const handleEnterButton = () => {
    navigate('/resume/language');
  };

  const emptyLevel = (): boolean => {
    return (
      languageData.kiip_level === 0 &&
      languageData.sejong_level === 0 &&
      languageData.topik_level === 0
    );
  };

  return (
    <div className="w-full p-8 flex flex-col gap-4 bg-[#FEF387] rounded-2xl shadow-languageCardShadow">
      <div className="flex gap-6 justify-center items-center">
        <LevelSection title="TOPIK" level={languageData.topik_level} />
        <LevelSection title="KIIP" level={languageData.kiip_level} />
        <LevelSection title="Sejong" level={languageData.sejong_level} />
      </div>
      {/* 모든 언어 레벨이 0인 경우 */}
      {emptyLevel() ? (
        <button
          className="text-center py-2 bg-[#F4F4F9] rounded-lg text-[#656565] caption"
          onClick={handleEnterButton}
        >
          Please enter your language level
        </button>
      ) : (
        // ------- 입력 레벨별 문장 -------
        <div>
          <div className="flex items-center gap-2">
            <div className="button-2 text-[#464646]">Industries</div>
            <div className="caption text-[#656565]">
              {metaData.is_language_skill_4_or_more
                ? // 토픽 4급 이상
                  'Everywhere possible'
                : // 토픽 4급 이하
                  'All except manufacturing'}
            </div>
          </div>
          {/* 근무 시간 */}
          <div className="flex items-center gap-2">
            <div className="button-2 text-[#464646]">Hours</div>
            <div className="caption text-[#656565]">
              {metaData.weekday_work_hour} hrs on weekdays,{' '}
              {metaData.weekend_work_hour} hrs on weekends
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="button-2 text-[#464646]">Location</div>
            <div className="caption text-[#656565]">
              {metaData.is_metropolitan_area
                ? // 수도권
                  'Within 90 mins from home (Seoul metro area)'
                : // 비수도권
                  'Within 60 mins from university location (non-metropolitan area)'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseCard;
