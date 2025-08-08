import {
  FC,
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  createRef,
  useRef,
} from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { getPageTransitionConfig } from '@/constants/pageTransition';
import { useNavigationDirection } from '@/hooks/useNavigationDirection';

interface TransitionRoutesProps {
  children: ReactNode;
}

const TransitionRoutes: FC<TransitionRoutesProps> = ({ children }) => {
  const location = useLocation();
  const { direction, isDissolve } = useNavigationDirection();

  const transitionConfig = getPageTransitionConfig(location.pathname);
  const timeout = transitionConfig.duration || 300;

  // dissolve 전환인지 슬라이드 전환인지에 따라 클래스명 결정
  const classNames = isDissolve
    ? 'page-dissolve'
    : direction === 'back'
      ? 'page-slide-back'
      : 'page-slide-forward';

  // 페이지 경로만 키로 사용
  const transitionKey = location.pathname;

  // findDOMNode 경고 방지를 위해 경로별 nodeRef 관리
  const nodeRefMap = useRef(new Map<string, RefObject<HTMLDivElement>>());
  const getNodeRef = (key: string) => {
    let ref = nodeRefMap.current.get(key);
    if (!ref) {
      ref = createRef<HTMLDivElement>();
      nodeRefMap.current.set(key, ref);
    }
    return ref;
  };
  const nodeRef = getNodeRef(transitionKey);

  const removeNodeRef = (key: string) => {
    nodeRefMap.current.delete(key);
  };

  // exit하는 child에게도 현재의 classNames 적용
  const childFactory = (child: ReactElement) => {
    return cloneElement(child, {
      classNames: classNames,
    });
  };

  // 전환이 비활성화된 경우 일반 Routes 반환
  if (!transitionConfig.enabled) {
    return <Routes>{children}</Routes>;
  }

  return (
    <TransitionGroup component={null} childFactory={childFactory}>
      <CSSTransition
        key={transitionKey}
        classNames={classNames}
        nodeRef={nodeRef}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        onExited={() => removeNodeRef(transitionKey)}
      >
        <div ref={nodeRef} className="transition-page-wrapper">
          <Routes location={location}>{children}</Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionRoutes;
