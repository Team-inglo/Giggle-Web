import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/Common/Icon';
import ChevronRightIcon from '@/assets/icons/Chevron.svg?react';
import { motion } from 'framer-motion';
import Button from '@/components/Common/Button';
import { useGetResumeProgress } from '@/hooks/api/useResume';

// 공통 텍스트 컴포넌트
const BannerTextContent = ({ text }: { text: string }) => (
  <div className="flex flex-col items-start gap-0.5">
    <h2 className="button-14-semibold text-text-strong">
      Let's finish your resume
    </h2>
    <p className="caption-12-regular text-text-alternative">{text}</p>
  </div>
);

// 이력서 진행률을 시각적으로 표시하는 프로그레스 바 컴포넌트
const ProgressBar = ({
  resumeProgress,
  showPercentage = true,
}: {
  resumeProgress: number;
  showPercentage?: boolean;
}) => {
  return (
    <section>
      <div className="flex items-center">
        <div className="w-full h-2 rounded-full bg-surface-tertiary">
          <motion.div
            className="h-2 rounded-full bg-status-blue-300"
            initial={{ width: 0 }}
            animate={{ width: `${resumeProgress}%` }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>
        {showPercentage && (
          <p className="pl-[0.675rem] button-14-semibold text-status-blue-300">
            {resumeProgress}%
          </p>
        )}
      </div>
    </section>
  );
};

type BannerProps = {
  resumeProgress: number;
  onClick?: () => void;
  text?: string;
};

// 홈 화면용 배너: 전체 클릭 가능, 클릭 시 /profile/manage-resume 페이지로 이동, 우측 상단 화살표 아이콘 표시
const HomeResumeHelperBanner = ({
  resumeProgress,
  onClick,
  text,
}: BannerProps) => {
  return (
    <div
      className="flex flex-col p-4 gap-3 border border-border-disabled rounded-xl"
      onClick={onClick}
    >
      <section className="flex items-start justify-between">
        <BannerTextContent text={text || ''} />
        <div
          className="w-6 h-6 flex items-center justify-center"
          aria-label="go to manage resume page"
        >
          <Icon name="arrow-right" icon={ChevronRightIcon} />
        </div>
      </section>
      <ProgressBar resumeProgress={resumeProgress} />
    </div>
  );
};

// 프로필 페이지용 배너: '이력서 관리' 버튼을 통해서만 페이지 이동 가능
const ProfileResumeHelperBanner = ({
  resumeProgress,
  onClick,
  text,
}: BannerProps) => (
  <div className="flex flex-col p-4 gap-3 border border-border-disabled rounded-xl">
    <section className="flex items-start justify-between">
      <BannerTextContent text={text || ''} />
    </section>
    <ProgressBar resumeProgress={resumeProgress} />
    <Button
      type={Button.Type.NEUTRAL}
      size={Button.Size.MD}
      onClick={onClick}
      title="Manage your Resume"
    />
  </div>
);

// 이력서 관리 페이지용 배너: 배경색, 레이아웃 변경 및 우측 상단에 진행률 텍스트 표시
const ManageResumeHelperBanner = ({ resumeProgress, text }: BannerProps) => (
  <div className="flex flex-col p-4 gap-3 bg-blue-50">
    <section className="flex items-start justify-between">
      <BannerTextContent text={text || ''} />
      <p className="button-14-semibold text-status-blue-300">
        {resumeProgress}%
      </p>
    </section>
    <ProgressBar resumeProgress={resumeProgress} showPercentage={false} />
  </div>
);

// 이력서 완성을 독려하는 배너 컴포넌트
const ResumeHelperBanner = () => {
  const { account_type } = useUserStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // TODO: API 연동 시 실제 이력서 진행도를 받아와야 함
  const { data: resumeProgress } = useGetResumeProgress();

  const isUser = account_type === UserType.USER;
  const isResumeIncomplete = Number(resumeProgress?.data.completion_rate) < 100;
  // 일반 유저가 아니거나 이력서가 100% 완성된 경우에는 배너를 렌더링하지 않음
  if (!isUser || !isResumeIncomplete) return null;

  const handleNavigate = () => navigate('/profile/manage-resume');

  // 현재 경로(pathname)에 따라 다른 버전의 배너를 렌더링
  switch (pathname) {
    // 홈 화면
    case '/':
      return (
        <HomeResumeHelperBanner
          resumeProgress={resumeProgress?.data.completion_rate || 0}
          text={resumeProgress?.data.completion_text}
          onClick={handleNavigate}
        />
      );
    // 프로필 페이지
    case '/profile':
      return (
        <ProfileResumeHelperBanner
          resumeProgress={resumeProgress?.data.completion_rate || 0}
          text={resumeProgress?.data.completion_text}
          onClick={handleNavigate}
        />
      );
    // 이력서 관리 페이지
    case '/profile/manage-resume':
      return (
        <ManageResumeHelperBanner
          resumeProgress={resumeProgress?.data.completion_rate || 0}
          text={resumeProgress?.data.completion_text}
        />
      );
    default:
      return null;
  }
};

export default ResumeHelperBanner;
