import { Route, useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { Suspense, lazy, useEffect } from 'react';
import { setRedirectToLogin } from '@/api';

import ScrollToTop from '@/components/Common/ScrollToTop';
import Navbar from '@/components/Common/Navbar';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import Splash from '@/components/Splash/Splash';
import TransitionRoutes from '@/components/Common/TransitionRoutes';

// 모든 페이지 컴포넌트들을 동적 임포트로 변경
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const PostSearchPage = lazy(() => import('@/pages/PostSearch/PostSearchPage'));
const EmployerProfilePage = lazy(
  () => import('@/pages/Employer/Profile/EmployerProfilePage'),
);
const ScrappedJobPostsPage = lazy(
  () => import('@/pages/Resume/ScrappedJobPostsPage'),
);
const EmployerScrappedPage = lazy(
  () => import('@/pages/Employer/Scrapped/EmployerScrappedPage'),
);
const ApplicationDocumentsPage = lazy(
  () => import('@/pages/ApplicationDocuments/ApplicationDocumentsPage'),
);
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));
const ApplicationPage = lazy(
  () => import('@/pages/Application/ApplicationPage'),
);
const EmployerPostPage = lazy(
  () => import('@/pages/Employer/Post/EmployerPostPage'),
);

// 페이지 컴포넌트들을 동적 임포트로 변경
const SigninPage = lazy(() => import('@/pages/Signin/SigninPage'));
const SignupPage = lazy(() => import('@/pages/Signup/SignupPage'));
const InformationPage = lazy(
  () => import('@/pages/Information/InformationPage'),
);
const LanguageSettingPage = lazy(
  () => import('@/pages/LanguageSetting/LanguageSettingPage'),
);
const EditProfilePage = lazy(
  () => import('@/pages/EditProfile/EditProfilePage'),
);
const PostDetailPage = lazy(() => import('@/pages/PostDetail/PostDetailPage'));
const PostApplyPage = lazy(() => import('@/pages/PostApply/PostApplyPage'));
const ManageResumePage = lazy(() => import('@/pages/Resume/ManageResumePage'));
const WriteDocumentsPage = lazy(
  () => import('@/pages/WriteDocuments/WriteDocumentsPage'),
);
const IntroductionPage = lazy(() => import('@/pages/Resume/IntroductionPage'));
const ApplicationDetailPage = lazy(
  () => import('@/pages/ApplicationDetail/ApplicationDetailPage'),
);
const ApplicationResultPage = lazy(
  () => import('@/pages/ApplicationResult/ApplicationResultPage'),
);
const RequestModifyPage = lazy(
  () => import('@/pages/WriteDocuments/RequestModifyPage'),
);
const DocumentPreview = lazy(
  () => import('@/pages/WriteDocuments/DocumentPreviewPage'),
);
const PostLanguagePage = lazy(() => import('@/pages/Resume/PostLanguagePage'));
const AlarmPage = lazy(() => import('@/pages/Alarm/AlarmPage'));
const ChatBotPage = lazy(() => import('@/pages/ChatBot/ChatBotPage'));
const DocumentViewerPage = lazy(
  () => import('@/pages/WriteDocuments/DocumentViewerPage'),
);
const PostSearchFilterPage = lazy(
  () => import('@/pages/PostSearch/PostSearchFilterPage'),
);
const AccountPage = lazy(() => import('@/pages/Profile/AccountPage'));
const AboutPage = lazy(() => import('@/pages/Profile/AboutPage'));
const ChangePasswordPage = lazy(
  () => import('@/pages/Profile/ChangePasswordPage'),
);
const ResetPasswordPage = lazy(
  () => import('@/pages/Signin/ResetPasswordPage'),
);
const ApplicationDetailSchoolPage = lazy(
  () => import('@/pages/ApplicationDetail/ApplicationDetailSchoolPage'),
);
const HomeBannerPage = lazy(() => import('@/pages/Home/HomeBannerPage'));
const CareerDetailPage = lazy(
  () => import('@/pages/PostDetail/CareerDetailPage'),
);
const EducationPage = lazy(
  () => import('@/pages/Resume/SetEducation/EducationPage'),
);
const WorkPreferencePage = lazy(
  () => import('@/pages/Resume/WorkPreferencePage'),
);
const EmploySearchDetailPage = lazy(
  () => import('@/pages/Resume/EmploySearchDetailPage'),
);
const EditLanguagesPage = lazy(
  () => import('@/pages/Resume/EditLanguagesPage'),
);
const WorkExperiencePage = lazy(
  () => import('@/pages/Resume/SetWorkExperience/WorkExperiencePage'),
);

