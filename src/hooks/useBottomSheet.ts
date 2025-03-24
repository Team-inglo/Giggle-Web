import { PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import usePreviousValue from '@/hooks/usePreviousValue';

const useBottomSheet = (
  viewHeight: number,
  setIsShowBottomSheet?: (isShowBottomsheet: boolean) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);

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
    if (viewHeight && prevIsOpen && !isOpen) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
    }
  }, [controls, isOpen, prevIsOpen, viewHeight]);

  return { onDragEnd, controls, isOpen, setIsOpen };
};

export default useBottomSheet;
