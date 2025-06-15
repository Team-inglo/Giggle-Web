import { CompanyImageUrlType } from '@/types/postDetail/postDetailItem';
import { useCallback, useEffect, useState } from 'react';
import CloseWhiteIcon from '@/assets/icons/CloseWhiteIcon.svg?react';
import useEmblaCarousel from 'embla-carousel-react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

type PostDetailImageListProps = {
  imageData: CompanyImageUrlType[];
};

const PostDetailImageList = ({ imageData }: PostDetailImageListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, embla] = useEmblaCarousel({ loop: false });
  useBodyScrollLock(isOpen);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCurrentIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();

    return () => {
      embla.off('select', onSelect); // 이벤트 해제
    };
  }, [embla, onSelect]);

  return (
    <>
      {/* 첫번째 대표 사진 목록 보여주기 */}
      {imageData?.length ? (
        <section
          className="w-full h-[15.625rem] bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageData[0].img_url})`,
          }}
          onClick={() => setIsOpen(true)}
        ></section>
      ) : (
        <section className="w-full h-[15.625rem] bg-cover bg-center bg-surface-secondary"></section>
      )}
      {/* 모든 사진 목록을 보여주는 리스트 */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center bg-black bg-opacity-90 z-50 overflow-x-scroll no-scrollbar whitespace-nowrap">
          <header className="fixed top-0 w-full p-5 flex justify-center items-center">
            <p className="heading-18-semibold text-text-invert">
              {currentIndex + 1}/{imageData.length}
            </p>
          </header>
          <button
            className="fixed top-5 right-4"
            onClick={() => setIsOpen(false)}
          >
            <CloseWhiteIcon />
          </button>
          <div
            className="w-full max-h-[calc(100vh-8rem)] flex items-center overflow-hidden"
            ref={emblaRef}
          >
            <div className="flex gap-2">
              {imageData.map((image) => (
                <img
                  key={image.id}
                  src={image.img_url}
                  alt="banner image"
                  className="w-full min-w-full object-cover object-center"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailImageList;
