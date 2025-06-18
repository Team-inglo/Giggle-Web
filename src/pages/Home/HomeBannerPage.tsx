import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { IFRAME_STYLE_TAG } from '@/constants/iframe';
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
      `${IFRAME_STYLE_TAG}
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