// Employer 관련 페이지들을 별도 청크로 분리
const EmployerPostDetailPage = lazy(
  () => import('@/pages/Employer/PostDetail/EmployerPostDetailPage'),
);
const EmployerApplicantListPage = lazy(
  () => import('@/pages/Employer/ApplicantList/EmployerApplicantListPage'),
);
const EmployerSignupInfoPage = lazy(
  () => import('@/pages/Employer/Signup/EmployerSignupInfoPage'),
);
const EmployerApplicantDetailPage = lazy(
  () => import('@/pages/Employer/ApplicantDetail/EmployerApplicantDetailPage'),
);
const EmployerApplicantResumePage = lazy(
  () => import('@/pages/Employer/ApplicantResume/EmployerApplicantResumePage'),
);
const EmployerApplicantResumeAcceptPage = lazy(
  () =>
    import(
      '@/pages/Employer/ApplicantResumeAccept/EmployerApplicantResumeAcceptPage'
    ),
);
const EmployerEditProfilePage = lazy(
  () => import('@/pages/Employer/EditProfile/EmployerEditProfilePage'),
);
const EmployerSignupPage = lazy(
  () => import('@/pages/Employer/Signup/EmployerSignupPage'),
);
const ApplicantDocumentsDetailPage = lazy(
  () => import('@/pages/Employer/WriteDocuments/ApplicantDocumentsDetailPage'),
);
const EmployerWriteDocumentsPage = lazy(
  () => import('@/pages/Employer/WriteDocuments/EmployerWriteDocumentsPage'),
);
const EmployerPostFormPage = lazy(
  () => import('@/pages/Employer/Post/EmployerPostFormPage'),
);
const EmployerEmployeeSearchPage = lazy(
  () => import('@/pages/Employer/EmployeeSearch/EmployerEmployeeSearchPage'),
);

