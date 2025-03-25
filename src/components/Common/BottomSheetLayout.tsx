import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useBottomSheet from '@/hooks/useBottomSheet';

type BottomSheetLayoutProps = {
  hasHandlebar: boolean; // 최상단의 바 모양 존재 여부
  isAvailableHidden: boolean; // 아래로 내렸을 때 사라지도록 하는 여부
  isShowBottomsheet: boolean; // BottomSheet 보이기
  setIsShowBottomSheet?: (isShowBottomsheet: boolean) => void; // isShowBottomsheet 값 동기화하기 위한 함수
  children: ReactNode;
  isFixedBackground?: boolean;
};

const LAYOUT_MARGIN = 64;

const BottomSheetLayout = ({
  hasHandlebar,
  isAvailableHidden,
  isShowBottomsheet,
  setIsShowBottomSheet,
  children,
  isFixedBackground = true,
}: BottomSheetLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [contentHeight, setContentHeight] = useState<number>(0);

  const { isOpen, setIsOpen, onDragEnd, controls, viewHeight } =
    useBottomSheet(setIsShowBottomSheet);

  useEffect(() => {
    setIsOpen(isShowBottomsheet);
  }, [isShowBottomsheet, setIsOpen]);

  // children의 height를 계산
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      setContentHeight(height);
    }
  }, [children]);

  useEffect(() => {
    if (isOpen && isFixedBackground) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isFixedBackground]);

  return (
    <>
      {isOpen && isFixedBackground && (
        <div className="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] z-40"></div>
      )}
      <motion.div
        drag="y"
        initial="hidden"
        {...(isAvailableHidden ? { onDragEnd } : {})}
        animate={controls}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '100%' },
        }}
        dragConstraints={{
          top: 0,
          bottom: contentHeight,
        }} // 상단과 하단 드래그 제한 설정
        dragElastic={0.2}
        className={`fixed left-0 bottom-0 w-full h-[90vh] p-[1.5rem] pb-[2.5rem] rounded-t-2xl bg-white shadow-bottomSheetShadow z-40`}
        style={{
          top: `${viewHeight - contentHeight - LAYOUT_MARGIN}px`,
        }}
      >
        {hasHandlebar && (
          <div className="mx-auto mt-[-0.5rem] mb-[1.5rem] w-[4rem] border-[0.125rem] border-[#F1F2F6]"></div>
        )}
        <div ref={contentRef}>{children}</div>
      </motion.div>
    </>
  );
};

export default BottomSheetLayout;
