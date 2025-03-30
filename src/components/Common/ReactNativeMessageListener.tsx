import { useEffect } from 'react';
import { setupReactNativeMessageListener } from '@/utils/reactNativeMessage';
import { usePatchDeviceToken } from '@/hooks/api/useAuth';
interface FCMTokenPayload {
  deviceToken: string;
  deviceId: string;
}
interface ReactNativeMessage {
  type: string;
  payload?: string | FCMTokenPayload;
}
export const ReactNativeMessageListener = () => {
  const { mutate: patchDeviceToken } = usePatchDeviceToken();

  // 메시지 리스너 함수
  useEffect(() => {
    const cleanup = setupReactNativeMessageListener(
      (data: ReactNativeMessage) => {
        if (data.type === 'FCMTOKEN' && data.payload !== undefined) {
          const { deviceToken, deviceId } = data.payload as FCMTokenPayload;
          patchDeviceToken({ deviceToken: deviceToken, deviceId: deviceId });
        }
      },
    );

    return cleanup;
  }, [patchDeviceToken]);
  return null;
};
