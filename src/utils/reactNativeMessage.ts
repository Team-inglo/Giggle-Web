// 메시지 데이터 인터페이스
interface MessageData {
  type: string;
  payload?: string;
}

interface Message {
  type: string;
  payload?: string;
}

export const setupReactNativeMessageListener = (
  messageHandler: (data: MessageData) => void,
) => {
  const isReactNativeWebView = !!window.ReactNativeWebView;

  if (!isReactNativeWebView) {
    return () => {};
  }

  const listener = (event: Event) => {
    const messageEvent = event as MessageEvent;
    try {
      const data =
        typeof messageEvent.data === 'string'
          ? JSON.parse(messageEvent.data)
          : messageEvent.data;
      messageHandler(data);
    } catch (error) {
      console.error('Failed to parse message data:', error);
    }
  };

  // 플랫폼 감지와 관계없이 모든 리스너 등록
  if (window.ReactNativeWebView) {
    document.addEventListener('message', listener as EventListener);
    window.addEventListener('message', listener as EventListener);
  }

  return () => {
    if (window.ReactNativeWebView) {
      document.removeEventListener('message', listener as EventListener);
      window.removeEventListener('message', listener as EventListener);
    }
  };
};

export const sendReactNativeMessage = ({ type, payload }: Message) => {
  if (window.ReactNativeWebView) {
    const message = JSON.stringify({ type, payload });
    window.ReactNativeWebView.postMessage(message);
  }
};
