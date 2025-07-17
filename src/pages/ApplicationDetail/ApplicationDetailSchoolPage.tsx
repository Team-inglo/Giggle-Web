import BaseHeader from '@/components/Common/Header/BaseHeader';
import PageTitle from '@/components/Common/PageTitle';
import {
  useGetSchoolInfo,
  usePatchContactCoordinator,
} from '@/hooks/api/useApplication';
import useNavigateBack from '@/hooks/useNavigateBack';
import RecruiterIcon from '@/assets/icons/ApplicationDetail/RecruiterIcon.svg?react';
import { useParams } from 'react-router-dom';
import Button from '@/components/Common/Button';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { handleGoExternalWeb } from '@/utils/application';

const ApplicationDetailSchoolPage = () => {
  const { id } = useParams();

  const handleBackButtonClick = useNavigateBack();
  const { data, isLoading } = useGetSchoolInfo();
  const { mutate } = usePatchContactCoordinator(Number(id));

  const handleClickNextStep = () => {
    if (isNaN(Number(id))) return;
    mutate(Number(id));
  };

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={handleBackButtonClick}
        hasMenuButton={false}
        title="Check document review"
      />
      <PageTitle
        title={`Get these documents ready\n before proceeding! ✅`}
        content={`Make sure you have all required documents before contacting the employer or submitting your application.`}
      />
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <LoadingPostItem />
        </div>
      ) : (
        <>
          <main className="w-full px-4 flex flex-col gap-8">
            <section>
              <h5 className="pb-2 body-14-regular text-text-alternative">
                Check the documents 👀
              </h5>
              <ul className="w-full p-4 flex flex-col gap-1 bg-primary-neutral rounded-lg">
                <li className="caption-12-regular text-text-alternative">
                  📌 Work Permit Form
                </li>
                <li className="caption-12-regular text-text-alternative">
                  📌 Employment Contract
                </li>
                <li className="caption-12-regular text-text-alternative">
                  📌 Integrated Application Form
                </li>
                <li className="caption-12-regular text-text-alternative">
                  📌 Residence Card
                </li>
                <li className="caption-12-regular text-text-alternative">
                  📌 Passport
                </li>
                <li className="caption-12-regular text-text-alternative">
                  📌 Business Registration Certificate
                </li>
              </ul>
            </section>
            {data?.data?.school_name ? (
              <>
                <section>
                  <h5 className="pb-2 body-14-regular text-text-alternative">
                    Check the address 👀
                  </h5>
                  <p className="button-16-semibold text-text-strong">
                    📍 {data?.data?.school_name ?? ''}{' '}
                    {data?.data?.institute_name ?? ''}
                  </p>
                  <p className="pb-3 caption-12-regular text-text-strong">
                    {data?.data?.address?.address_detail}
                  </p>
                </section>
                <section>
                  <h5 className="pb-2 body-14-regular text-text-alternative">
                    Need to reach the coordinator? 📞
                  </h5>
                  <button className="w-full p-4 flex items-center gap-4 bg-surface-secondary rounded-lg">
                    <RecruiterIcon />
                    <div>
                      <p className="pb-1 button-16-semibold text-text-strong">
                        {data?.data?.coordinator_name}
                      </p>
                      <p className="body-14-regular text-text-alternative">
                        {data?.data?.coordinator_phone_number}
                      </p>
                    </div>
                  </button>
                </section>
              </>
            ) : (
              <section>
                <h5 className="pb-2 body-14-regular text-text-alternative">
                  Check the information 👀
                </h5>
                <div className="w-full p-4 flex flex-col items-center bg-surface-secondary rounded-lg">
                  <EmptyJobIcon />
                  <p className="mt-1 mb-4 caption-12-regular text-text-alternative">
                    Can’t find your school coordinator info ?
                  </p>
                  <button
                    className="mb-2 py-2 px-[0.625rem] border border-border-normal rounded-lg bg-surface-base body-14-regular text-surface-invert"
                    onClick={() => handleGoExternalWeb('googleform')}
                  >
                    Contact us
                  </button>
                  <button
                    className="caption-12-regular text-text-alternative underline"
                    onClick={() => handleGoExternalWeb('kakao')}
                  >
                    Don't you have KakaoTalk? Click here
                  </button>
                </div>
              </section>
            )}
          </main>
          <footer className="w-full pt-3 pb-9 px-4 flex flex-col gap-2">
            <Button
              type={Button.Type.PRIMARY}
              size={Button.Size.LG}
              isFullWidth
              title={'Go to next step'}
              onClick={handleClickNextStep}
            />
            <Button
              type={Button.Type.NEUTRAL}
              size={Button.Size.LG}
              isFullWidth
              title={'Maybe later'}
              onClick={handleBackButtonClick}
            />
          </footer>
        </>
      )}
    </>
  );
};

export default ApplicationDetailSchoolPage;
