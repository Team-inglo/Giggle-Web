import {
  ComponentType,
  createContext,
  ReactNode,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import useBottomSheet from '@/hooks/useBottomSheet';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import Icon from '@/components/Common/Icon';

interface BottomSheetContextValue {
  position?: 'top' | 'bottom';
}

const BottomSheetContext = createContext<BottomSheetContextValue>({});

// BottomSheet 메인 컴포넌트 (기존 BottomSheetLayout 기능 통합)
type BottomSheetProps = {
  children: ReactNode;
  position?: 'top' | 'bottom';
  isAvailableHidden?: boolean; // 아래로 내렸을 때 사라지도록 하는 여부
  isShowBottomsheet: boolean; // BottomSheet 보이기
  setIsShowBottomSheet?: (isShowBottomsheet: boolean) => void; // isShowBottomsheet 값 동기화하기 위한 함수
  isFixedBackground?: boolean;
  isExitable?: boolean;
};

// 레이아웃 관련 상수
const LAYOUT_MARGIN = 36;

// 드래그 관련 상수
const DRAG_ELASTIC = 0.2;
const SPRING_DAMPING = 40;
const SPRING_STIFFNESS = 400;

export const BottomSheet = ({
  children,
  position = 'bottom',
  isAvailableHidden = false,
  isShowBottomsheet,
  setIsShowBottomSheet,
  isFixedBackground = true,
  isExitable = false,
}: BottomSheetProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const { isOpen, setIsOpen, onDragEnd, controls, viewHeight } =
    useBottomSheet(setIsShowBottomSheet);

  useBodyScrollLock(isOpen && isFixedBackground);

  useEffect(() => {
    if (isOpen !== isShowBottomsheet) {
      setIsOpen(isShowBottomsheet);
    }
  }, [isShowBottomsheet, setIsOpen, isOpen]);

  // children의 height를 계산
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      setContentHeight(height);
    }
  }, [children]);

  // 앱에서 window.innerheight값이 없는 경우
  if (!viewHeight) return <></>;

  return (
    <BottomSheetContext.Provider value={{ position }}>
      {isOpen && isFixedBackground && (
        <>
          <div
            className="fixed top-0 left-0 w-screen"
            style={{
              height: 'env(safe-area-inset-top)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 40,
            }}
          />
          <div
            className="fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] z-40"
            onClick={() => {
              if (isExitable) setIsShowBottomSheet?.(false);
            }}
          />
        </>
      )}
      <motion.div
        drag="y"
        initial="hidden"
        {...(isAvailableHidden ? { onDragEnd } : {})}
        animate={controls}
        transition={{
          type: 'spring',
          damping: SPRING_DAMPING,
          stiffness: SPRING_STIFFNESS,
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '100%' },
        }}
        dragConstraints={{
          top: 0,
          bottom: contentHeight,
        }}
        dragElastic={DRAG_ELASTIC}
        className={`fixed left-0 bottom-0 w-full h-[100vh] pt-3 rounded-t-2xl bg-surface-base shadow-bottomSheetShadow z-40`}
        style={{
          top: `${viewHeight - contentHeight - LAYOUT_MARGIN}px`,
        }}
      >
        <div ref={contentRef} className="flex flex-col h-auto">
          {children}
        </div>
      </motion.div>
    </BottomSheetContext.Provider>
  );
};

enum BottomSheetHeaderAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

// BottomSheet 헤더 컴포넌트
export const BottomSheetHeader = ({
  leftIcon,
  rightIcon,
  title,
  align = BottomSheetHeaderAlign.LEFT,
  tools,
  onLeftIconClick,
  onRightIconClick,
}: {
  leftIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  rightIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  title?: string;
  align?: BottomSheetHeaderAlign;
  tools?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 flex-shrink-0 w-full h-full">
      <div
        className={`w-full flex items-center ${align === BottomSheetHeaderAlign.LEFT ? 'text-left' : align === BottomSheetHeaderAlign.CENTER ? 'text-center' : 'text-right'}`}
      >
        {leftIcon && (
          <button onClick={onLeftIconClick} className="mr-2">
            <Icon icon={leftIcon} />
          </button>
        )}
        {title && <h2 className={`w-full text-lg font-semibold`}>{title}</h2>}
      </div>
      <div className="flex items-center">
        {tools}
        {rightIcon && (
          <button onClick={onRightIconClick} className="ml-2">
            <Icon icon={rightIcon} />
          </button>
        )}
      </div>
    </header>
  );
};

BottomSheetHeader.Align = BottomSheetHeaderAlign;

// BottomSheet 콘텐츠 영역 (스크롤 가능)
export const BottomSheetContent = ({
  isMaxHeight = false,
  children,
}: {
  isMaxHeight?: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={`overflow-y-scroll overflow-x-hidden px-5 ${isMaxHeight ? 'h-full' : 'max-h-[49vh]'}`}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

// BottomSheet 버튼 그룹
export enum BottomSheetButtonGroupVariant {
  SINGLE = 'single',
  TWO_HORIZONTAL = 'twoHorizontal',
  TWO_VERTICAL = 'twoVertical',
}

export const BottomSheetButtonGroup = ({
  variant = BottomSheetButtonGroupVariant.SINGLE,
  children,
}: {
  variant?: BottomSheetButtonGroupVariant;
  children: ReactNode;
}) => {
  const layoutClass = {
    [BottomSheetButtonGroupVariant.SINGLE]: 'flex flex-col gap-2',
    [BottomSheetButtonGroupVariant.TWO_HORIZONTAL]: 'flex flex-row gap-2',
    [BottomSheetButtonGroupVariant.TWO_VERTICAL]: 'flex flex-col gap-2',
  };

  return (
    <div
      className={`w-full px-4 bg-surface-base items-start justify-start pt-3 box-border text-center button-16-semibold text-text-strong z-10`}
    >
      <div
        className={`w-full ${layoutClass[variant]} items-center justify-center`}
      >
        {children}
      </div>
    </div>
  );
};

// 편의를 위한 정적 속성 추가
BottomSheet.Header = BottomSheetHeader;
BottomSheet.Content = BottomSheetContent;
BottomSheet.ButtonGroup = BottomSheetButtonGroup;
BottomSheet.ButtonGroupVariant = BottomSheetButtonGroupVariant;
