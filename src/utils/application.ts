import { APPLICATION_STEP } from '@/constants/application';
import { ApplicationStepType } from '@/types/application/applicationItem';
import { sendReactNativeMessage } from './reactNativeMessage';

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
