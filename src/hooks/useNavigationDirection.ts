import { useRef, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shouldUseDissolveTransition } from '@/constants/pageTransition';

export type NavigationDirection = 'forward' | 'back' | 'replace';

// 전역 네비게이션 스택
let globalNavigationStack: string[] = [];
let globalStackPointer = -1;

export const useNavigationDirection = () => {
  const location = useLocation();
  const isInitialRenderRef = useRef<boolean>(true);
  const previousPathnameRef = useRef<string>('');

  // direction과 dissolve 여부를 계산으로 직접 구하기 (순수 함수)
  const { direction, newStack, newPointer, isDissolve } = useMemo(() => {
    const currentPath = location.pathname;
    const previousPath = previousPathnameRef.current;

    let newDirection: NavigationDirection = 'forward';
    let updatedStack = [...globalNavigationStack];
    let updatedPointer = globalStackPointer;

    // 초기 렌더링 처리
    if (isInitialRenderRef.current) {
      updatedStack = [currentPath];
      updatedPointer = 0;
      newDirection = 'replace';
    }
    // 이전 경로와 같다면 새로고침이므로 처리하지 않음
    else if (currentPath === previousPath) {
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
      } else {
        // 앞으로 가기: 새로운 경로 추가
        newDirection = 'forward';
        // 현재 위치 이후의 스택 제거하고 새 경로 추가
        updatedStack = updatedStack.slice(0, updatedPointer + 1);
        updatedStack.push(currentPath);
        updatedPointer = updatedStack.length - 1;
      }
    }

    // dissolve 전환 여부 판단 (순수 함수)
    const useDissolve =
      newDirection !== 'replace' &&
      shouldUseDissolveTransition(previousPath, currentPath);

    return {
      direction: newDirection,
      newStack: updatedStack,
      newPointer: updatedPointer,
      isDissolve: useDissolve,
    };
  }, [location.pathname]);

  // 전역 상태 업데이트를 별도로 처리
  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
    }
    globalNavigationStack = newStack;
    globalStackPointer = newPointer;
  }, [newStack, newPointer]);

  // previousPathnameRef 업데이트를 별도로 처리
  useEffect(() => {
    previousPathnameRef.current = location.pathname;
  }, [location.pathname]);

  return {
    direction,
    history: globalNavigationStack,
    currentIndex: globalStackPointer,
    isDissolve,
    previousPath: previousPathnameRef.current,
  };
};
