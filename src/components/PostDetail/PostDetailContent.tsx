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
import { infoTranslation } from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';

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
            title="Recruitment Conditions"
          >
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Recruitment Period
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions?.recruitment_deadline}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Education
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.education.toLowerCase()}{' '}
                  requirement
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Number of recruits
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.number_of_recruits}{' '}
                  people
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Visa
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.visa
                    .join(', ')
                    .replace(/_/g, '-')}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Gender
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.recruitment_conditions.gender.toLowerCase()}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Preferred Conditions
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
          title="Detailed Overview"
        >
          <div className="flex flex-col gap-3 w-full">
            <p className="text-text-normal button-2">Details</p>
            {postDetailData.detailed_overview.length > 255 ? (
              <>
                <p className="text-text-alternative caption">
                  {showDetailOverview
                    ? postDetailData.detailed_overview
                    : postDetailData.detailed_overview.slice(0, 255) + '...'}
                </p>
                {!showDetailOverview && (
                  <button
                    onClick={() => setShowDetailOverview(true)}
                    className="self-end text-text-alternative caption"
                  >
                    See more
                  </button>
                )}
              </>
            ) : (
              <p className="text-text-alternative caption">
                {postDetailData.detailed_overview}
              </p>
            )}
          </div>
        </InfoCardLayout>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <InfoCardLayout
            icon={<WorkplaceInformationIcon />}
            title="Workplace Information"
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
          title="Working Conditions"
        >
          <div className="flex flex-col gap-4 w-full">
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                Salary
              </h5>
              <p className="text-text-alternative caption">
                {formatMoney(postDetailData.working_conditions.hourly_rate)} KRW
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                Work Period
              </h5>
              <p className="text-text-alternative caption">
                {postDetailData.working_conditions.job_category
                  .replace(/_/g, ' ')
                  .toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                Working Days & Hours
              </h5>
              <div className="flex flex-col gap-[0.125rem] text-text-alternative caption">
                {postDetailData.working_conditions.work_day_times.map(
                  (value, index) => (
                    <p key={`${value}_${index}`}>
                      {value.day_of_week !== 'NEGOTIABLE' && (
                        <span className="button-2 pr-2">
                          {value.day_of_week.toLowerCase()}
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
                Working Hours
              </h5>
              <p className="text-text-alternative caption">
                {/* day_of_week이 요일무관인 경우, start time, end time에도 예외처리 */}
                {postDetailData.working_conditions.work_day_times
                  .filter(
                    (value) =>
                      !(
                        value.work_start_time === '시간' &&
                        value.work_end_time === '무관'
                      ),
                  )
                  .map(
                    (value) =>
                      `${value.work_start_time} - ${value.work_end_time}`,
                  )
                  .join(', ')}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                Job Category
              </h5>
              <p className="text-text-alternative caption">
                {postDetailData.working_conditions.job_category
                  .replace(/_/g, ' ')
                  .toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.125rem] text-text-normal button-2">
                Employment Type
              </h5>
              <p className="text-text-alternative caption">
                {postDetailData.working_conditions.employment_type.toLowerCase()}
              </p>
            </div>
          </div>
        </InfoCardLayout>
        <div ref={(e) => (scrollRef.current[2] = e)}>
          <InfoCardLayout
            icon={<CompanyInformationIcon />}
            title="Company Information"
          >
            <div className="flex flex-col gap-4 w-full">
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Company Address
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.company_address}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Representative Name
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.representative_name}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Recruiter
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.recruiter}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Contact
                </h5>
                <p className="text-text-alternative caption">
                  {postDetailData.company_information.contact}
                </p>
              </div>
              <div>
                <h5 className="pb-[0.125rem] text-text-normal button-2">
                  Email
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
