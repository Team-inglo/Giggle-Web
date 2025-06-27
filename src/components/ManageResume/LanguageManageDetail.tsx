import { LanguageListType } from '@/types/postApply/resumeDetailItem';
import LanguageCard from '@/components/Language/LanguageCard';
import { useLocation } from 'react-router-dom';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import EtcLanguageSkillCard from '@/components/Language/EtcLanguageSkillCard';

type LanguageManageDetailProps = {
  data: LanguageListType;
};

const LanguageManageDetail = ({ data }: LanguageManageDetailProps) => {
  const pathname = useLocation().pathname;
  return (
    <>
      <div className="flex flex-col divide-y divide-surface-secondary">
        {data.topik !== 0 && (
          <LanguageCard title="TOPIK" level={data.topik} maxLevel={6} />
        )}
        {data.social_integration !== 0 && (
          <LanguageCard
            title={profileTranslation.socialIntegration[isEmployer(pathname)]}
            level={data.social_integration}
            maxLevel={5}
          />
        )}
        {data.sejong_institute !== 0 && (
          <LanguageCard
            title={profileTranslation.sejongInstitute[isEmployer(pathname)]}
            level={data.sejong_institute}
            maxLevel={6}
          />
        )}
        {data.etc.length > 0 &&
          data.etc.map((lang) => (
            <EtcLanguageSkillCard
              key={lang.id}
              title={lang.language_name}
              level={lang.level}
              etcLanguageId={lang.id}
            />
          ))}
      </div>
    </>
  );
};

export default LanguageManageDetail;
