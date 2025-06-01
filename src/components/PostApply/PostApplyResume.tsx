import { useGetApplicantResume, useGetResume } from '@/hooks/api/useResume';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useCurrentApplicantIdStore } from '@/store/url';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoCard from '@/components/ManageResume/InfoCard';
import { ManageResumeType } from '@/constants/manageResume';
import MypageCard from '@/components/ManageResume/MypageCard';
import ResumeProfileCard from '@/components/ManageResume/ResumeProfileCard';
import { useCallback } from 'react';

const PostApplyResume = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { currentApplicantId } = useCurrentApplicantIdStore();
  const { account_type } = useUserStore();

  const { data: userData, isPending: userDataPending } = useGetResume(
    account_type === UserType.USER,
  );
  const { data: ownerData, isPending: ownerDataPending } =
    useGetApplicantResume(
      Number(currentApplicantId),
      !isNaN(Number(currentApplicantId)) && account_type === UserType.OWNER
        ? true
        : false,
    );

  const data = account_type === UserType.OWNER ? ownerData : userData;
  const isPending =
    account_type === UserType.OWNER ? ownerDataPending : userDataPending;

  // 재사용 가능한 네비게이션 핸들러
  const navigateToSection = useCallback(
    <T,>(path: string, stateData: T | null = null) => {
      navigate(path, stateData ? { state: { data: stateData } } : undefined);
    },
    [navigate],
  );

  // 주로 사용되는 네비게이션 핸들러들
  const handleIntroductionClick = useCallback(
    () =>
      navigateToSection('/resume/introduction', {
        title: data?.data?.title ?? '',
        introduction: data?.data?.introduction ?? '',
      }),
    [navigateToSection, data?.data?.title, data?.data?.introduction],
  );

  const handleVisaClick = useCallback(
    () => navigateToSection('/profile/edit'),
    [navigateToSection],
  );

  if (isPending) return <LoadingItem />;
  else if (!data?.success) return <></>;

  return (
    <>
      <section className="py-5">
        <ResumeProfileCard
          profileImgUrl={data.data.profile_img_url}
          name={data.data.name}
          gender={data.data.personal_information.gender}
          nationality={data.data.personal_information.nationality}
          birth={data.data.personal_information.birth}
          main_address={data.data.personal_information.main_address}
          phone={data.data.personal_information.phone}
          email={data.data.personal_information.email}
          isPublic={data.data.is_public}
        />
      </section>
      <section className="flex flex-col gap-2 bg-surface-secondary pt-2 pb-2">
        <MypageCard
          type={ManageResumeType.INTRODUCTION}
          introductionData={{
            title: data.data?.title ?? '',
            content: data.data?.introduction ?? '',
          }}
          rightElement={
            <button
              className="caption-12-regular text-text-alternative"
              onClick={handleIntroductionClick}
            >
              {data.data?.introduction ? 'Edit' : 'Add'}
            </button>
          }
        />
        <InfoCard
          title={profileTranslation.visa[isEmployer(pathname)]}
          data={data.data?.visa}
          onAddClick={() => navigateToSection('/')}
          rightElement={
            account_type === UserType.USER && (
              <button
                className="caption-12-regular text-text-alternative"
                onClick={handleVisaClick}
              >
                Edit
              </button>
            )
          }
          renderContent={() => (
            <>
              <p className="pb-2 button-16-semibold text-text-strong">
                {data.data?.visa.visa.replace(/_/g, '-')}
              </p>
              <p className="caption-12-regular text-text-normal">
                {data.data?.visa.description === '-'
                  ? ''
                  : data.data?.visa.description}
              </p>
            </>
          )}
        />
        <MypageCard
          type={ManageResumeType.WORKEXPERIENCE}
          workExperienceData={data.data?.work_experience}
          rightElement={
            <button
              className="caption-12-regular text-text-alternative"
              onClick={() => navigateToSection('/resume/work-experience')}
            >
              Add
            </button>
          }
        />
        <MypageCard
          type={ManageResumeType.EDUCATION}
          educationData={data.data?.education}
          rightElement={
            <button
              className="caption-12-regular text-text-alternative"
              onClick={() => navigateToSection('/resume/education')}
            >
              Add
            </button>
          }
        />
        <MypageCard
          type={ManageResumeType.LANGUAGE}
          languageData={data.data?.languages}
          rightElement={
            <button
              className="caption-12-regular text-text-alternative"
              onClick={() => navigateToSection('/resume/language/add')}
            >
              Add
            </button>
          }
        />
        <MypageCard
          type={ManageResumeType.WORKPREFERENCES}
          workPreferencesData={data.data?.work_preference}
          rightElement={
            <button
              className="caption-12-regular text-text-alternative"
              onClick={() =>
                navigateToSection('/resume/work-preference', {
                  isEdit: true,
                })
              }
            >
              Edit
            </button>
          }
        />
      </section>
    </>
  );
};

export default PostApplyResume;
