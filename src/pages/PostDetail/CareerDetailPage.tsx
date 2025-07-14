import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import { useNavigate, useParams } from 'react-router-dom';
import GlobalIcon from '@/assets/icons/GlobalIcon.svg?react';
import MoneyIcon from '@/assets/icons/MoneyIcon.svg?react';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react';
import BookmarkIcon from '@/assets/icons/BookmarkIcon.svg?react';
import BookmarkCheckedIcon from '@/assets/icons/BookmarkCheckedIcon.svg?react';
import {
  useGetCareerDetail,
  useGetCareerDetailGuest,
  usePutCareerBookmark,
} from '@/hooks/api/useCareer';
import BottomButtonPanel from '@/components/Common/BottomButtonPanel';
import { useEffect, useState } from 'react';
import Button from '@/components/Common/Button';
import { handleGoExternalWebByDynamicUrl } from '@/utils/application';
import CareerDetailContent from '@/components/PostDetail/CareerDetailContent';
import PostDetailImageList from '@/components/PostDetail/PostDetailImageList';

const CareerDetailPage = () => {
  const { account_type } = useUserStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate } = usePutCareerBookmark();

  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const { data: guestData, isLoading: guestLoading } = useGetCareerDetailGuest(
    Number(id),
    !account_type && !isNaN(Number(id)) ? true : false,
  );

  const { data: userData, isLoading: userLoading } = useGetCareerDetail(
    Number(id),
    account_type === UserType.USER && !isNaN(Number(id)) ? true : false,
  );

  const postDetailData = account_type ? userData : guestData;
  const isLoading = account_type ? userLoading : guestLoading;

  const onClickBookmark = async () => {
    if (account_type && !isNaN(Number(id))) {
      mutate(Number(id));
      setIsBookmark(!isBookmark);
    }
  };

  useEffect(() => {
    if (postDetailData?.data?.is_book_marked) setIsBookmark(true);
  }, [setIsBookmark, postDetailData]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPostItem />
      </div>
    );

  if (!postDetailData?.data) return <></>;

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate(-1)}
        hasMenuButton={false}
        title="Detail"
      />
      <PostDetailImageList
        imageData={
          postDetailData.data?.img_urls?.map((value: string, index: number) => {
            return { id: index, img_url: value };
          }) || []
        }
      />
      <article className="w-full px-4 py-5 bg-surface-base">
        <h3 className="pb-1 heading-18-semibold text-text-strong line-clamp-2">
          {postDetailData.data?.title}
        </h3>
        <p className="pb-4 caption-12-regular text-text-normal whitespace-normal">
          {[
            postDetailData.data?.host_name,
            postDetailData.data?.organizer_name,
            postDetailData.data?.address?.split(' ')?.[0],
          ]
            .filter(Boolean)
            .join('ㆍ')}
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <p className="caption-12-regular text-text-strong">
              {postDetailData.data?.recruitment_start_date} ~{' '}
              {postDetailData.data?.recruitment_end_date}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MoneyIcon />
            <p className="caption-12-regular text-text-strong">
              {account_type === UserType.OWNER
                ? `상금 ${postDetailData.data?.reward || 0}원`
                : `Award ${postDetailData.data?.reward || 0}KRW`}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <GlobalIcon />
            <p className="caption-12-regular text-text-strong">
              {postDetailData.data?.visa?.join(', ')?.replace(/_/g, '-')}
            </p>
          </div>
        </div>
      </article>
      <CareerDetailContent postDetailData={postDetailData.data} />
      <BottomButtonPanel>
        <footer className="w-full flex gap-2 z-20">
          {account_type && (
            <button
              className="flex justify-center items-center min-w-[3.25rem] w-[3.25rem] h-[3.25rem] rounded-lg bg-neutral-100"
              onClick={onClickBookmark}
            >
              {isBookmark ? <BookmarkCheckedIcon /> : <BookmarkIcon />}
            </button>
          )}
          <Button
            type={Button.Type.PRIMARY}
            size={Button.Size.LG}
            isFullWidth
            title="Apply Now"
            onClick={() =>
              handleGoExternalWebByDynamicUrl(
                postDetailData.data?.application_url,
              )
            }
          />
        </footer>
      </BottomButtonPanel>
    </>
  );
};

export default CareerDetailPage;
