import { useRef, useState } from 'react';
import PostDetailContentMenuBar from '@/components/PostDetail/PostDetailContentMenuBar';
import { PostDetailContentMenu } from '@/constants/postDetail';
import Tag from '@/components/Common/Tag';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { PostDetailItemType } from '@/types/postDetail/postDetailItem';
import { formatMoney } from '@/utils/formatMoney';

type PostDetailContentProps = {
  postDetailData: PostDetailItemType;
};

const PostDetailContent = ({ postDetailData }: PostDetailContentProps) => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

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
    <section className="w-full pb-[8rem] px-[1.5rem] bg-white">
      <PostDetailContentMenuBar
        selectedMenu={selectedMenu}
        scrollToSelectedMenu={scrollToSelectedMenu}
      />
      <div className="flex flex-col gap-[1.125rem] w-full pt-[1.5rem]">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Recruiment Conditions
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Recruitment Period
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.recruitment_conditions?.recruitment_dead_line ??
                  'Open recruitment'}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Education</h5>
              <p className="text-[#656565] caption">
                {postDetailData.recruitment_conditions.education.toLowerCase()}{' '}
                requirement
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Number of recruits
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.recruitment_conditions.number_of_recruits}{' '}
                people
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Visa</h5>
              <p className="text-[#656565] caption">
                {postDetailData.recruitment_conditions.visa
                  .join(', ')
                  .replace(/_/g, '-')}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Gender</h5>
              <p className="text-[#656565] caption">
                {postDetailData.recruitment_conditions.gender.toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Preferred Conditions
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.recruitment_conditions.preferred_conditions}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Detailed Overview
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            {postDetailData.detailed_overview.length > 255 ? (
              <>
                <p className="text-[#656565] body-3">
                  {showDetailOverview
                    ? postDetailData.detailed_overview
                    : postDetailData.detailed_overview.slice(0, 255) + '...'}
                </p>
                {!showDetailOverview && (
                  <button onClick={() => setShowDetailOverview(true)}>
                    <Tag
                      value={'Read more'}
                      padding="0.375rem 0.875rem"
                      isRounded={true}
                      hasCheckIcon={false}
                      backgroundColor="#FEF387"
                      color="#1E1926"
                      fontStyle="body-3"
                    />
                  </button>
                )}
              </>
            ) : (
              <p className="text-[#656565] body-3">
                {postDetailData.detailed_overview}
              </p>
            )}
          </div>
        </div>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <div className="flex flex-col gap-[0.25rem] px-[0.5rem] pb-[0.5rem]">
            <h3 className="text-[#1E1926] head-3">Workplace Information</h3>
          </div>
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
        </div>
        <div>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Working Conditions
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Salary</h5>
              <p className="text-[#656565] caption">
                {formatMoney(postDetailData.working_conditions.hourly_rate)} KRW
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Work Period
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.working_conditions.job_category
                  .replace(/_/g, ' ')
                  .toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Working Days
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.working_conditions.work_day_times
                  .map((value) => value.day_of_week.toLowerCase())
                  .join(', ')}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Working Hours
              </h5>
              <p className="text-[#656565] caption">
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
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Job Category
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.working_conditions.job_category
                  .replace(/_/g, ' ')
                  .toLowerCase()}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Employment Type
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.working_conditions.employment_type.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
        <div ref={(e) => (scrollRef.current[2] = e)}>
          <h3 className="px-[0.5rem] pb-[0.5rem] text-[#1E1926] head-3">
            Company Information
          </h3>
          <div className="flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.563rem] bg-[#F4F4F9]">
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Company Address
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.company_information.company_address}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">
                Representative Name
              </h5>
              <p className="text-[#656565] caption">
                {postDetailData.company_information.representative_name}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Recruiter</h5>
              <p className="text-[#656565] caption">
                {postDetailData.company_information.recruiter}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Contact</h5>
              <p className="text-[#656565] caption">
                {postDetailData.company_information.contact}
              </p>
            </div>
            <div>
              <h5 className="pb-[0.5rem] text-[#656565] button-2">Email</h5>
              <p className="text-[#656565] caption">
                {postDetailData.company_information.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetailContent;
