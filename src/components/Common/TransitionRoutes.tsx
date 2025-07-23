import { FC, ReactNode, useRef, useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { getPageTransitionConfig } from '@/constants/pageTransition';
import { useNavigationDirection } from '@/hooks/useNavigationDirection';

interface TransitionRoutesProps {
  children: ReactNode;
}

// 전역 z-index 카운터
let globalZIndexCounter = 1000;

const TransitionRoutes: FC<TransitionRoutesProps> = ({ children }) => {
  const location = useLocation();
  const { direction } = useNavigationDirection();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentZIndex, setCurrentZIndex] = useState(globalZIndexCounter);
  const [previousDirection, setPreviousDirection] = useState<string>('forward');

  const transitionConfig = getPageTransitionConfig(location.pathname);
  const timeout = transitionConfig.duration || 300;

  // 새 페이지의 클래스명
  const classNames =
    direction === 'back' ? 'page-slide-back' : 'page-slide-forward';

  // 이전 페이지의 클래스명 (반대 방향)
  const previousClassNames =
    previousDirection === 'back' ? 'page-slide-back' : 'page-slide-forward';

  // 방향에 따른 고유 키 생성
  const transitionKey = `${location.pathname}-${direction}`;

  // 새로운 전환 시작 시 z-index 갱신 및 이전 방향 저장
  useEffect(() => {
    globalZIndexCounter += 10; // 여유있게 10씩 증가
    setCurrentZIndex(globalZIndexCounter);

    if (nodeRef.current) {
      // CSS 변수로 동적 z-index 설정
      nodeRef.current.style.setProperty(
        '--transition-z-index',
        globalZIndexCounter.toString(),
      );
      console.log(
        '🏗️ [ZIndex] Set dynamic z-index:',
        globalZIndexCounter,
        'for',
        location.pathname,
        `(${direction})`,
      );
    }

    // 이전 방향 저장 (다음 전환에서 나가는 페이지가 사용)
    setPreviousDirection(direction);
  }, [transitionKey]);

  // 나가는 페이지에 적절한 클래스 추가
  const addExitClassesToElement = (element: HTMLElement, direction: string) => {
    if (direction === 'forward') {
      // Forward 이동 시 이전 페이지는 forward-enter 클래스 받아야 함
      element.classList.add('page-slide-forward-enter');
      setTimeout(() => {
        element.classList.add('page-slide-forward-enter-active');
      }, 10);
    } else if (direction === 'back') {
      // Back 이동 시 이전 페이지는 back-exit 클래스 받아야 함
      element.classList.add('page-slide-back-exit');
      setTimeout(() => {
        element.classList.add('page-slide-back-exit-active');
      }, 10);
    }
    console.log(
      '➕ [Manual Class] Added exit classes for direction:',
      direction,
    );
  };

  // transition 클래스 정리 함수
  const cleanupTransitionClasses = () => {
    if (nodeRef.current) {
      // 모든 transition 관련 클래스 제거
      const classesToRemove = [
        'page-slide-forward-enter',
        'page-slide-forward-enter-active',
        'page-slide-forward-enter-done',
        'page-slide-forward-exit',
        'page-slide-forward-exit-active',
        'page-slide-forward-exit-done',
        'page-slide-back-enter',
        'page-slide-back-enter-active',
        'page-slide-back-enter-done',
        'page-slide-back-exit',
        'page-slide-back-exit-active',
        'page-slide-back-exit-done',
      ];

      nodeRef.current.classList.remove(...classesToRemove);
      console.log('🧹 [Transition] Cleaned up classes:', classesToRemove);
    }
  };

  // 전환 상태 로깅
  useEffect(() => {
    console.log('🎬 [TransitionRoutes] Transition state:', {
      pathname: location.pathname,
      direction,
      classNames,
      previousDirection,
      previousClassNames,
      transitionKey,
      isTransitioning,
      enabled: transitionConfig.enabled,
      zIndex: currentZIndex,
    });
  }, [
    location.pathname,
    direction,
    classNames,
    previousDirection,
    previousClassNames,
    transitionKey,
    isTransitioning,
    transitionConfig.enabled,
    currentZIndex,
  ]);

  // 전환이 비활성화된 경우 일반 Routes 반환
  if (!transitionConfig.enabled) {
    return <Routes>{children}</Routes>;
  }

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={transitionKey}
        classNames={classNames}
        timeout={timeout}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        onEnter={() => {
          console.log(
            '🎭 [Transition] Enter:',
            location.pathname,
            `(${direction})`,
            'z-index:',
            currentZIndex,
            'classes:',
            classNames,
          );
          setIsTransitioning(true);
        }}
        onEntered={() => {
          console.log(
            '🎯 [Transition] Entered:',
            location.pathname,
            `(${direction})`,
            'z-index:',
            currentZIndex,
            'classes:',
            classNames,
          );
          setIsTransitioning(false);
          // 진입 완료 후 클래스 정리
          cleanupTransitionClasses();
        }}
        onExit={() => {
          console.log(
            '🚪 [Transition] Exit:',
            location.pathname,
            `(${direction})`,
            'z-index:',
            currentZIndex,
            'classes:',
            classNames,
          );
          // 나가는 페이지에 수동으로 적절한 클래스 추가
          if (nodeRef.current) {
            addExitClassesToElement(nodeRef.current, direction);
          }
          setIsTransitioning(true);
        }}
        onExited={() => {
          console.log(
            '👋 [Transition] Exited:',
            location.pathname,
            `(${direction})`,
            'z-index:',
            currentZIndex,
            'classes:',
            classNames,
          );
          setIsTransitioning(false);
          // 종료 완료 후 클래스 정리
          cleanupTransitionClasses();
        }}
      >
        <div ref={nodeRef} className="transition-page-wrapper">
          <Routes location={location}>{children}</Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRoutes;
