import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoCard from '@/components/ManageResume/InfoCard';
import { ManageResumeType } from '@/constants/manageResume';
import MypageCard from '@/components/ManageResume/MypageCard';
import ResumeProfileCard from '@/components/ManageResume/ResumeProfileCard';
import { useCallback } from 'react';
import useResumeData from '@/hooks/useResumeData';
import ButtonText from '@/components/Common/ButtonText';

const PostApplyResume = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { account_type } = useUserStore();
  const { data, isPending } = useResumeData();

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
            <ButtonText
              size={ButtonText.Size.SM}
              variant={ButtonText.Variant.ALTERNATIVE}
              text={data.data?.introduction ? 'Edit' : 'Add'}
              onClick={handleIntroductionClick}
            />
          }
        />
        <InfoCard
          title={profileTranslation.visa[isEmployer(pathname)]}
          data={data.data?.visa}
          onAddClick={() => navigateToSection('/')}
          rightElement={
            account_type === UserType.USER && (
              <ButtonText
                size={ButtonText.Size.SM}
                variant={ButtonText.Variant.ALTERNATIVE}
                text="Edit"
                onClick={handleVisaClick}
              />
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
            <ButtonText
              size={ButtonText.Size.SM}
              variant={ButtonText.Variant.ALTERNATIVE}
              text="Add"
              onClick={() => navigateToSection('/resume/work-experience')}
            />
          }
        />
        <MypageCard
          type={ManageResumeType.EDUCATION}
          educationData={data.data?.education}
          rightElement={
            <ButtonText
              size={ButtonText.Size.SM}
              variant={ButtonText.Variant.ALTERNATIVE}
              text="Add"
              onClick={() => navigateToSection('/resume/education')}
            />
          }
        />
        <MypageCard
          type={ManageResumeType.LANGUAGE}
          languageData={data.data?.languages}
          rightElement={
            <ButtonText
              size={ButtonText.Size.SM}
              variant={ButtonText.Variant.ALTERNATIVE}
              text="Edit"
              onClick={() => navigateToSection('/resume/language/edit')}
            />
          }
        />
        <MypageCard
          type={ManageResumeType.WORKPREFERENCES}
          workPreferencesData={data.data?.work_preference}
          rightElement={
            <ButtonText
              size={ButtonText.Size.SM}
              variant={ButtonText.Variant.ALTERNATIVE}
              text="Edit"
              onClick={() =>
                navigateToSection('/resume/work-preference', {
                  isEdit: true,
                })
              }
            />
          }
        />
      </section>
    </>
  );
};

export default PostApplyResume;
