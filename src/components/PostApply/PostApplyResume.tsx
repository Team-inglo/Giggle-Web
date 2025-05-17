import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import { useGetApplicantResume, useGetResume } from '@/hooks/api/useResume';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { useCurrentApplicantIdStore } from '@/store/url';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { profileTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';
import { useLocation, useNavigate } from 'react-router-dom';
import InfoCard from '../ManageResume/InfoCard';
import { ManageResumeType } from '@/constants/manageResume';
import MypageCard from '../ManageResume/MypageCard';

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

  if (isPending) return <LoadingItem />;
  else if (!data?.success) return <></>;

  return (
    <>
      <section className="py-5 px-4">
        <ProfilePicture
          name={data.data.name}
          profileImg={data.data.profile_img_url}
        />
      </section>
      <section className="flex flex-col gap-2 bg-surface-secondary pt-2 pb-2">
        <MypageCard
          type={ManageResumeType.INTRODUCTION}
          introductionData={data.data?.introduction}
          rightElement={
            <button
              className="body-3 text-text-alternative"
              onClick={() =>
                navigate(`/resume/introduction`, {
                  state: { data: data.data?.introduction },
                })
              }
            >
              {data.data?.introduction && 'Edit'}
              {!data.data?.introduction && 'Add'}
            </button>
          }
        />
        <InfoCard
          title={profileTranslation.visa[isEmployer(pathname)]}
          data={data.data?.visa}
          onAddClick={() => {
            navigate(`/`);
          }}
          rightElement={
            <button
              className="body-3 text-text-alternative"
              onClick={() => navigate(`/resume/visa`)}
            >
              Edit
            </button>
          }
          renderContent={() => (
            <>
              <p className="pb-2 button-1 text-text-strong">
                {data.data?.visa.visa.replace(/_/g, '-')}
              </p>
              <p className="body-3 text-text-normal">
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
              className="body-3 text-text-alternative"
              onClick={() => navigate(`/resume/work-experience`)}
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
              className="body-3 text-text-alternative"
              onClick={() => navigate(`/resume/education`)}
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
              className="body-3 text-text-alternative"
              onClick={() => navigate(`/resume/language/add`)}
            >
              Add
            </button>
          }
        />
        <MypageCard
          type={ManageResumeType.WORKPREFERENCES}
          workPreferencesData={data.data?.work_preference}
          rightElement={
            <button className="body-3 text-text-alternative">Add</button>
          }
        />
      </section>
    </>
  );
};

export default PostApplyResume;
