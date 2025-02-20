import { PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import usePreviousValue from '@/hooks/usePreviousValue';

const useBottomSheet = (
  setIsShowBottomSheet?: (isShowBottomsheet: boolean) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewHeight, setViewHeight] = useState<number>(window.innerHeight);

  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const shouldClose = info.offset.y > viewHeight / 4;

    if (shouldClose) controls.start('hidden');
    else controls.start('visible');

    if (setIsShowBottomSheet) setIsShowBottomSheet(!shouldClose);
    else setIsOpen(!shouldClose);
  };

  useEffect(() => {
    setViewHeight(window?.innerHeight || document.documentElement.clientHeight);
  }, []);

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
    }
  }, [controls, isOpen, prevIsOpen]);

  return { onDragEnd, controls, setIsOpen, viewHeight };
};

export default useBottomSheet;
