import { useNavigate } from 'react-router-dom';
import { MypageCardType } from '@/types/manageResume/manageResume';
import { ManageResumeType } from '@/constants/manageResume';
import IntroductionDetail from '@/components/ManageResume/IntroductionDetail';
import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
  WorkPreferenceType,
} from '@/types/postApply/resumeDetailItem';
import WorkExperienceDetail from '@/components/ManageResume/WorkExperienceDetail';
import EducationDetail from '@/components/ManageResume/EducationDetail';
import LanguageManageDetail from '@/components/ManageResume/LanguageManageDetail';
import InfoCardLayout from '@/components/Common/InfoCardLayout';
import { ReactNode } from 'react';
import WorkPreferenceDetail from './WorkPreferenceDetail';

type MypageCardProps = {
  type: ManageResumeType;
  informations?: MypageCardType[];
  introductionData?: string;
  workExperienceData?: WorkExperienceType[];
  educationData?: EducationType[];
  languageData?: LanguageListType;
  workPreferencesData?: WorkPreferenceType;
  rightElement?: ReactNode;
};

const MypageCard = ({
  type,
  introductionData,
  workExperienceData,
  educationData,
  languageData,
  workPreferencesData,
  rightElement,
}: MypageCardProps) => {
  const navigate = useNavigate();

  // '+' 버튼을 눌렀을 떄 이동되는 경로와 아이콘을 매칭
  const iconAndPath = {
    [ManageResumeType.VISA]: { path: '' },
    [ManageResumeType.PERSONALINFORMATION]: {
      path: '',
    },
    [ManageResumeType.INTRODUCTION]: {
      path: '/resume/introduction',
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      path: '/resume/work-experience',
    },
    [ManageResumeType.EDUCATION]: {
      path: '/resume/education',
    },
    [ManageResumeType.LANGUAGE]: {
      path: '/resume/language/add',
    },
    [ManageResumeType.WORKPREFERENCES]: {
      path: '/resume/work-preference',
    },
  };

  // 클릭 시 path가 있으면 해당 경로로 이동
  const handleClick = () => {
    const { path } = iconAndPath[type];
    if (path) navigate(path);
  };

  const contentMap = {
    [ManageResumeType.VISA]: {
      isValidRender: () => false,
      component: () => <></>,
    },
    [ManageResumeType.PERSONALINFORMATION]: {
      isValidRender: () => false,
      component: () => <></>,
    },
    [ManageResumeType.INTRODUCTION]: {
      isValidRender: () => introductionData !== null,
      component: () => <IntroductionDetail data={introductionData!} />,
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      isValidRender: () => workExperienceData && workExperienceData.length > 0,
      component: () => <WorkExperienceDetail data={workExperienceData!} />,
    },
    [ManageResumeType.EDUCATION]: {
      isValidRender: () => educationData && educationData.length > 0,
      component: () => <EducationDetail data={educationData!} />,
    },
    [ManageResumeType.LANGUAGE]: {
      isValidRender: () => !!languageData,
      component: () => <LanguageManageDetail data={languageData!} />,
    },
    [ManageResumeType.WORKPREFERENCES]: {
      isValidRender: () => !!workPreferencesData,
      component: () => <WorkPreferenceDetail data={workPreferencesData!} />,
    },
  };

  const renderContent = () => {
    const content = contentMap[type];
    if (content?.isValidRender()) {
      return content.component();
    }

    // 데이터가 없을 때 +Add {title} 버튼 표시
    return (
      <button
        onClick={handleClick}
        className="w-full py-4 text-center border border-dashed border-blue-300 bg-blue-300/10 rounded-lg text-text-success flex items-center justify-center"
      >
        <span className="mr-1">+</span>
        {`Add ${type}`}
      </button>
    );
  };

  return (
    <InfoCardLayout
      title={type}
      rightTopElement={<>{contentMap[type].isValidRender() && rightElement}</>}
    >
      {renderContent()}
    </InfoCardLayout>
  );
};

export default MypageCard;
