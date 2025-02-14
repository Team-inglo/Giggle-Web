import { useNavigate } from 'react-router-dom';
import { MypageCardType } from '@/types/manageResume/manageResume';
import { ManageResumeType } from '@/constants/manageResume';
import YellowDocumentIcon from '@/assets/icons/YellowDocumentIcon.svg?react';
import BlackPlusIcon from '@/assets/icons/ManageResume/BlackPlusIcon.svg?react';
import IntroductionDetail from '@/components/ManageResume/IntroductionDetail';
import {
  EducationType,
  LanguageListType,
  WorkExperienceType,
} from '@/types/postApply/resumeDetailItem';
import WorkExperienceDetail from '@/components/ManageResume/WorkExperienceDetail';
import EducationDetail from '@/components/ManageResume/EducationDetail';
import LanguageManageDetail from '@/components/ManageResume/LanguageManageDetail';
import InfoCardLayout from '@/components/Common/InfoCardLayout';

type MypageCardProps = {
  type: ManageResumeType;
  informations?: MypageCardType[];
  introductionData?: string;
  workExperienceData?: WorkExperienceType[];
  educationData?: EducationType[];
  languageData?: LanguageListType;
};

const MypageCard = ({
  type,
  introductionData,
  workExperienceData,
  educationData,
  languageData,
}: MypageCardProps) => {
  const navigate = useNavigate();

  // '+' 버튼을 눌렀을 떄 이동되는 경로와 아이콘을 매칭
  const iconAndPath = {
    [ManageResumeType.VISA]: { icon: <YellowDocumentIcon />, path: '' },
    [ManageResumeType.PERSONALINFORMATION]: {
      icon: <YellowDocumentIcon />,
      path: '',
    },
    [ManageResumeType.INTRODUCTION]: {
      icon: <YellowDocumentIcon />,
      path: '/resume/introduction',
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      icon: <YellowDocumentIcon />,
      path: '/resume/work-experience',
    },
    [ManageResumeType.EDUCATION]: {
      icon: <YellowDocumentIcon />,
      path: '/resume/education',
    },
    [ManageResumeType.LANGUAGE]: {
      icon: <YellowDocumentIcon />,
      path: '/resume/language/add',
    },
  };

  // 클릭 시 path가 있으면 해당 경로로 이동
  const handleClick = () => {
    const { path } = iconAndPath[type];
    if (path) navigate(path);
  };

  const renderContent = () => {
    if (type === ManageResumeType.INTRODUCTION && introductionData !== null) {
      return <IntroductionDetail data={introductionData!} />;
    }

    if (
      type === ManageResumeType.WORKEXPERIENCE &&
      workExperienceData &&
      workExperienceData.length > 0
    ) {
      return <WorkExperienceDetail data={workExperienceData!} />;
    }

    if (
      type === ManageResumeType.EDUCATION &&
      educationData &&
      educationData.length > 0
    ) {
      return <EducationDetail data={educationData!} />;
    }

    if (type === ManageResumeType.LANGUAGE && languageData) {
      return <LanguageManageDetail data={languageData!} />;
    }

    return null;
  };

  return (
    <InfoCardLayout
      icon={iconAndPath[type].icon}
      title={type}
      rightTopElement={
        <>
          {!(
            type == ManageResumeType.INTRODUCTION && introductionData !== null
          ) && (
            <button className="rounded p-2 bg-[#FFD817]" onClick={handleClick}>
              <BlackPlusIcon />
            </button>
          )}
        </>
      }
    >
      {renderContent()}
    </InfoCardLayout>
  );
};

export default MypageCard;
