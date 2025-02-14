import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import { ManageResumeType } from '@/constants/manageResume';
import MypageCard from '@/components/ManageResume/MypageCard';
import { ResumeDataState } from '@/types/manageResume/manageResume';

type ResumeEditSectionProps = {
  introductionData: string;
  workexperienceData: WorkExperienceType[];
  educationData: EducationType[];
  languageData: LanguageListType;
};

const ResumeEditSection = ({
  introductionData,
  workexperienceData,
  educationData,
  languageData,
}: ResumeEditSectionProps) => {
  // 데이터 상태 관리
  const resumeData: ResumeDataState = {
    introductionData,
    workexperienceData,
    educationData,
    languageData,
  };

  return (
    <div className="flex flex-col gap-4">
      <MypageCard
        type={ManageResumeType.INTRODUCTION}
        introductionData={resumeData.introductionData}
      />
      <MypageCard
        type={ManageResumeType.WORKEXPERIENCE}
        workExperienceData={resumeData.workexperienceData}
      />
      <MypageCard
        type={ManageResumeType.EDUCATION}
        educationData={resumeData.educationData}
      />
      <MypageCard
        type={ManageResumeType.LANGUAGE}
        languageData={resumeData.languageData}
      />
    </div>
  );
};

export default ResumeEditSection;
