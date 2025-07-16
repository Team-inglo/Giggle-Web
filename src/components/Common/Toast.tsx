import Icon from '@/components/Common/Icon';
import CheckIcon from '@/assets/icons/CheckWithFilledIcon.svg?react';
import WarningIcon from '@/assets/icons/WarningWithFillIcon.svg?react';
import InfoIcon from '@/assets/icons/InfoWithFillIcon.svg?react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { ToastStatus, useToastStore } from '@/store/toast';
import { createPortal } from 'react-dom';

// 전역 토스트 메시지를 Portal 로 렌더링하고, 3초 후 자동으로 사라지도록 처리합니다.
// zustand 의 전역 상태(useToastStore)를 구독해 메시지/아이콘/열림 여부를 제어합니다.
const Toast = () => {
  const { isToastOpen, toastMessage, toastStatus, close } = useToastStore();

  // 아이콘 컴포넌트 메모이제이션
  const getIcon = useMemo(() => {
    switch (toastStatus) {
      case ToastStatus.INFO:
        return (
          <Icon
            icon={InfoIcon}
            size={Icon.Size.MD}
            strokeColor={'text-surface-base'}
            hasPadding={false}
          />
        );
      case ToastStatus.SUCCESS:
        return (
          <Icon
            icon={CheckIcon}
            fillColor="text-status-green-300"
            size={Icon.Size.MD}
            hasPadding={false}
          />
        );
      case ToastStatus.ERROR:
        return (
          <Icon
            icon={WarningIcon}
            fillColor={'text-status-red-300'}
            size={Icon.Size.MD}
            hasPadding={false}
          />
        );
      default:
        return null;
    }
  }, [toastStatus]);

  // 토스트 자동 닫기 타이머(현재 3초))
  useEffect(() => {
    if (!isToastOpen) return;

    const timeout = setTimeout(() => {
      close();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isToastOpen, close]);

  return createPortal(
    <AnimatePresence>
      {isToastOpen && (
        <div
          // fixed 포지션으로 화면 하단 중앙에 표시
          className="fixed w-full flex justify-center bottom-0 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            // motion.div 로 진입/퇴장 애니메이션 부여
            key={toastMessage}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: '-14vh' }}
            exit={{ opacity: 0, y: 50 }}
            className="flex h-12 rounded-xl bg-neutral-950/50 backdrop-blur-xl w-fit"
          >
            <div className="max-w-[calc(100vw-2rem)] w-full h-full flex items-center gap-1 px-4 py-2 bg-[rgba(0,112,243,0.06)] rounded-lg">
              {/* 아이콘 & 메시지 */}
              {getIcon}
              <p
                className="max-w-[calc(100%-1.5rem)] button-14-semibold text-text-invert/90 px-1 my-1 shrink-0 text-ellipsis line-clamp-1 overflow-hidden"
                role="status" // 스크린리더에 알림용으로 노출
                aria-live="polite"
              >
                {toastMessage}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    // Portal 대상 노드: public/index.html 의 <div id="toast-root" />
    document.getElementById('toast-root')!,
  );
};

Toast.Status = ToastStatus;

export default Toast;
