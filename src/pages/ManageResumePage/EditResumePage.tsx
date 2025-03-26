import BaseHeader from '@/components/Common/Header/BaseHeader';
import YellowDocumentIcon from '@/assets/icons/YellowDocumentIcon.svg?react';
import ProfilePicture from '@/components/ManageResume/ProfilePicture';
import ResumeEditSection from '@/components/ManageResume/ResumeEditSection';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetResume } from '@/hooks/api/useResume';
import { LoadingItem } from '@/components/Common/LoadingItem';
import { infoTranslation } from '@/constants/translation';
import { isEmployer } from '@/utils/signup';

const EditResumePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isPending } = useGetResume(true);

  if (isPending) return <LoadingItem />;

  return (
    <>
      {data?.data && (
        <>
          <BaseHeader
            hasBackButton={true}
            onClickBackButton={() => navigate('/profile')}
            hasMenuButton={false}
            title="Manage Resume"
          />
          <section className="py-5 px-4">
            <ProfilePicture
              name={data.data.name}
              profileImg={data.data.profile_img_url}
            />
          </section>
          <section className="flex flex-col p-4 gap-2 bg-[#F4F4F9] pb-32">
            <section className="w-full py-6 px-4">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <YellowDocumentIcon />
                  </div>
                  <h3 className="head-3 text-[#ABB0B9]">Visa</h3>
                </div>
                <p className="ml-auto self-end">
                  <span className="mr-2 button-2 text-[#ABB0B9]">
                    {data.data?.visa.visa.replace(/_/g, '-')}
                  </span>
                  <span className="body-3 text-[#ABB0B9]">
                    {data.data?.visa.description}
                  </span>
                </p>
              </div>
            </section>
            <section className="w-full py-6 px-4">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <YellowDocumentIcon />
                  </div>
                  <h3 className="head-3 text-[#ABB0B9]">
                    Personal Information
                  </h3>
                </div>
              </div>
              <div className="mt-4 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="w-full p-4">
                    <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#ABB0B9]">
                      Gender
                    </h4>
                    <p className="px-[0.25rem] body-3 text-[#ABB0B9]">
                      {data?.data?.personal_information.gender}
                    </p>
                  </div>
                  <div className="w-full p-4">
                    <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#ABB0B9]">
                      Date of birth
                    </h4>
                    <p className="px-[0.25rem] body-3 text-[#ABB0B9]">
                      {data?.data?.personal_information?.birth ??
                        infoTranslation.notEntered[isEmployer(pathname)]}
                    </p>
                  </div>
                  <div className="w-full p-4">
                    <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#ABB0B9]">
                      Nationality
                    </h4>
                    <p className="px-[0.25rem] body-3 text-[#ABB0B9]">
                      {data?.data?.personal_information.nationality ??
                        infoTranslation.notEntered[isEmployer(pathname)]}
                    </p>
                  </div>
                  <div className="w-full p-4">
                    <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#ABB0B9]">
                      Phone Number
                    </h4>
                    <p className="px-[0.25rem] body-3 text-[#ABB0B9]">
                      {data?.data?.personal_information.phone_number}
                    </p>
                  </div>
                  <div className="w-full p-4">
                    <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#ABB0B9]">
                      Email
                    </h4>
                    <p className="px-[0.25rem] body-3 text-[#ABB0B9]">
                      {data?.data?.personal_information.email}
                    </p>
                  </div>
                  <div className="w-full p-4">
                    <h4 className="px-[0.25rem] pb-[0.375rem] button-2 text-[#ABB0B9]">
                      Address
                    </h4>
                    <p className="px-[0.25rem] body-3 text-[#ABB0B9]">
                      {data?.data?.personal_information?.main_address
                        ? `${data?.data?.personal_information.main_address}, ${data?.data?.personal_information.detailed_address}`
                        : infoTranslation.notEntered[isEmployer(pathname)]}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <ResumeEditSection
              introductionData={data.data.introduction}
              workexperienceData={data.data.work_experience}
              educationData={data.data.education}
              languageData={data.data.languages}
            />
          </section>
        </>
      )}
    </>
  );
};

export default EditResumePage;
