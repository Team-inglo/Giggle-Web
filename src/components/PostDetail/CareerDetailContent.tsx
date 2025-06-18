import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CareerDetailContentMenu } from '@/constants/postDetail';
import {
  careerDetailTranslation,
  postTranslation,
} from '@/constants/translation';
import { isEmployerByAccountType } from '@/utils/signup';
import { useUserStore } from '@/store/user';
import { EducationLevelInfo } from '@/constants/post';
import { EducationLevel } from '@/types/postCreate/postCreate';
import { UserType } from '@/constants/user';
import { CareerDetailItemType } from '@/types/api/career';
import { IFRAME_STYLE_TAG } from '@/constants/iframe';

const MenuTab = ({
  isSelected,
  onClick,
  label,
}: {
  isSelected: boolean;
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex-1 py-[0.875rem] button-14-semibold ${
      isSelected
        ? 'text-text-strong border-b-2 border-b-primary-dark'
        : 'text-text-assistive'
    }`}
  >
    {label}
  </button>
);

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex gap-3">
    <h5 className="caption-12-regular text-text-alternative">{label}</h5>
    <p className="caption-12-regular text-text-strong">{value}</p>
  </div>
);

const RecruitmentSection = ({
  postDetailData,
  isEmployer,
  accountType,
}: {
  postDetailData: CareerDetailItemType;
  isEmployer: 'ko' | 'en';
  accountType: UserType | undefined;
}) => {
  // 교육 정보 표시
  const formatEducationInfo = () => {
    if (!postDetailData.education) return postTranslation.none[isEmployer];

    const educationText =
      accountType === UserType.OWNER
        ? EducationLevelInfo[postDetailData.education as EducationLevel].name
        : postDetailData.education.toLowerCase();

    return (
      <>
        {educationText}
        {postTranslation.educationAdditional[isEmployer]}
      </>
    );
  };

  const formatVisaInfo = () => {
    return postDetailData.visa?.join(', ')?.replace(/_/g, '-');
  };

  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 heading-18-semibold text-text-strong">
        {postTranslation.recruitmentConditions[isEmployer]}
      </h3>
      <div className="flex flex-col gap-2">
        <InfoItem
          label={postTranslation.recruitmentPeriod[isEmployer]}
          value={`${postDetailData.recruitment_start_date} ~ ${postDetailData.recruitment_end_date}`}
        />
        <InfoItem
          label={postTranslation.numberOfRecruits[isEmployer]}
          value={`${postDetailData.recruitment_number || 0}${postTranslation.people[isEmployer]}`}
        />
        <InfoItem
          label={postTranslation.education[isEmployer]}
          value={formatEducationInfo()}
        />
        <InfoItem
          label={postTranslation.visa[isEmployer]}
          value={formatVisaInfo()}
        />
        <InfoItem
          label={careerDetailTranslation.preferredConditions[isEmployer]}
          value={postDetailData.preferred_conditions}
        />
      </div>
    </article>
  );
};

const DescriptionSection = ({
  details,
  isEmployer,
}: {
  details?: string;
  isEmployer: 'ko' | 'en';
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(0); // iframe 하위 컨텐츠 높이

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.source === iframeRef.current?.contentWindow && // 출처 확인
        event.origin === 'null' && // srcDoc인 경우 origin이 'null'
        event.data?.type === 'setHeight' &&
        typeof event.data.height === 'number'
      ) {
        setIframeHeight(event.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const responsiveContent = useMemo(() => {
    if (!details) return '';

    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            ${IFRAME_STYLE_TAG}
          </head>
          <body>
          <div>${details}</div>
          <script>
            // iframe 내부에서 부모(React)에게 자신의 높이를 알려주는 함수
            function sendHeight() {
            const content = document.documentElement
            if (!content) return;

            // 브라우저가 렌더링을 마친 다음 실행
            requestAnimationFrame(() => {
                const height = Math.max(
                  content.scrollHeight,
                  content.offsetHeight
                );
                window.parent.postMessage({ type: 'setHeight', height }, '*');
              });
            }

            window.addEventListener('load', sendHeight);
            window.addEventListener('DOMContentLoaded', sendHeight);

            // 콘텐츠가 동적으로 변경되는 경우를 감지하기 위해 MutationObserver 사용
            const observer = new MutationObserver(() => {
              sendHeight();
            });

            // 관찰 대상: body 내부의 모든 자식 요소 변화 감지
            observer.observe(document.body, {
              childList: true,
              subtree: true,
              characterData: true,
            });
          </script>
          </body>
        </html>
      `;
  }, [details]);

  // iframe 사용
  const renderWithIframe = useCallback(() => {
    if (!responsiveContent) return <></>;

    return (
      <iframe
        ref={iframeRef}
        className="w-full border-0"
        srcDoc={responsiveContent}
        title="HTML Content"
        sandbox="allow-scripts"
        style={{ height: `${iframeHeight}px` }}
      />
    );
  }, [responsiveContent, iframeHeight]);

  return (
    <article className="w-full px-4 py-6 bg-surface-base">
      <h3 className="pb-5 heading-18-semibold text-text-strong">
        {careerDetailTranslation.description[isEmployer]}
      </h3>
      <div className="w-full">{renderWithIframe()}</div>
    </article>
  );
};

type CareerDetailContentProps = {
  postDetailData: CareerDetailItemType;
};

const CareerDetailContent = ({ postDetailData }: CareerDetailContentProps) => {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  const { account_type } = useUserStore();

  const [selectedMenu, setSelectedMenu] = useState<CareerDetailContentMenu>(
    CareerDetailContentMenu.RECRUITMENT,
  );

  const scrollToSelectedMenu = (menu: CareerDetailContentMenu) => {
    const scrollIndex: { [key: string]: number } = {
      RECRUITMENT: 0,
      DESCRIPTION: 1,
    };

    const target = scrollRef.current[scrollIndex[menu]];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setSelectedMenu(menu);
  };

  const isEmployer = isEmployerByAccountType(account_type);

  return (
    <section className="w-full pb-[8rem] bg-surface-base">
      <nav className="flex w-full bg-surface-base">
        <MenuTab
          isSelected={selectedMenu === CareerDetailContentMenu.RECRUITMENT}
          onClick={() =>
            scrollToSelectedMenu(CareerDetailContentMenu.RECRUITMENT)
          }
          label={postTranslation.recruitment[isEmployer]}
        />
        <MenuTab
          isSelected={selectedMenu === CareerDetailContentMenu.DESCRIPTION}
          onClick={() =>
            scrollToSelectedMenu(CareerDetailContentMenu.DESCRIPTION)
          }
          label={careerDetailTranslation.description[isEmployer]}
        />
      </nav>
      <div className="flex flex-col gap-2 w-full bg-surface-secondary">
        <div ref={(e) => (scrollRef.current[0] = e)}>
          <RecruitmentSection
            postDetailData={postDetailData}
            isEmployer={isEmployer}
            accountType={account_type}
          />
        </div>
        <div ref={(e) => (scrollRef.current[1] = e)}>
          <DescriptionSection
            details={postDetailData.details}
            isEmployer={isEmployer}
          />
        </div>
      </div>
    </section>
  );
};

export default CareerDetailContent;
