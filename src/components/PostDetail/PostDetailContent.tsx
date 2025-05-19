import { useRef, useState } from 'react';
import PostDetailContentMenuBar from '@/components/PostDetail/PostDetailContentMenuBar';
import { PostDetailContentMenu } from '@/constants/postDetail';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PostDetailItemType } from '@/types/postDetail/postDetailItem';
import { formatMoney } from '@/utils/formatMoney';
import { infoTranslation, postTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import {
  EducationLevelInfo,
  genderInfo,
  JobCategoryInfo,
  WorkTypeInfo,
} from '@/constants/post';
import {
  EducationLevel,
  EmploymentType,
  JobCategory,
} from '@/types/postCreate/postCreate';
import { WorkPeriodInfo } from '@/constants/documents';
import { DayOfWeek, WorkPeriod } from '@/types/api/document';
import { Gender } from '@/types/api/users';
import { UserType } from '@/constants/user';
import { dayOfWeekToKorean } from '@/utils/post';
import { calculateDays } from '@/utils/calculateDDay';

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex gap-3">
    <h5 className="body-3 text-text-alternative">{label}</h5>
    <p className="body-3 text-text-strong">{value}</p>
  </div>
);

const RecruitmentSection = ({
  postDetailData,
  isEmployer,
  accountType,
}: {
  postDetailData: PostDetailItemType;
  isEmployer: 'ko' | 'en';
  accountType: UserType | undefined;
}) => {
  const formatRecruitmentDeadline = () => {
    if (
      postDetailData.recruitment_conditions?.recruitment_deadline === '상시모집'
    )
      return postTranslation.dDay[isEmployer];

    return (
      <>
        {calculateDays(
          postDetailData.recruitment_conditions?.recruitment_deadline,
        )}
        {postTranslation.daysLeft[isEmployer]}
      </>
    );
  };

  const formatAgeRestriction = () => {
    if (postDetailData.recruitment_conditions.age_restriction === null)
      return postTranslation.none[isEmployer];

    return (
      <>
        {postDetailData.recruitment_conditions.age_restriction}
        {postTranslation.ageRestrictionAdditional[isEmployer]}
      </>
    );
  };

  const formatEducation = () => {
    const formattedEducation =
      accountType === UserType.OWNER
        ? EducationLevelInfo[
            postDetailData.recruitment_conditions.education as EducationLevel
          ].name
        : postDetailData.recruitment_conditions.education.toLowerCase();

    return (
      <>
        {formattedEducation} {postTranslation.educationAdditional[isEmployer]}
      </>
    );
  };

  const formatVisaInfo = () => {
    return postDetailData.recruitment_conditions.visa
      ?.join(', ')
      ?.replace(/_/g, '-');
  };

  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 head-3 text-text-strong">
        {postTranslation.recruitmentConditions[isEmployer]}
      </h3>
      <div className="flex flex-col gap-2">
        <InfoItem
          label={postTranslation.recruitmentPeriod[isEmployer]}
          value={formatRecruitmentDeadline()}
        />
        <InfoItem
          label={postTranslation.ageRestriction[isEmployer]}
          value={formatAgeRestriction()}
        />
        <InfoItem
          label={postTranslation.numberOfRecruits[isEmployer]}
          value={
            <>
              {postDetailData.recruitment_conditions.number_of_recruits}{' '}
              {postTranslation.people[isEmployer]}
            </>
          }
        />
        <InfoItem
          label={postTranslation.education[isEmployer]}
          value={formatEducation()}
        />
        <InfoItem
          label={postTranslation.visa[isEmployer]}
          value={formatVisaInfo()}
        />
        <InfoItem
          label={postTranslation.gender[isEmployer]}
          value={
            accountType === UserType.OWNER
              ? genderInfo[
                  postDetailData.recruitment_conditions.gender as Gender
                ].name
              : postDetailData.recruitment_conditions.gender.toLowerCase()
          }
        />
        <InfoItem
          label={postTranslation.preferredConditions[isEmployer]}
          value={
            postDetailData.recruitment_conditions.preferred_conditions === ''
              ? infoTranslation.notEntered[isEmployerByAccountType(accountType)]
              : postDetailData.recruitment_conditions.preferred_conditions
          }
        />
      </div>
    </article>
  );
};

const WorkplaceSection = ({
  postDetailData,
  isEmployer,
  accountType,
}: {
  postDetailData: PostDetailItemType;
  isEmployer: 'ko' | 'en';
  accountType: UserType | undefined;
}) => {
  const formatWorkDayTimes = () => {
    return (
      <>
        {' '}
        {postDetailData.working_conditions.work_day_times.map(
          (value, index) => (
            <p key={`${value}_${index}`}>
              {value.day_of_week !== 'NEGOTIABLE' && (
                <span className="pr-2">
                  {accountType === UserType.OWNER
                    ? dayOfWeekToKorean(value.day_of_week as DayOfWeek)
                    : value.day_of_week.toLowerCase()}
                </span>
              )}
              {value.work_start_time} - {value.work_end_time}
            </p>
          ),
        )}
      </>
    );
  };

  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 head-3 text-text-strong">
        {postTranslation.workplaceConditions[isEmployer]}
      </h3>
      <div className="flex flex-col gap-2">
        <InfoItem
          label={postTranslation.employmentType[isEmployer]}
          value={
            accountType === UserType.OWNER
              ? WorkTypeInfo[
                  postDetailData.working_conditions
                    .employment_type as EmploymentType
                ].name
              : postDetailData.working_conditions.employment_type.toLowerCase()
          }
        />
        <InfoItem
          label={postTranslation.jobCategory[isEmployer]}
          value={
            accountType === UserType.OWNER
              ? JobCategoryInfo[
                  postDetailData.working_conditions.job_category as JobCategory
                ].name
              : postDetailData.working_conditions.job_category
                  .replace(/_/g, ' ')
                  .toLowerCase()
          }
        />
        <InfoItem
          label={postTranslation.workPeriod[isEmployer]}
          value={
            accountType === UserType.OWNER
              ? WorkPeriodInfo[
                  postDetailData.working_conditions.work_period as WorkPeriod
                ].name
              : postDetailData.working_conditions.work_period
                  .replace(/_/g, ' ')
                  .toLowerCase()
          }
        />
        <InfoItem
          label={postTranslation.salary[isEmployer]}
          value={
            <>
              {' '}
              {formatMoney(postDetailData.working_conditions.hourly_rate)}{' '}
              {postTranslation.KRW[isEmployerByAccountType(accountType)]}
            </>
          }
        />
        <div className="flex gap-3">
          <h5 className="body-3 text-text-alternative">
            {postTranslation.workingDaysHours[isEmployer]}
          </h5>
          <div className="body-3 text-text-strong">{formatWorkDayTimes()}</div>
        </div>
      </div>
    </article>
  );
};

