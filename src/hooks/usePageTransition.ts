import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export type TransitionDirection = 'forward' | 'backward' | 'none';
export type TransitionState = 'idle' | 'entering' | 'exiting';

export interface PageTransitionConfig {
  enableTransition?: boolean;
  transitionDuration?: number;
}

export interface PageTransitionReturn {
  isTransitioning: boolean;
  direction: TransitionDirection;
  transitionState: TransitionState;
  transitionClass: string;
}

// 내비게이션 히스토리를 추적하기 위한 스택
let navigationStack: string[] = [];

export const usePageTransition = (
  config: PageTransitionConfig = {},
): PageTransitionReturn => {
  const { enableTransition = true, transitionDuration = 300 } = config;
  const location = useLocation();
  const previousPathRef = useRef<string>('');
  const cleanupTimerRef = useRef<NodeJS.Timeout>();

  console.log('🔧 [PageTransition] Hook initialized with config:', {
    enableTransition,
    transitionDuration,
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>('none');
  const [transitionState, setTransitionState] =
    useState<TransitionState>('idle');
  const [transitionClass, setTransitionClass] = useState('');

  useEffect(() => {
    console.log('🚀 [PageTransition] useEffect triggered');
    console.log('📍 Current pathname:', location.pathname);
    console.log('⚙️ Enable transition:', enableTransition);

    if (!enableTransition) {
      // 전환이 비활성화된 경우 초기 상태로 리셋
      setIsTransitioning(false);
      setDirection('none');
      setTransitionState('idle');
      setTransitionClass('');
      return;
    }

    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;

    // 첫 페이지 로드인 경우
    if (!previousPath) {
      console.log('🏠 [PageTransition] First load - no animation');
      previousPathRef.current = currentPath;

      // 스택 초기화 또는 현재 경로 추가
      if (!navigationStack.includes(currentPath)) {
        navigationStack.push(currentPath);
      }

      return;
    }

    // 경로가 변경된 경우
    if (currentPath !== previousPath) {
      console.log('🔄 [PageTransition] Path change detected');
      console.log('  - Current path:', currentPath);
      console.log('  - Previous path:', previousPath);
      console.log('  - History stack:', navigationStack);

      let detectedDirection: TransitionDirection = 'none';

      // 현재 경로와 이전 경로가 스택에 있는지 확인
      const currentIndex = navigationStack.indexOf(currentPath);
      const previousIndex = navigationStack.indexOf(previousPath);

      if (currentIndex === -1 && previousIndex !== -1) {
        // 새로운 페이지로 이동 (forward)
        detectedDirection = 'forward';
        navigationStack.push(currentPath);
      } else if (currentIndex !== -1 && previousIndex === -1) {
        // 이전 경로가 스택에 없는 경우 (특수한 경우)
        detectedDirection = 'backward';
        navigationStack.push(previousPath);
      } else if (currentIndex !== -1 && previousIndex !== -1) {
        // 둘 다 스택에 있는 경우
        console.log('📊 [PageTransition] Stack analysis:');
        console.log('  - Current index:', currentIndex);
        console.log('  - Previous index:', previousIndex);
        console.log('  - Stack before:', [...navigationStack]);

        if (currentIndex > previousIndex) {
          // 앞으로 가기
          detectedDirection = 'forward';
          console.log(
            '📈 [PageTransition] Both paths in stack - direction: forward',
          );
        } else {
          // 뒤로 가기
          detectedDirection = 'backward';
          // 뒤로 갈 때는 현재 위치 이후의 기록 제거
          navigationStack = navigationStack.slice(0, currentIndex + 1);
          console.log(
            '📉 [PageTransition] Both paths in stack - direction: backward',
          );
          console.log('  - Stack after cleanup:', [...navigationStack]);
        }
      } else {
        // 둘 다 스택에 없는 경우 (첫 진입)
        detectedDirection = 'forward';
        if (previousPath) navigationStack.push(previousPath);
        navigationStack.push(currentPath);
      }

      // 애니메이션 시작
      if (detectedDirection === 'forward' || detectedDirection === 'backward') {
        console.log('🎬 [PageTransition] Starting animation');
        console.log('  - Direction:', detectedDirection);
        console.log('  - Duration:', transitionDuration + 'ms');

        setIsTransitioning(true);
        setDirection(detectedDirection);
        setTransitionState('entering');

        // 초기 상태 설정
        let enterClass = '';
        if (detectedDirection === 'forward') {
          enterClass = 'page-slide-enter-from-right';
        } else if (detectedDirection === 'backward') {
          enterClass = 'page-slide-enter-from-left';
        }

        console.log('🎨 [PageTransition] Setting enter class:', enterClass);
        setTransitionClass(enterClass);

        // 더 안정적인 애니메이션 활성화를 위해 이중 requestAnimationFrame 사용
        requestAnimationFrame(() => {
          // 강제 reflow로 CSS 적용 보장
          const wrapper = document.querySelector('.page-transition-container');
          if (wrapper) {
            // getComputedStyle을 호출하여 강제 reflow 발생
            const computedTransform =
              window.getComputedStyle(wrapper).transform;
            console.log(
              '🔄 [PageTransition] Forced reflow to ensure CSS application, current transform:',
              computedTransform,
            );
          }

          requestAnimationFrame(() => {
            console.log(
              '✨ [PageTransition] Activating animation class:',
              enterClass + ' page-slide-enter-active',
            );
            setTransitionClass(enterClass + ' page-slide-enter-active');
          });
        });

        // 애니메이션 완료 후 정리
        cleanupTimerRef.current = setTimeout(() => {
          console.log('🏁 [PageTransition] Animation completed - cleaning up');
          setIsTransitioning(false);
          setDirection('none');
          setTransitionState('idle');
          setTransitionClass('');
        }, transitionDuration);
      }

      // 이전 경로 업데이트
      previousPathRef.current = currentPath;
      console.log('💾 [PageTransition] Updated previous path to:', currentPath);
    }

    // Cleanup 함수
    return () => {
      console.log('🧹 [PageTransition] Cleaning up timers');
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
      }
    };
  }, [location.pathname, transitionDuration, enableTransition]);

  // 상태 변경 로깅
  useEffect(() => {
    console.log('📊 [PageTransition] State update:');
    console.log('  - isTransitioning:', isTransitioning);
    console.log('  - direction:', direction);
    console.log('  - transitionState:', transitionState);
    console.log('  - transitionClass:', transitionClass);
  }, [isTransitioning, direction, transitionState, transitionClass]);

  console.log('↩️ [PageTransition] Returning:', {
    isTransitioning,
    direction,
    transitionState,
    transitionClass,
  });

  return {
    isTransitioning,
    direction,
    transitionState,
    transitionClass,
  };
};
