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

  return (
    <section className="w-full pb-[8rem] bg-surface-base">
      <PostDetailContentMenuBar
        selectedMenu={selectedMenu}
        scrollToSelectedMenu={scrollToSelectedMenu}
      />
      <div className="flex flex-col gap-2 w-full bg-surface-secondary">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <article className="w-full px-4 py-6 bg-surface-base">
            <h3 className="pb-5 head-3 text-text-strong">
              {
                postTranslation.recruitmentConditions[
                  isEmployerByAccountType(account_type)
                ]
              }
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.recruitmentPeriod[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.recruitment_conditions
                    ?.recruitment_deadline === '상시모집'
                    ? postTranslation.dDay[
                        isEmployerByAccountType(account_type)
                      ]
                    : `${calculateDays(postDetailData.recruitment_conditions?.recruitment_deadline)}${postTranslation.daysLeft[isEmployerByAccountType(account_type)]}`}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.ageRestriction[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.recruitment_conditions.age_restriction ===
                  null
                    ? postTranslation.none[
                        isEmployerByAccountType(account_type)
                      ]
                    : `${postDetailData.recruitment_conditions.age_restriction}${postTranslation.ageRestrictionAdditional[isEmployerByAccountType(account_type)]}`}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.numberOfRecruits[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.recruitment_conditions.number_of_recruits}{' '}
                  {
                    postTranslation.people[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.education[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
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
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {postTranslation.visa[isEmployerByAccountType(account_type)]}
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.recruitment_conditions.visa
                    .join(', ')
                    .replace(/_/g, '-')}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.gender[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {account_type === UserType.OWNER
                    ? genderInfo[
                        postDetailData.recruitment_conditions.gender as Gender
                      ].name
                    : postDetailData.recruitment_conditions.gender.toLowerCase()}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.preferredConditions[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
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
          </article>
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
        <article className="w-full px-4 py-6 bg-surface-base">
          <h3 className="pb-5 head-3 text-text-strong">
            {
              postTranslation.workplaceConditions[
                isEmployerByAccountType(account_type)
              ]
            }
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <h5 className="body-3 text-text-alternative">
                {
                  postTranslation.employmentType[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <p className="body-3 text-text-strong">
                {account_type === UserType.OWNER
                  ? WorkTypeInfo[
                      postDetailData.working_conditions
                        .employment_type as EmploymentType
                    ].name
                  : postDetailData.working_conditions.employment_type.toLowerCase()}
              </p>
            </div>
            <div className="flex gap-3">
              <h5 className="body-3 text-text-alternative">
                {
                  postTranslation.jobCategory[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <p className="body-3 text-text-strong">
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
            <div className="flex gap-3">
              <h5 className="body-3 text-text-alternative">
                {
                  postTranslation.workPeriod[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <p className="body-3 text-text-strong">
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
            <div className="flex gap-3">
              <h5 className="body-3 text-text-alternative">
                {postTranslation.salary[isEmployerByAccountType(account_type)]}
              </h5>
              <p className="body-3 text-text-strong">
                {formatMoney(postDetailData.working_conditions.hourly_rate)}{' '}
                {postTranslation.KRW[isEmployerByAccountType(account_type)]}
              </p>
            </div>
            <div className="flex gap-3">
              <h5 className="body-3 text-text-alternative">
                {
                  postTranslation.workingDaysHours[
                    isEmployerByAccountType(account_type)
                  ]
                }
              </h5>
              <div className="flex flex-wrap body-3 text-text-strong">
                {postDetailData.working_conditions.work_day_times.map(
                  (value, index) => (
                    <p key={`${value}_${index}`}>
                      {value.day_of_week !== 'NEGOTIABLE' && (
                        <span className="pr-2">
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
          </div>
        </article>
        <div ref={(e) => (scrollRef.current[2] = e)}>
          <article className="w-full px-4 py-6 bg-surface-base">
            <h3 className="pb-5 head-3 text-text-strong">
              {
                postTranslation.companyInformation[
                  isEmployerByAccountType(account_type)
                ]
              }
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.companyAddress[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.company_information.company_address}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.representativeName[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.company_information.representative_name}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.recruiter[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.company_information.recruiter}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    postTranslation.contact[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.company_information.contact}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {postTranslation.email[isEmployerByAccountType(account_type)]}
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.company_information.email}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PostDetailContent;
