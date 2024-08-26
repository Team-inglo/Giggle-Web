/* eslint-disable @typescript-eslint/no-explicit-any */
import { PanInfo, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import usePreviousValue from "./usePreviousValue";
import { BOTTOM_SHEET_HEIGHT } from "../constants/bottomSheet";

const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // const shouldClose = info?.point?.y > 10 || (info?.point?.y >= 0 && info?.point?.y > 45);
    const shouldClose = info?.point?.y >= BOTTOM_SHEET_HEIGHT - 200;

    if (shouldClose) {
      controls.start("hidden");
      setIsOpen(false);
    } else {
      controls.start("visible");
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start("hidden");
    } else if (!prevIsOpen && isOpen) {
      controls.start("visible");
    }
  }, [controls, isOpen, prevIsOpen]);

  return { onDragEnd, controls, setIsOpen, isOpen };
};

export default useBottomSheet;
