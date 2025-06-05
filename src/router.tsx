import { Route, Routes, useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';

import ScrollToTop from '@/components/Common/ScrollToTop';
import Navbar from '@/components/Common/Navbar';
import HomePage from '@/pages/Home/HomePage';
import SigninPage from '@/pages/Signin/SigninPage';
import SignupPage from '@/pages/Signup/SignupPage';
import InformationPage from '@/pages/Information/InformationPage';
import ApplicationDocumentsPage from '@/pages/ApplicationDocuments/ApplicationDocumentsPage';
import PostSearchPage from '@/pages/PostSearch/PostSearchPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import LanguageSettingPage from '@/pages/LanguageSetting/LanguageSettingPage';
import EditProfilePage from '@/pages/EditProfile/EditProfilePage';
import PostDetailPage from '@/pages/PostDetail/PostDetailPage';
import PostApplyPage from '@/pages/PostApply/PostApplyPage';
import ApplicationPage from '@/pages/Application/ApplicationPage';
import ManageResumePage from '@/pages/Resume/ManageResumePage';
import WriteDocumentsPage from '@/pages/WriteDocuments/WriteDocumentsPage';
import ScrappedJobPostsPage from '@/pages/Resume/ScrappedJobPostsPage';
import PostWorkExperiencePage from '@/pages/Resume/SetWorkExperience/PostWorkExperiencePage';
import IntroductionPage from '@/pages/Resume/IntroductionPage';
import PatchWorkExperiencePage from '@/pages/Resume/SetWorkExperience/PatchWorkExperiencePage';
import ApplicationDetailPage from '@/pages/ApplicationDetail/ApplicationDetailPage';
import ApplicationResultPage from '@/pages/ApplicationResult/ApplicationResultPage';
import EmployerPostDetailPage from '@/pages/Employer/PostDetail/EmployerPostDetailPage';
import RequestModifyPage from '@/pages/WriteDocuments/RequestModifyPage';
import DocumentPreview from '@/pages/WriteDocuments/DocumentPreviewPage';
import EmployerPostPage from '@/pages/Employer/Post/EmployerPostPage';
import EmployerApplicantListPage from '@/pages/Employer/ApplicantList/EmployerApplicantListPage';
import EmployerProfilePage from '@/pages/Employer/Profile/EmployerProfilePage';
import EmployerSignupInfoPage from '@/pages/Employer/Signup/EmployerSignupInfoPage';
import PostLanguagePage from '@/pages/Resume/PostLanguagePage';
import EmployerApplicantDetailPage from '@/pages/Employer/ApplicantDetail/EmployerApplicantDetailPage';
import EmployerApplicantResumePage from '@/pages/Employer/ApplicantResume/EmployerApplicantResumePage';
import EmployerApplicantResumeAcceptPage from '@/pages/Employer/ApplicantResumeAccept/EmployerApplicantResumeAcceptPage';
import EmployerEditProfilePage from '@/pages/Employer/EditProfile/EmployerEditProfilePage';
import EmployerSignupPage from '@/pages/Employer/Signup/EmployerSignupPage';
import AlarmPage from '@/pages/Alarm/AlarmPage';
import ChatBotPage from '@/pages/ChatBot/ChatBotPage';
import Splash from '@/components/Splash/Splash';
import ApplicantDocumentsDetailPage from '@/pages/Employer/WriteDocuments/ApplicantDocumentsDetailPage';
import EmployerWriteDocumentsPage from '@/pages/Employer/WriteDocuments/EmployerWriteDocumentsPage';
import DocumentViewerPage from '@/pages/WriteDocuments/DocumentViewerPage';
import PostSearchFilterPage from '@/pages/PostSearch/PostSearchFilterPage';
import { useEffect } from 'react';
import { setRedirectToLogin } from '@/api';
import AccountPage from '@/pages/Profile/AccountPage';
import AboutPage from '@/pages/Profile/AboutPage';
import ChangePasswordPage from '@/pages/Profile/ChangePasswordPage';
import ResetPasswordPage from '@/pages/Signin/ResetPasswordPage';
import ApplicationDetailSchoolPage from '@/pages/ApplicationDetail/ApplicationDetailSchoolPage';
import HomeBannerPage from '@/pages/Home/HomeBannerPage';
import EmployerPostFormPage from '@/pages/Employer/Post/EmployerPostFormPage';
import CareerDetailPage from '@/pages/PostDetail/CareerDetailPage';
import EducationPage from '@/pages/Resume/SetEducation/EducationPage';
import WorkPreferencePage from '@/pages/Resume/WorkPreferencePage';
import EmploySearchDetailPage from '@/pages/Resume/EmploySearchDetailPage';
import EmployerEmployeeSearchPage from '@/pages/Employer/EmployeeSearch/EmployerEmployeeSearchPage';
import EmployerApplicantScrappedPage from '@/pages/Employer/ApplicantScrapped/EmployerApplicantScrappedPage';

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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/banner/:id" element={<HomeBannerPage />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/find-password" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/information" element={<InformationPage />} />

        <Route
          path="/application-documents/:id"
          element={<ApplicationDocumentsPage />}
        />

        <Route path="/search/filter" element={<PostSearchFilterPage />} />
        <Route path="/search" element={<PostSearchPage />} />
        <Route
          path="/employer/search"
          element={<EmployerEmployeeSearchPage />}
        />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/about" element={<AboutPage />} />
        <Route path="/profile/account" element={<AccountPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/manage-resume" element={<ManageResumePage />} />
        <Route path="/profile/language" element={<LanguageSettingPage />} />
        <Route
          path="/profile/change-password"
          element={<ChangePasswordPage />}
        />

        <Route path="/resume/introduction" element={<IntroductionPage />} />
        <Route path="/resume/language/add" element={<PostLanguagePage />} />
        <Route path="/resume/scrapped" element={<ScrappedJobPostsPage />} />
        <Route path="/resume/education" element={<EducationPage />} />
        <Route path="/resume/education/:id" element={<EducationPage />} />
        <Route
          path="/resume/work-experience"
          element={<PostWorkExperiencePage />}
        />
        <Route
          path="/resume/work-experience/edit/:id"
          element={<PatchWorkExperiencePage />}
        />
        <Route path="/career/:id" element={<CareerDetailPage />} />
        <Route
          path="/resume/work-preference"
          element={<WorkPreferencePage />}
        />

        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/apply/:id" element={<PostApplyPage />} />
        <Route path="/write-documents/:id" element={<WriteDocumentsPage />} />

        <Route path="/document-preview/:id" element={<DocumentPreview />} />
        <Route path="/document-view/:id" element={<DocumentViewerPage />} />

        <Route path="/request-modify/:id" element={<RequestModifyPage />} />

        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/application/:id" element={<ApplicationDetailPage />} />
        <Route
          path="/application/:id/school"
          element={<ApplicationDetailSchoolPage />}
        />
        <Route
          path="/application/result/:id"
          element={<ApplicationResultPage />}
        />

        <Route path="/employer/signup" element={<EmployerSignupPage />} />
        <Route
          path="/employer/signup/information"
          element={<EmployerSignupInfoPage />}
        />
        <Route path="/employer/post" element={<EmployerPostPage />} />
        <Route
          path="/employer/post/create/"
          element={<EmployerPostFormPage />}
        />
        <Route
          path="/employer/post/edit/:id"
          element={<EmployerPostFormPage />}
        />
        <Route path="/employer/post/:id" element={<EmployerPostDetailPage />} />
        <Route
          path="/employer/post/:id/applicant"
          element={<EmployerApplicantListPage />}
        />
        <Route
          path="/employer/applicant/:id"
          element={<EmployerApplicantDetailPage />}
        />
        <Route
          path="/employer/applicant/:id/resume"
          element={<EmployerApplicantResumePage />}
        />

        <Route
          path="/employer/applicant/:id/resume/accept"
          element={<EmployerApplicantResumeAcceptPage />}
        />
        <Route
          path="/employer/applicant/document-detail/:id"
          element={<ApplicantDocumentsDetailPage />}
        />
        <Route
          path="/employer/write-documents/:id"
          element={<EmployerWriteDocumentsPage />}
        />
        <Route
          path="/employer/search/:id"
          element={<EmploySearchDetailPage />}
        />
        <Route path="/write-documents" element={<WriteDocumentsPage />} />
        <Route path="/document-preview" element={<DocumentPreview />} />
        <Route path="/request-modify" element={<RequestModifyPage />} />

        <Route path="/employer/profile" element={<EmployerProfilePage />} />
        <Route
          path="/employer/profile/edit"
          element={<EmployerEditProfilePage />}
        />
        <Route
          path="/employer/scrapped"
          element={<EmployerApplicantScrappedPage />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
