import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';


// View Transition API를 지원하는지 확인
const supportsViewTransition = (): boolean => {
  return 'startViewTransition' in document;
};


// 네비게이션 히스토리를 추적하기 위한 스택 (전역)
let globalNavigationStack: string[] = [];


// 페이지 변경을 자동으로 감지하여 View Transition을 적용하는 훅
export const useAutoViewTransition = (enabled: boolean = true) => {
  const location = useLocation();
  const previousPathRef = useRef<string>('');
  const isInitialRenderRef = useRef(true);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPath = previousPathRef.current;

    console.log('🚀 [AutoViewTransition] Location changed');
    console.log('  - Current path:', currentPath);
    console.log('  - Previous path:', previousPath);
    console.log('  - Enabled:', enabled);
    console.log('  - Is initial render:', isInitialRenderRef.current);
    console.log('  - View Transition support:', supportsViewTransition());

    // 첫 렌더링이거나 전환이 비활성화된 경우 스킵
    if (isInitialRenderRef.current || !enabled) {
      console.log(
        '🏠 [AutoViewTransition] Skipping - initial render or disabled',
      );
      previousPathRef.current = currentPath;
      isInitialRenderRef.current = false;

      // 스택 초기화
      if (!globalNavigationStack.includes(currentPath)) {
        globalNavigationStack.push(currentPath);
      }

      return;
    }

    // 경로가 실제로 변경된 경우에만 View Transition 적용
    if (currentPath !== previousPath && supportsViewTransition()) {
      console.log('🎬 [AutoViewTransition] Applying View Transition');

      // 방향 감지
      let isBackTransition = false;
      const currentIndex = globalNavigationStack.indexOf(currentPath);
      const previousIndex = globalNavigationStack.indexOf(previousPath);

      if (
        currentIndex !== -1 &&
        previousIndex !== -1 &&
        currentIndex < previousIndex
      ) {
        // 뒤로 가기
        isBackTransition = true;
        globalNavigationStack = globalNavigationStack.slice(
          0,
          currentIndex + 1,
        );
        console.log('📉 [AutoViewTransition] Back navigation detected');
      } else if (currentIndex === -1) {
        // 새로운 페이지 (앞으로 가기)
        globalNavigationStack.push(currentPath);
        console.log('📈 [AutoViewTransition] Forward navigation detected');
      }

      console.log('  - Navigation stack:', globalNavigationStack);
      console.log('  - Is back transition:', isBackTransition);

      // View Transition 적용
      if (isBackTransition) {
        document.documentElement.classList.add('back-transition');
      }

      // View Transition 시작 (단순히 CSS 애니메이션 트리거)
      const viewTransition = (
        document as Document & {
          startViewTransition: () => {
            ready: Promise<void>;
            finished: Promise<void>;
          };
        }
      ).startViewTransition(() => {
        // 여기서는 별다른 DOM 조작 없이 그냥 해당 페이지가 렌더링되도록 함
        console.log(
          '✨ [AutoViewTransition] View transition callback executed',
        );
      });

      viewTransition.finished.finally(() => {
        console.log('🏁 [AutoViewTransition] View transition finished');
        if (isBackTransition) {
          document.documentElement.classList.remove('back-transition');
        }
      });
    } else if (!supportsViewTransition()) {
      console.log('📱 [AutoViewTransition] View Transition not supported');

      // 스택 업데이트 (폴백용)
      const currentIndex = globalNavigationStack.indexOf(currentPath);
      if (currentIndex === -1) {
        globalNavigationStack.push(currentPath);
      }
    }

    // 이전 경로 업데이트
    previousPathRef.current = currentPath;
    isInitialRenderRef.current = false;
  }, [location.pathname, enabled]);

  return {
    supportsViewTransition: supportsViewTransition(),
    navigationStack: globalNavigationStack,
  };
};
