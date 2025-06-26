import EtcLanguageSkillCard from '@/components/Language/EtcLanguageSkillCard';
import LanguageSkillCard from '@/components/Language/LanguageSkillCard';
import { LanguageSummaryType } from '@/types/postApply/resumeDetailItem';
import AddTrigger from '@/components/Common/AddTrigger';
import PlusIcon from '@/assets/icons/PlusIcon.svg?react';
import { useNavigate } from 'react-router-dom';

type LanguageSkillListProps = {
  data: LanguageSummaryType;
};

const LanguageSkillList = ({ data }: LanguageSkillListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col px-4 gap-4">
        {data?.topik_level !== 0 && (
          <LanguageSkillCard
            title="TOPIK"
            level={data.topik_level}
            maxLevel={6}
          />
        )}
        {data?.social_integration_level !== 0 && (
          <LanguageSkillCard
            title="Social Integration Program"
            level={data.social_integration_level}
            maxLevel={5}
          />
        )}
        {data?.sejong_institute !== 0 && (
          <LanguageSkillCard
            title="Sejong Institute"
            level={data.sejong_institute}
            maxLevel={6}
          />
        )}
        {data?.additional_language?.length > 0 &&
          data?.additional_language.map((lang) => (
            <EtcLanguageSkillCard
              key={lang.id}
              title={lang.language_name}
              level={lang.level}
              etcLanguageId={lang.id}
            />
          ))}
        <AddTrigger
          icon={PlusIcon}
          type={AddTrigger.Type.TEXT}
          color={AddTrigger.ColorType.BLUE}
          title="Add Language"
          handleClick={() => {
            navigate('/resume/language/add');
          }}
        />
      </div>
    </>
  );
};

export default LanguageSkillList;
