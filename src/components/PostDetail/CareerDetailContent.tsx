import { useRef, useState } from 'react';
import { CareerDetailContentMenu } from '@/constants/postDetail';
import {
  careerDetailTranslation,
  postTranslation,
} from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { EducationLevelInfo } from '@/constants/post';
import { EducationLevel } from '@/types/postCreate/postCreate';
import { UserType } from '@/constants/user';
import { CareerDetailItemType } from '@/types/api/career';

const MenuTab = ({
  isSelected,
  onClick,
  label,
}: {
  isSelected: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex-1 py-[0.875rem] button-14-semibold ${
      isSelected
        ? 'text-text-strong border-b-2 border-b-primary-dark'
        : 'text-text-assistive'
    }`}
  >
    {label}
  </button>
);

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex gap-3">
    <h5 className="caption-12-regular text-text-alternative">{label}</h5>
    <p className="caption-12-regular text-text-strong">{value}</p>
  </div>
);

const RecruitmentSection = ({
  postDetailData,
  isEmployer,
  accountType,
}: {
  postDetailData: CareerDetailItemType;
  isEmployer: 'ko' | 'en';
  accountType: UserType | undefined;
}) => {
  // 교육 정보 표시
  const formatEducationInfo = () => {
    if (!postDetailData.education) return postTranslation.none[isEmployer];

    const educationText =
      accountType === UserType.OWNER
        ? EducationLevelInfo[postDetailData.education as EducationLevel].name
        : postDetailData.education.toLowerCase();

    return (
      <>
        {educationText}
        {postTranslation.educationAdditional[isEmployer]}
      </>
    );
  };

  const formatVisaInfo = () => {
    return postDetailData.visa?.join(', ')?.replace(/_/g, '-');
  };

  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 heading-18-semibold text-text-strong">
        {postTranslation.recruitmentConditions[isEmployer]}
      </h3>
      <div className="flex flex-col gap-2">
        <InfoItem
          label={postTranslation.recruitmentPeriod[isEmployer]}
          value={`${postDetailData.recruitment_start_date} ~ ${postDetailData.recruitment_end_date}`}
        />
        <InfoItem
          label={postTranslation.numberOfRecruits[isEmployer]}
          value={`${postDetailData.recruitment_number || 0}${postTranslation.people[isEmployer]}`}
        />
        <InfoItem
          label={postTranslation.education[isEmployer]}
          value={formatEducationInfo()}
        />
        <InfoItem
          label={postTranslation.visa[isEmployer]}
          value={formatVisaInfo()}
        />
        <InfoItem
          label={careerDetailTranslation.preferredConditions[isEmployer]}
          value={postDetailData.preferred_conditions}
        />
      </div>
    </article>
  );
};

const DescriptionSection = ({
  details,
  isEmployer,
}: {
  details?: string;
  isEmployer: 'ko' | 'en';
}) => {
  const [showDetailOverview, setShowDetailOverview] = useState<boolean>(false);

  const shouldTruncate = details && details.length > 255;

  const displayText =
    shouldTruncate && !showDetailOverview
      ? `${details.slice(0, 255)}...`
      : details;

  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 heading-18-semibold text-text-strong">
        {careerDetailTranslation.description[isEmployer]}
      </h3>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-text-strong body-14-regular whitespace-pre-wrap break-all">
          {displayText}
        </p>

        {shouldTruncate && !showDetailOverview && (
          <button
            onClick={() => setShowDetailOverview(true)}
            className="w-full py-3 px-[0.625rem] border border-border-disabled rounded-[0.625rem]"
          >
            {postTranslation.seeMore[isEmployer]}
          </button>
        )}
      </div>
    </article>
  );
};

type CareerDetailContentProps = {
  postDetailData: CareerDetailItemType;
};

const CareerDetailContent = ({ postDetailData }: CareerDetailContentProps) => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const { account_type } = useUserStore();

  const [selectedMenu, setSelectedMenu] = useState<CareerDetailContentMenu>(
    CareerDetailContentMenu.RECRUITMENT,
  );

  const scrollToSelectedMenu = (menu: CareerDetailContentMenu) => {
    const scrollIndex: { [key: string]: number } = {
      RECRUITMENT: 0,
      DESCRIPTION: 1,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  const isEmployer = isEmployerByAccountType(account_type);

  return (
    <section className="w-full pb-[8rem] bg-surface-base">
      <nav className="flex w-full bg-surface-base">
        <MenuTab
          isSelected={selectedMenu === CareerDetailContentMenu.RECRUITMENT}
          onClick={() =>
            scrollToSelectedMenu(CareerDetailContentMenu.RECRUITMENT)
          }
          label={postTranslation.recruitment[isEmployer]}
        />
        <MenuTab
          isSelected={selectedMenu === CareerDetailContentMenu.DESCRIPTION}
          onClick={() =>
            scrollToSelectedMenu(CareerDetailContentMenu.DESCRIPTION)
          }
          label={careerDetailTranslation.description[isEmployer]}
        />
      </nav>
      <div className="flex flex-col gap-2 w-full bg-surface-secondary">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <RecruitmentSection
            postDetailData={postDetailData}
            isEmployer={isEmployer}
            accountType={account_type}
          />
        </div>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <DescriptionSection
            details={postDetailData.details}
            isEmployer={isEmployer}
          />
        </div>
      </div>
    </section>
  );
};

export default CareerDetailContent;
