import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import {
  useGetGuestBannerDetail,
  useGetUserBannerDetail,
} from '@/hooks/api/useBanner';
import useNavigateBack from '@/hooks/useNavigateBack';
import { useUserStore } from '@/store/user';
import { useParams } from 'react-router-dom';

const HomeBannerPage = () => {
  const handleBackButtonClick = useNavigateBack();
  const { id } = useParams();
  const { account_type } = useUserStore();

  const { data: guestData, isLoading: guestLoading } = useGetGuestBannerDetail(
    Number(id),
    !account_type && !isNaN(Number(id)) ? true : false,
  );

  const { data: userData, isLoading: userLoading } = useGetUserBannerDetail(
    Number(id),
    account_type && !isNaN(Number(id)) ? true : false,
  );

  const bannerData = account_type ? userData : guestData;
  const isLoading = account_type ? userLoading : guestLoading;

  // iframe 사용
  const renderWithIframe = () => {
    if (!bannerData?.data?.content) return <></>;

    const responsiveContent = bannerData.data.content.replace(
      '</head>',
      `<style>
        :root {
          /* 기본 폰트 크기 설정 */
          font-size: calc(12px + 0.4vw);
        }
        
        /* 디바이스 크기별 세부 조정 */
        @media screen and (max-width: 320px) {
          :root { font-size: 9px; }
        }
        @media screen and (min-width: 768px) {
          :root { font-size: 16px; }
        }
        @media screen and (min-width: 1024px) {
          :root { font-size: 18px; }
        }
  
        /* 컨텐츠별 상대적 크기 설정 */
        body { font-size: 1rem; }
        .version-info { font-size: 0.875rem; }
        h1 { font-size: 1.5rem; }
        h2 { font-size: 1.25rem; }
        .box { font-size: 1rem; }
      </style>
      </head>`,
    );

    return (
      <iframe
        className="w-full h-screen border-0"
        srcDoc={responsiveContent}
        title="HTML Content"
        sandbox="allow-scripts"
      />
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BaseHeader
        hasBackButton
        hasMenuButton={false}
        onClickBackButton={handleBackButtonClick}
      />
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <LoadingPostItem />
        </div>
      ) : (
        renderWithIframe()
      )}
    </div>
  );
};

export default HomeBannerPage;
