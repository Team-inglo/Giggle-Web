import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import {
  useGetGuestBannerOverview,
  useGetUserBannerOverview,
} from '@/hooks/api/useBanner';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { BannerListType } from '@/types/api/banner';
import { isEmployerByAccountType } from '@/utils/signup';
import { bannerTranslation } from '@/constants/translation';
import { useNavigate } from 'react-router-dom';

const RenderBannerList = ({
  data,
  isLoading,
  currentIndex,
  language,
}: {
  data: BannerListType[];
  isLoading: boolean;
  currentIndex: number;
  language: 'ko' | 'en';
}) => {
  const navigate = useNavigate();

  const handleClickBannerDetail = (id: number) => {
    navigate(`/banner/${id}`);
  };

  if (isLoading)
    return (
      <div className="w-full h-[10.5rem] rounded-lg flex justify-center items-center">
        <LoadingPostItem />
      </div>
    );

  if (!data?.length)
    return (
      <div className="w-full h-[10.5rem] rounded-lg flex flex-col justify-center items-center bg-primary-neutral text-center">
        <p className="button-14-semibold text-text-alternative">
          {bannerTranslation.emptyTitle[language]}
        </p>
        <p className="caption-12-regular text-text-alternative">
          {bannerTranslation.emptyContent[language]}
        </p>
      </div>
    );

  return (
    <>
      <div className="w-full flex gap-2">
        {data.map((value: BannerListType) => (
          <img
            key={value.id}
            src={value.img_url}
            alt="banner image"
            className="w-full min-w-full h-[10.5rem] rounded-lg object-cover object-center"
            onClick={() => handleClickBannerDetail(value.id)}
          />
        ))}
      </div>
      <div className="absolute right-3 bottom-3 py-1 px-2 caption-12-regular text-text-invert bg-[#121212B2] rounded-3xl">
        {currentIndex + 1}/{data.length}
      </div>
    </>
  );
};

const HomeBanner = () => {
  const { account_type, name } = useUserStore();
  const isGuest = account_type === undefined;
  const isUser = account_type !== undefined;

  const { data: guestData, isLoading: guestLoading } =
    useGetGuestBannerOverview(isGuest);
  const { data: userData, isLoading: userLoading } =
    useGetUserBannerOverview(isUser);

  const bannerData = isUser ? userData : guestData;
  const isLoading = isUser ? userLoading : guestLoading;

  const [emblaRef, embla] = useEmblaCarousel({ dragFree: true, loop: false }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const getGreetingMessage = (accountType?: UserType) => {
    switch (accountType) {
      case UserType.OWNER:
        return `환영해요, ${name.replace(/-/g, ' ')}님!`;
      case UserType.USER:
        return `Welcome, ${name.replace(/-/g, ' ')}`;
      default:
        return 'Welcome!';
    }
  };

  // 페이지 변경 감지
  const onSelect = useCallback(() => {
    if (!embla) return;
    setCurrentIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="w-full px-4">
      <div className="pt-8">
        <p className="pb-1 body-14-regular text-[#9397A1]">
          {getGreetingMessage(account_type)}
        </p>
        <h2 className="heading-20-semibold text-[#0A0909]">
          {account_type === UserType.OWNER
            ? '필요한 인재를 필요한 순간에 🤝'
            : 'Find your perfect job'}
        </h2>
      </div>
      <section className="w-full mt-4 overflow-hidden relative" ref={emblaRef}>
        <RenderBannerList
          data={bannerData?.data?.banner_list}
          isLoading={isLoading}
          currentIndex={currentIndex}
          language={isEmployerByAccountType(account_type)}
        />
      </section>
    </div>
  );
};

export default HomeBanner;