const CompanyInfoSection = ({
  postDetailData,
  isEmployer,
}: {
  postDetailData: PostDetailItemType;
  isEmployer: 'ko' | 'en';
}) => {
  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 head-3 text-text-strong">
        {postTranslation.companyInformation[isEmployer]}
      </h3>
      <div className="flex flex-col gap-2">
        <InfoItem
          label={postTranslation.companyAddress[isEmployer]}
          value={postDetailData.company_information.company_address}
        />
        <InfoItem
          label={postTranslation.representativeName[isEmployer]}
          value={postDetailData.company_information.representative_name}
        />
        <InfoItem
          label={postTranslation.recruiter[isEmployer]}
          value={postDetailData.company_information.recruiter}
        />
        <InfoItem
          label={postTranslation.contact[isEmployer]}
          value={postDetailData.company_information.contact}
        />
        <InfoItem
          label={postTranslation.email[isEmployer]}
          value={postDetailData.company_information.email}
        />
      </div>
    </article>
  );
};

type PostDetailContentProps = {
  postDetailData: PostDetailItemType;
};

const PostDetailContent = ({ postDetailData }: PostDetailContentProps) => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const { account_type } = useUserStore();

  const [selectedMenu, setSelectedMenu] = useState<PostDetailContentMenu>(
    PostDetailContentMenu.RECRUITMENT,
  );
  const [showDetailOverview, setShowDetailOverview] = useState<boolean>(false);

  const scrollToSelectedMenu = (menu: PostDetailContentMenu) => {
    const scrollIndex: { [key: string]: number } = {
      RECRUITMENT: 0,
      WORPLACE: 1,
      COMPANY: 2,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  const isEmployer = isEmployerByAccountType(account_type);

  return (
    <section className="w-full pb-[8rem] bg-surface-base">
      <PostDetailContentMenuBar
        selectedMenu={selectedMenu}
        scrollToSelectedMenu={scrollToSelectedMenu}
      />
      <div className="flex flex-col gap-2 w-full bg-surface-secondary">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <RecruitmentSection
            postDetailData={postDetailData}
            isEmployer={isEmployer}
            accountType={account_type}
          />
        </div>
        <article className="w-full px-4 py-6 bg-surface-base">
          <h3 className="pb-5 head-3 text-text-strong">
            {
              postTranslation.detailedOverview[
                isEmployerByAccountType(account_type)
              ]
            }
          </h3>
          <div className="flex flex-col gap-3 w-full">
            {postDetailData.detailed_overview.length > 255 ? (
              <>
                <p className="text-text-strong body-2 whitespace-pre-wrap break-all">
                  {showDetailOverview
                    ? postDetailData.detailed_overview
                    : postDetailData.detailed_overview.slice(0, 255) + '...'}
                </p>
                {!showDetailOverview && (
                  <button
                    onClick={() => setShowDetailOverview(true)}
                    className="w-full py-3 px-[0.625rem] border border-border-disabled rounded-[0.625rem]"
                  >
                    {
                      postTranslation.seeMore[
                        isEmployerByAccountType(account_type)
                      ]
                    }
                  </button>
                )}
              </>
            ) : (
              <p className="text-text-strong body-2 whitespace-pre-wrap break-all">
                {postDetailData.detailed_overview}
              </p>
            )}
          </div>
        </article>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <article className="w-full px-4 py-6 bg-surface-base">
            <h3 className="pb-5 head-3 text-text-strong">
              {
                postTranslation.workplaceInformation[
                  isEmployerByAccountType(account_type)
                ]
              }
            </h3>
            <p className="pb-3 text-text-strong body-3">
              {postDetailData.workplace_information.main_address ?? ''}{' '}
              {postDetailData.workplace_information.detailed_address ?? ''}
            </p>
            <Map
              center={{
                lat: postDetailData.workplace_information.latitude,
                lng: postDetailData.workplace_information.longitude,
              }}
              style={{ width: '100%', height: '151px' }}
              className="rounded-xl"
            >
              <MapMarker
                position={{
                  lat: postDetailData.workplace_information.latitude,
                  lng: postDetailData.workplace_information.longitude,
                }}
              ></MapMarker>
            </Map>
          </article>
        </div>
        <WorkplaceSection
          postDetailData={postDetailData}
          isEmployer={isEmployer}
          accountType={account_type}
        />
        <div ref={(e) => (scrollRef.current[2] = e)}>
          <CompanyInfoSection
            postDetailData={postDetailData}
            isEmployer={isEmployer}
          />
        </div>
      </div>
    </section>
  );
};

export default PostDetailContent;
