import { LanguageListType } from '@/types/postApply/resumeDetailItem';
import LanguageCard from '@/components/Language/LanguageCard';

type LanguageManageDetailProps = {
  data: LanguageListType;
};

const LanguageManageDetail = ({ data }: LanguageManageDetailProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <LanguageCard title="TOPIK" level={data.topik} maxLevel={6} />
        <LanguageCard
          title="Social Integration"
          level={data.social_integration}
          maxLevel={5}
        />
        <LanguageCard
          title="Sejong Institute"
          level={data.sejong_institute}
          maxLevel={6}
        />
        {data.etc.length > 0 &&
          data.etc.map((lang) => (
            <LanguageCard
              key={lang.id}
              title={lang.language_name}
              level={lang.level}
              etcLanguageId={lang.id}
              maxLevel={10}
            />
          ))}
      </div>
    </>
  );
};

export default LanguageManageDetail;