const Layout = () => {
  // -- 1. 토큰의 만료, 혹은 토큰이 없을 경우의 트리거 --
  const navigate = useNavigate();

  useEffect(() => {
    setRedirectToLogin(() => {
      navigate('/signin');
    });
  }, [navigate]);

  // -- 2. Nav bar 조건부 랜딩 로직 --
  const location = useLocation();
  const { account_type } = useUserStore();

  // Nav bar 컴포넌트가 랜딩되는 페이지
  const showNavbarPaths = () => {
    if (account_type === UserType.OWNER) {
      return [
        '/',
        '/search',
        '/employer/post',
        '/employer/profile',
        '/employer/scrapped',
      ];
    } else
      return ['/', '/search', '/application', '/profile', '/resume/scrapped'];
  };

  const shouldShowNavbar = showNavbarPaths().includes(location.pathname);

  useEffect(() => {
    return () => {
      sessionStorage.setItem('lastPath', location.pathname);
    };
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
      {shouldShowNavbar && <Navbar />}
    </>
  );
};

const Router = () => {
  return (
    <TransitionRoutes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/banner/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <HomeBannerPage />
            </Suspense>
          }
        />
        <Route path="/splash" element={<Splash />} />
        <Route
          path="/chatbot"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ChatBotPage />
            </Suspense>
          }
        />
        <Route
          path="/alarm"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <AlarmPage />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <SigninPage />
            </Suspense>
          }
        />
        <Route
          path="/find-password"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ResetPasswordPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path="/information"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <InformationPage />
            </Suspense>
          }
        />

        <Route
          path="/application-documents/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ApplicationDocumentsPage />
            </Suspense>
          }
        />

        <Route
          path="/search/filter"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <PostSearchFilterPage />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <PostSearchPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/search"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerEmployeeSearchPage />
            </Suspense>
          }
        />

        <Route
          path="/profile"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/profile/about"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="/profile/account"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <AccountPage />
            </Suspense>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EditProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/profile/manage-resume"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ManageResumePage />
            </Suspense>
          }
        />
        <Route
          path="/profile/language"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <LanguageSettingPage />
            </Suspense>
          }
        />
        <Route
          path="/profile/change-password"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ChangePasswordPage />
            </Suspense>
          }
        />

        <Route
          path="/resume/introduction"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <IntroductionPage />
            </Suspense>
          }
        />
        <Route
          path="/resume/language/add"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <PostLanguagePage />
            </Suspense>
          }
        />
        <Route
          path="/resume/language/edit"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EditLanguagesPage />
            </Suspense>
          }
        />
        <Route
          path="/resume/scrapped"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ScrappedJobPostsPage />
            </Suspense>
          }
        />
        <Route
          path="/resume/education"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EducationPage />
            </Suspense>
          }
        />
        <Route
          path="/resume/education/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EducationPage />
            </Suspense>
          }
        />
        <Route
          path="/resume/work-experience"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <WorkExperiencePage />
            </Suspense>
          }
        />
        <Route
          path="/resume/work-experience/edit/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <WorkExperiencePage />
            </Suspense>
          }
        />
        <Route
          path="/career/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <CareerDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/resume/work-preference"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <WorkPreferencePage />
            </Suspense>
          }
        />

        <Route
          path="/post/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <PostDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/post/apply/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <PostApplyPage />
            </Suspense>
          }
        />
        <Route
          path="/write-documents/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <WriteDocumentsPage />
            </Suspense>
          }
        />

        <Route
          path="/document-preview/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <DocumentPreview />
            </Suspense>
          }
        />
        <Route
          path="/document-view/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <DocumentViewerPage />
            </Suspense>
          }
        />

        <Route
          path="/request-modify/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <RequestModifyPage />
            </Suspense>
          }
        />

        <Route
          path="/application"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ApplicationPage />
            </Suspense>
          }
        />
        <Route
          path="/application/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ApplicationDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/application/:id/school"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ApplicationDetailSchoolPage />
            </Suspense>
          }
        />
        <Route
          path="/application/result/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ApplicationResultPage />
            </Suspense>
          }
        />

        <Route
          path="/employer/signup"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerSignupPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/signup/information"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerSignupInfoPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/post"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerPostPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/post/create/"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerPostFormPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/post/edit/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerPostFormPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/post/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerPostDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/post/:id/applicant"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerApplicantListPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/applicant/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerApplicantDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/applicant/:id/resume"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerApplicantResumePage />
            </Suspense>
          }
        />

        <Route
          path="/employer/applicant/:id/resume/accept"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerApplicantResumeAcceptPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/applicant/document-detail/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <ApplicantDocumentsDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/write-documents/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerWriteDocumentsPage />
            </Suspense>
          }
        />
        <Route
          path="/employer/search/:id"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmploySearchDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/write-documents"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <WriteDocumentsPage />
            </Suspense>
          }
        />
        <Route
          path="/document-preview"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <DocumentPreview />
            </Suspense>
          }
        />
        <Route
          path="/request-modify"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <RequestModifyPage />
            </Suspense>
          }
        />

        <Route
          path="/employer/profile"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/employer/profile/edit"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerEditProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/employer/scrapped"
          element={
            <Suspense fallback={<LoadingOverLay />}>
              <EmployerScrappedPage />
            </Suspense>
          }
        />
      </Route>
    </TransitionRoutes>
  );
};

export default Router;
