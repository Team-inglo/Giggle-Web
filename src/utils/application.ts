import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { sendReactNativeMessage } from './reactNativeMessage';
import { NavigateFunction } from 'react-router-dom';

export const findCurrentStep = (step: ApplicationStepType) => {
  switch (step) {
    case APPLICATION_STEP.RESUME_UNDER_REVIEW:
      return 1;
    case APPLICATION_STEP.WAITING_FOR_INTERVIEW:
      return 2;
    case APPLICATION_STEP.FILLING_OUT_DOCUMENTS:
      return 3;
    case APPLICATION_STEP.DOCUMENT_UNDER_REVIEW:
      return 4;
    case APPLICATION_STEP.APPLICATION_IN_PROGRESS:
      return 5;
    case APPLICATION_STEP.REGISTERING_RESULTS:
      return 6;
    case APPLICATION_STEP.APPLICATION_SUCCESS:
      return 7;
    case APPLICATION_STEP.APPLICATION_REJECTED:
      return 7;
    default:
      return 0;
  }
};

export const handleGoExternalWeb = (type: string) => {
  const isWebView = Boolean(window.ReactNativeWebView);

  const urlMap: Record<string, string> = {
    kakao: 'https://pf.kakao.com/_ixlCsn',
    googleform: 'https://forms.gle/ukrnq4aLn4NczpXcA',
    hikorea: isWebView
      ? 'https://www.hikorea.go.kr/mobile/mMain.pt?locale=en'
      : 'https://www.hikorea.go.kr/cvlappl/CvlapplStep1.pt#this',
  };

  const url = urlMap[type];

  if (!url) {
    console.error(`Unknown external web type: ${type}`);
    return;
  }

  if (isWebView) {
    sendReactNativeMessage({
      type: 'GO_EXTERNAL_SITE',
      payload: url,
    });
  } else {
    window.location.href = url;
  }
};

// 서버에서 받은 Url로 이동시키는 함수
export const handleGoExternalWebByDynamicUrl = (url: string) => {
  const isWebView = Boolean(window.ReactNativeWebView);

  if (isWebView) {
    sendReactNativeMessage({
      type: 'GO_EXTERNAL_SITE',
      payload: url,
    });
  } else {
    window.location.href = url;
  }
};

// 페이지 이동 후 뒤로가기 시 이전 페이지로 건너뛰는 헬퍼 함수
export const navigateWithSkipHistory = (
  navigate: NavigateFunction,
  url: string,
  delay = 0,
) => {
  if (delay > 0) {
    setTimeout(() => {
      // 페이지 이동
      navigate(url, { replace: true });

      // 브라우저 렌더링 사이클 이후 히스토리 조작
      requestAnimationFrame(() => {
        navigate(-1);
      });
    }, delay);
  } else {
    // 지연 없이 즉시 실행
    navigate(url, { replace: true });

    requestAnimationFrame(() => {
      navigate(-1);
    });
  }
};

// 이전 경로와 상태 데이터를 포함한 스마트 네비게이션
export const smartNavigate = (
  navigate: NavigateFunction,
  url: string,
  options: { delay?: number; state?: unknown; forceSkip?: boolean } = {},
) => {
  const { delay = 0, forceSkip = false, state } = options;
  // 함수 호출 시점에 lastPath를 가져오도록 변경
  const performNavigation = () => {
    // 실행 시점에 lastPath 값을 가져옴
    const lastPath = sessionStorage.getItem('lastPath');

    // 이전 경로와 동일하거나 강제 스킵이 요청된 경우
    if ((lastPath && lastPath === url) || forceSkip) {
      navigate(url, { replace: true, state });

      requestAnimationFrame(() => {
        navigate(-1);
      });
    } else {
      navigate(url, { state });
    }
  };

  if (delay > 0) {
    setTimeout(performNavigation, delay);
  } else {
    performNavigation();
  }
};
