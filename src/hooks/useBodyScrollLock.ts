import { useEffect } from 'react';

// isLocked이 true이면 body 스크롤 제어하는 훅
const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isLocked) document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
