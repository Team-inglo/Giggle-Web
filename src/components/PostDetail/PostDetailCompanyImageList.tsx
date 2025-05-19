import { CompanyImageUrlType } from '@/types/postDetail/postDetailItem';
import { useEffect, useState } from 'react';
import CloseWhiteIcon from '@/assets/icons/CloseWhiteIcon.svg?react';

type PostDetailCompanyImageListProps = {
  companyImageData: CompanyImageUrlType[];
};

const PostDetailCompanyImageList = ({
  companyImageData,
}: PostDetailCompanyImageListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 모달 열림 상태에 따라 body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // 모달이 닫힐 때 overflow 복구
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {companyImageData?.length ? (
        <section
          className="w-full h-[15.625rem] bg-cover bg-center"
          style={{
            backgroundImage: `url(${companyImageData[0].img_url})`,
          }}
          onClick={() => setIsOpen(true)}
        ></section>
      ) : (
        <section className="w-full h-[15.625rem] bg-cover bg-center bg-surface-secondary"></section>
      )}
      {/* 모든 회사 사진 목록을 보여주는 리스트 */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center bg-black bg-opacity-90 z-50 overflow-x-scroll no-scrollbar whitespace-nowrap">
          <button
            className="fixed right-[1rem] top-[1rem] title-1 text-white"
            onClick={() => setIsOpen(false)}
          >
            <CloseWhiteIcon />
          </button>
          {companyImageData.map((image) => (
            <div
              key={image.id}
              className="min-w-[96vw] w-[96vw] mx-[2vw] h-[300px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.img_url})`,
              }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostDetailCompanyImageList;
