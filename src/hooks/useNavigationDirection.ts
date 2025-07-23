import { useRef, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type NavigationDirection = 'forward' | 'back' | 'replace';

// 전역 네비게이션 스택 (브라우저 세션 동안 유지)
let globalNavigationStack: string[] = [];
let globalStackPointer = -1;

export const useNavigationDirection = () => {
  const location = useLocation();
  const isInitialRenderRef = useRef<boolean>(true);
  const previousPathnameRef = useRef<string>('');

  // direction을 계산으로 직접 구하기 (순수 함수)
  const { direction, newStack, newPointer } = useMemo(() => {
    const currentPath = location.pathname;
    const previousPath = previousPathnameRef.current;

    console.log('🔍 [NavigationDirection Debug]');
    console.log('  - Current path:', currentPath);
    console.log('  - Previous path:', previousPath);
    console.log('  - Global stack:', globalNavigationStack);
    console.log('  - Stack pointer:', globalStackPointer);
    console.log('  - Is initial:', isInitialRenderRef.current);

    let newDirection: NavigationDirection = 'forward';
    let updatedStack = [...globalNavigationStack];
    let updatedPointer = globalStackPointer;

    // 초기 렌더링 처리
    if (isInitialRenderRef.current) {
      updatedStack = [currentPath];
      updatedPointer = 0;
      newDirection = 'replace';
      console.log('  ✅ Initial render - Direction: replace');
    }
    // 이전 경로와 같다면 새로고침이므로 처리하지 않음
    else if (currentPath === previousPath) {
      console.log('  🔄 Same path - Direction: replace');
      newDirection = 'replace';
    } else {
      // 현재 경로가 스택에 있는지 확인
      const currentPathIndex = updatedStack.indexOf(currentPath);

      if (currentPathIndex !== -1 && currentPathIndex < updatedPointer) {
        // 뒤로 가기: 스택에 있는 이전 위치로 이동
        newDirection = 'back';
        updatedPointer = currentPathIndex;
        // 스택을 현재 위치까지 잘라냄 (앞으로 가기 히스토리 제거)
        updatedStack = updatedStack.slice(0, updatedPointer + 1);
        console.log('  ⬅️ Back navigation detected');
      } else {
        // 앞으로 가기: 새로운 경로 추가
        newDirection = 'forward';
        // 현재 위치 이후의 스택 제거하고 새 경로 추가
        updatedStack = updatedStack.slice(0, updatedPointer + 1);
        updatedStack.push(currentPath);
        updatedPointer = updatedStack.length - 1;
        console.log('  ➡️ Forward navigation detected');
      }
    }

    console.log('🧭 [NavigationDirection] Final Direction:', newDirection);
    console.log('  - Calculated stack:', updatedStack);
    console.log('  - Calculated pointer:', updatedPointer);

    return {
      direction: newDirection,
      newStack: updatedStack,
      newPointer: updatedPointer,
    };
  }, [location.pathname]);

  // 전역 상태 업데이트를 별도로 처리
  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
    }
    globalNavigationStack = newStack;
    globalStackPointer = newPointer;
    console.log('🔄 [GlobalState] Updated:', {
      stack: globalNavigationStack,
      pointer: globalStackPointer,
    });
  }, [newStack, newPointer]);

  // previousPathnameRef 업데이트를 별도로 처리
  useEffect(() => {
    previousPathnameRef.current = location.pathname;
  }, [location.pathname]);

  return {
    direction,
    history: globalNavigationStack,
    currentIndex: globalStackPointer,
  };
};
