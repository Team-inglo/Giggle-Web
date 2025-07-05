import EtcLanguageSkillCard from '@/components/Language/EtcLanguageSkillCard';
import LanguageSkillCard from '@/components/Language/LanguageSkillCard';
import { LanguageSummaryType } from '@/types/postApply/resumeDetailItem';
import AddTrigger from '@/components/Common/AddTrigger';
import PlusIcon from '@/assets/icons/PlusIcon.svg?react';
import { useNavigate } from 'react-router-dom';

type LanguageSkillListProps = {
  data: LanguageSummaryType;
};

const languageSkills = [
  { key: 'topik_level', title: 'TOPIK', maxLevel: 6 },
  {
    key: 'social_integration_level',
    title: 'Social Integration Program',
    maxLevel: 5,
  },
  { key: 'sejong_institute', title: 'Sejong Institute', maxLevel: 6 },
];

const LanguageSkillList = ({ data }: LanguageSkillListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col px-4 gap-4">
        {/* TOPIK, 사회 통합 프로그램, 세종 학당 등급 */}
        {languageSkills.map(
          (skill) =>
            data[skill.key as keyof LanguageSummaryType] !== 0 && (
              <LanguageSkillCard
                key={skill.key}
                title={skill.title}
                level={data[skill.key as keyof LanguageSummaryType] as number}
                maxLevel={skill.maxLevel}
              />
            ),
        )}
        {/* 기타 언어 */}
        {data?.additional_language?.length > 0 &&
          data?.additional_language.map((lang) => (
            <EtcLanguageSkillCard
              key={lang.id}
              title={lang.language_name}
              level={lang.level}
              etcLanguageId={lang.id}
            />
          ))}
        {/* 언어 추가 */}
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
