import { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '@/hooks/usePageTransition';
import { getPageTransitionConfig } from '@/constants/pageTransition';

interface PageTransitionWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageTransitionWrapper: FC<PageTransitionWrapperProps> = ({
  children,
  className = '',
}) => {
  const location = useLocation();
  const transitionConfig = getPageTransitionConfig(location.pathname);

  // 디버깅: 설정 로그
  console.log('🔧 [PageTransitionWrapper] Component rendered');
  console.log('  - Current path:', location.pathname);
  console.log('  - Transition config:', transitionConfig);

  const { isTransitioning, transitionClass } = usePageTransition({
    enableTransition: transitionConfig.enabled,
    transitionDuration: transitionConfig.duration,
  });

  const containerClasses = [
    isTransitioning ? 'page-transition-container transitioning' : '',
    transitionClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 디버깅: 렌더링되는 클래스 로그
  console.log('🎨 [PageTransitionWrapper] Rendering with:');
  console.log('  - isTransitioning:', isTransitioning);
  console.log('  - transitionClass:', transitionClass);
  console.log('  - Final containerClasses:', containerClasses);

  // DOM 렌더링 후 실제 적용된 클래스 확인
  useEffect(() => {
    if (containerClasses) {
      console.log(
        '🏗️ [PageTransitionWrapper] DOM updated with classes:',
        containerClasses,
      );

      // 실제 DOM 요소에서 클래스 확인
      const wrapper = document.querySelector('.page-transition-container');
      if (wrapper) {
        console.log('✅ [PageTransitionWrapper] Found wrapper element in DOM');
        console.log('  - Actual classes:', wrapper.className);

        const computedStyle = window.getComputedStyle(wrapper);
        console.log('  - Computed styles:', {
          transform: computedStyle.transform,
          transition: computedStyle.transition,
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          top: computedStyle.top,
          left: computedStyle.left,
          width: computedStyle.width,
          height: computedStyle.height,
        });

        // 특정 애니메이션 클래스가 있는지 확인
        if (wrapper.classList.contains('page-slide-enter-from-right')) {
          console.log(
            '🎯 [CSS Debug] page-slide-enter-from-right class detected',
          );
          const testStyle = computedStyle.getPropertyValue('transform');
          console.log('  - Expected: translate3d(100%, 0px, 0px)');
          console.log('  - Actual:', testStyle);

          if (testStyle.includes('100%') || testStyle.includes('matrix')) {
            console.log('  ✅ Transform is being applied');
          } else {
            console.log(
              '  ❌ Transform is NOT being applied - CSS issue detected',
            );
          }
        }

        if (wrapper.classList.contains('page-slide-enter-active')) {
          console.log('🎯 [CSS Debug] page-slide-enter-active class detected');
          const transitionStyle = computedStyle.getPropertyValue('transition');
          console.log('  - Transition style:', transitionStyle);

          if (
            transitionStyle.includes('transform') ||
            transitionStyle.includes('300ms')
          ) {
            console.log('  ✅ Transition is being applied');
          } else {
            console.log(
              '  ❌ Transition is NOT being applied - CSS issue detected',
            );
          }
        }
      } else {
        console.log(
          '❌ [PageTransitionWrapper] Wrapper element not found in DOM',
        );
      }
    }
  }, [containerClasses, isTransitioning]);

  // CSS 파일이 로드되었는지 확인
  useEffect(() => {
    const testElement = document.createElement('div');
    testElement.className = 'page-slide-enter-from-right';
    testElement.style.visibility = 'hidden';
    testElement.style.position = 'absolute';
    testElement.style.top = '-9999px';
    document.body.appendChild(testElement);

    const computedStyle = window.getComputedStyle(testElement);
    const transformValue = computedStyle.transform;
    const hasTransition =
      transformValue.includes('100%') || transformValue !== 'none';

    console.log('📁 [PageTransitionWrapper] CSS loading check:');
    console.log('  - Test element transform:', transformValue);
    console.log('  - CSS appears to be loaded:', hasTransition);
    console.log('  - All computed styles:', {
      transform: computedStyle.transform,
      position: computedStyle.position,
      zIndex: computedStyle.zIndex,
      background: computedStyle.background,
    });

    document.body.removeChild(testElement);
  }, []);

  return <div className={containerClasses}>{children}</div>;
};

export default PageTransitionWrapper;
