import { useLocation, useNavigate } from 'react-router-dom';
import { MypageCardType } from '@/types/manageResume/manageResume';
import { ManageResumeType } from '@/constants/manageResume';
import IntroductionDetail from '@/components/ManageResume/IntroductionDetail';
import {
  EducationType,
  IntroductionType,
  LanguageListType,
  WorkExperienceType,
  WorkPreferenceType,
} from '@/types/postApply/resumeDetailItem';
import WorkExperienceDetail from '@/components/ManageResume/WorkExperienceDetail';
import EducationDetail from '@/components/ManageResume/EducationDetail';
import LanguageManageDetail from '@/components/ManageResume/LanguageManageDetail';
import InfoCardLayout from '@/components/Common/InfoCardLayout';
import { ReactNode } from 'react';
import WorkPreferenceDetail from '@/components/ManageResume/WorkPreferenceDetail';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { getKoreanAbilityLevel } from '@/utils/resume';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import AddTrigger from '@/components/Common/AddTrigger';
import PlusIcon from '@/assets/icons/PlusIcon.svg?react';

type MypageCardProps = {
  type: ManageResumeType;
  informations?: MypageCardType[];
  introductionData?: IntroductionType;
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
  const pathname = useLocation().pathname;
  const { account_type } = useUserStore();

  // 각 언어 레벨이 모두 0, 기타 언어가 없으면 언어 카드 렌더링 안 함
  const isValidLanguageData =
    languageData?.topik !== 0 ||
    languageData?.social_integration !== 0 ||
    languageData?.sejong_institute !== 0 ||
    languageData?.etc.length > 0;

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
      title: profileTranslation.visa[isEmployer(pathname)],
    },
    [ManageResumeType.PERSONALINFORMATION]: {
      isValidRender: () => false,
      component: () => <></>,
      title: profileTranslation.personalInformation[isEmployer(pathname)],
    },
    [ManageResumeType.INTRODUCTION]: {
      isValidRender: () => introductionData !== null,
      component: () => (
        <IntroductionDetail
          title={introductionData!.title}
          content={introductionData!.content}
        />
      ),
      title: profileTranslation.introduction[isEmployer(pathname)],
    },
    [ManageResumeType.WORKEXPERIENCE]: {
      isValidRender: () => workExperienceData && workExperienceData.length > 0,
      component: () => <WorkExperienceDetail data={workExperienceData!} />,
      title: profileTranslation.workExperience[isEmployer(pathname)],
    },
    [ManageResumeType.EDUCATION]: {
      isValidRender: () => educationData && educationData.length > 0,
      component: () => <EducationDetail data={educationData!} />,
      title: profileTranslation.education[isEmployer(pathname)],
    },
    [ManageResumeType.LANGUAGE]: {
      isValidRender: () => isValidLanguageData,
      component: () => <LanguageManageDetail data={languageData!} />,
      title: profileTranslation.languages[isEmployer(pathname)],
    },
    [ManageResumeType.WORKPREFERENCES]: {
      isValidRender: () => !!workPreferencesData,
      component: () => <WorkPreferenceDetail data={workPreferencesData!} />,
      title: profileTranslation.workPreference[isEmployer(pathname)],
    },
  };

  const getRightTopElement = () => {
    if (account_type === UserType.USER) {
      // 일반 유저: 기존 로직
      return contentMap[type].isValidRender() && rightElement;
    }
    if (type === ManageResumeType.LANGUAGE) {
      // 고용주 + 언어 카드: 별도 문구
      return (
        <span className="button-14-semibold text-text-normal">
          {
            getKoreanAbilityLevel({
              topik: languageData?.topik,
              kiip: languageData?.social_integration,
              sejong: languageData?.sejong_institute,
            }).label
          }
        </span>
      );
    }
    // 그 외 고용주: 아무것도 안 보임
    return null;
  };
  const renderContent = () => {
    const content = contentMap[type];
    if (content?.isValidRender()) {
      return content.component();
    }
    if (isEmployer(pathname) === 'ko') {
      return null;
    }
    // 데이터가 없을 때 +Add {title} 버튼 표시
    return (
      <AddTrigger
        icon={PlusIcon}
        type={AddTrigger.Type.FILLED}
        color={AddTrigger.ColorType.BLUE}
        title={`Add ${type}`}
        handleClick={handleClick}
      />
    );
  };

  return (
    <InfoCardLayout
      title={contentMap[type].title}
      rightTopElement={getRightTopElement()}
    >
      {renderContent()}
    </InfoCardLayout>
  );
};

export default MypageCard;
