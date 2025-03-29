import { useRef, useState } from 'react';
import PostDetailContentMenuBar from '@/components/PostDetail/PostDetailContentMenuBar';
import { PostDetailContentMenu } from '@/constants/postDetail';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PostDetailItemType } from '@/types/postDetail/postDetailItem';
import { formatMoney } from '@/utils/formatMoney';
import CompanyInformationIcon from '@/assets/icons/Post/CompanyInformationIcon.svg?react';
import DetailedOverviewIcon from '@/assets/icons/Post/DetailedOverviewIcon.svg?react';
import RecruitmentConditionsIcon from '@/assets/icons/Post/RecruitmentConditionsIcon.svg?react';
import WorkingConditionsIcon from '@/assets/icons/Post/WorkingConditionsIcon.svg?react';
import WorkplaceInformationIcon from '@/assets/icons/Post/WorkplaceInformationIcon.svg?react';
import InfoCardLayout from '@/components/Common/InfoCardLayout';
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

type PostDetailContentProps = {
  postDetailData: PostDetailItemType;
};

const PostDetailContent = ({ postDetailData }: PostDetailContentProps) => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const { account_type } = useUserStore();

  const [selectedMenu, setSelectedMenu] = useState<PostDetailContentMenu>(
    PostDetailContentMenu.RECUITMENT,
  );
  const [showDetailOverview, setShowDetailOverview] = useState<boolean>(false);

  const scrollToSelectedMenu = (menu: PostDetailContentMenu) => {
    const scrollIndex: { [key: string]: number } = {
      RECUITMENT: 0,
      WORPLACE: 1,
      COMPANY: 2,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  return (
    <section className="w-full pb-[8rem] bg-surface-secondary">
      <PostDetailContentMenuBar
        selectedMenu={selectedMenu}
        scrollToSelectedMenu={scrollToSelectedMenu}
      />
      <div className="flex flex-col gap-2 w-full p-4">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <InfoCardLayout
            icon={<RecruitmentConditionsIcon />}
            title={
              postTranslation.recruitmentConditions[
                isEmployerByAccountType(account_type)
              ]
            }
          >
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.recruitmentPeriod[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions?.recruitment_deadline}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.ageRestriction[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.age_restriction ===
                  null
                    ? postTranslation.none[
                        isEmployerByAccountType(account_type)
                      ]
                    : `${postDetailData.recruitment_conditions.age_restriction}${postTranslation.ageRestrictionAdditional[isEmployerByAccountType(account_type)]}`}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.education[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {account_type === UserType.OWNER
                    ? EducationLevelInfo[
                        postDetailData.recruitment_conditions
                          .education as EducationLevel
                      ].name
                    : postDetailData.recruitment_conditions.education.toLowerCase()}{' '}
                  {
                    postTranslation.educationAdditional[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.numberOfRecruits[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.number_of_recruits}{' '}
                  {
                    postTranslation.people[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {postTranslation.visa[isEmployerByAccountType(account_type)]}
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.visa
                    .join(', ')
                    .replace(/_/g, '-')}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.gender[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {account_type === UserType.OWNER
                    ? genderInfo[
                        postDetailData.recruitment_conditions.gender as Gender
                      ].name
                    : postDetailData.recruitment_conditions.gender.toLowerCase()}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.preferredConditions[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions
                    .preferred_conditions === ''
                    ? infoTranslation.notEntered[
                        isEmployerByAccountType(account_type)
                      ]
                    : postDetailData.recruitment_conditions
                        .preferred_conditions}
                </p>
              </div>
            </div>
          </InfoCardLayout>
        </div>
        <InfoCardLayout
          icon={<DetailedOverviewIcon />}
          title={
            postTranslation.detailedOverview[
              isEmployerByAccountType(account_type)
            ]
          }
        >
          <div className="flex flex-col gap-3 w-full">
            {postDetailData.detailed_overview.length > 255 ? (
              <>
                <p className="text-text-alternative caption whitespace-pre-wrap break-all">
                  {showDetailOverview
                    ? postDetailData.detailed_overview
                    : postDetailData.detailed_overview.slice(0, 255) + '...'}
                </p>
                {!showDetailOverview && (
                  <button
                    onClick={() => setShowDetailOverview(true)}
                    className="self-end text-text-alternative caption"
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
              <p className="text-text-alternative caption whitespace-pre-wrap break-all">
                {postDetailData.detailed_overview}
              </p>
            )}
          </div>
        </InfoCardLayout>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <InfoCardLayout
            icon={<WorkplaceInformationIcon />}
            title={
              postTranslation.workplaceInformation[
                isEmployerByAccountType(account_type)
              ]
            }
          >
            <>
              <h5 className="pb-1 text-text-normal button-2">
                {postDetailData.workplace_information.main_address ?? ''}
              </h5>
              <p className="pb-2 text-text-alternative caption">
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
            </>
          </InfoCardLayout>
        </div>
        <InfoCardLayout
          icon={<WorkingConditionsIcon />}
          title={
            postTranslation.workplaceConditions[
              isEmployerByAccountType(account_type)
            ]
          }
        >
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                {postTranslation.salary[isEmployerByAccountType(account_type)]}
              </h5>
              <p className="text-text-alternative caption">
                {formatMoney(postDetailData.working_conditions.hourly_rate)}{' '}
                {postTranslation.KRW[isEmployerByAccountType(account_type)]}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                {
                  postTranslation.workPeriod[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <p className="text-text-alternative caption">
                {account_type === UserType.OWNER
                  ? WorkPeriodInfo[
                      postDetailData.working_conditions
                        .work_period as WorkPeriod
                    ].name
                  : postDetailData.working_conditions.work_period
                      .replace(/_/g, ' ')
                      .toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                {
                  postTranslation.workingDaysHours[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <div className="flex flex-col gap-[0.125rem] text-text-alternative caption">
                {postDetailData.working_conditions.work_day_times.map(
                  (value, index) => (
                    <p key={`${value}_${index}`}>
                      {value.day_of_week !== 'NEGOTIABLE' && (
                        <span className="button-2 pr-2">
                          {account_type === UserType.OWNER
                            ? dayOfWeekToKorean(value.day_of_week as DayOfWeek)
                            : value.day_of_week.toLowerCase()}
                        </span>
                      )}
                      {value.work_start_time} - {value.work_end_time}
                    </p>
                  ),
                )}
              </div>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                {
                  postTranslation.jobCategory[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <p className="text-text-alternative caption">
                {account_type === UserType.OWNER
                  ? JobCategoryInfo[
                      postDetailData.working_conditions
                        .job_category as JobCategory
                    ].name
                  : postDetailData.working_conditions.job_category
                      .replace(/_/g, ' ')
                      .toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                {
                  postTranslation.employmentType[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <p className="text-text-alternative caption">
                {account_type === UserType.OWNER
                  ? WorkTypeInfo[
                      postDetailData.working_conditions
                        .employment_type as EmploymentType
                    ].name
                  : postDetailData.working_conditions.employment_type.toLowerCase()}
              </p>
            </div>
          </div>
        </InfoCardLayout>
        <div ref={(e) => (scrollRef.current[2] = e)}>
          <InfoCardLayout
            icon={<CompanyInformationIcon />}
            title={
              postTranslation.companyInformation[
                isEmployerByAccountType(account_type)
              ]
            }
          >
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.companyAddress[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.company_address}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.representativeName[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.representative_name}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.recruiter[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.recruiter}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {
                    postTranslation.contact[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.contact}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  {postTranslation.email[isEmployerByAccountType(account_type)]}
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.email}
                </p>
              </div>
            </div>
          </InfoCardLayout>
        </div>
      </div>
    </section>
  );
};

export default PostDetailContent;
