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

type CareerDetailContentProps = {
  postDetailData: CareerDetailItemType;
};

const CareerDetailContent = ({ postDetailData }: CareerDetailContentProps) => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const { account_type } = useUserStore();

  const [selectedMenu, setSelectedMenu] = useState<CareerDetailContentMenu>(
    CareerDetailContentMenu.RECRUITMENT,
  );
  const [showDetailOverview, setShowDetailOverview] = useState<boolean>(false);

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

  return (
    <section className="w-full pb-[8rem] bg-surface-base">
      <nav className="flex w-full bg-surface-base">
        <button
          onClick={() =>
            scrollToSelectedMenu(CareerDetailContentMenu.RECRUITMENT)
          }
          className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === CareerDetailContentMenu.RECRUITMENT ? 'text-text-strong border-b-2 border-b-primary-dark' : 'text-text-assistive'}`}
        >
          {postTranslation.recruitment[isEmployerByAccountType(account_type)]}
        </button>
        <button
          onClick={() =>
            scrollToSelectedMenu(CareerDetailContentMenu.DESCRIPTION)
          }
          className={`flex-1 py-[0.875rem] button-2 ${selectedMenu === CareerDetailContentMenu.DESCRIPTION ? 'text-text-strong border-b-2 border-b-primary-dark' : 'text-text-assistive'}`}
        >
          {
            careerDetailTranslation.description[
              isEmployerByAccountType(account_type)
            ]
          }
        </button>
      </nav>
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
                  {postDetailData.recruitment_start_date} ~{' '}
                  {postDetailData.recruitment_end_date}
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
                  {postDetailData.recruitment_number || 0}
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
                  {postDetailData.education ? (
                    <>
                      {account_type === UserType.OWNER
                        ? EducationLevelInfo[
                            postDetailData.education as EducationLevel
                          ].name
                        : postDetailData.education.toLowerCase()}
                      {
                        postTranslation.educationAdditional[
                          isEmployerByAccountType(account_type)
                        ]
                      }
                    </>
                  ) : (
                    postTranslation.none[isEmployerByAccountType(account_type)]
                  )}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {postTranslation.visa[isEmployerByAccountType(account_type)]}
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.visa?.join(', ')?.replace(/_/g, '-')}
                </p>
              </div>
              <div className="flex gap-3">
                <h5 className="body-3 text-text-alternative">
                  {
                    careerDetailTranslation.preferredConditions[
                      isEmployerByAccountType(account_type)
                    ]
                  }
                </h5>
                <p className="body-3 text-text-strong">
                  {postDetailData.preferred_conditions}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <article className="w-full px-4 py-6 bg-surface-base">
            <h3 className="pb-5 head-3 text-text-strong">
              {
                careerDetailTranslation.description[
                  isEmployerByAccountType(account_type)
                ]
              }
            </h3>
            <div className="flex flex-col gap-3 w-full">
              {postDetailData.details && postDetailData.details.length > 255 ? (
                <>
                  <p className="text-text-strong body-2 whitespace-pre-wrap break-all">
                    {showDetailOverview
                      ? postDetailData.details
                      : postDetailData.details.slice(0, 255) + '...'}
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
                  {postDetailData.details}
                </p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CareerDetailContent;
