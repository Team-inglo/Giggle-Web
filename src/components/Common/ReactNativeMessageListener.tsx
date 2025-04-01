import { useEffect, useState } from 'react';
import { setupReactNativeMessageListener } from '@/utils/reactNativeMessage';
import { usePatchDeviceToken } from '@/hooks/api/useAuth';
import { useNavigate } from 'react-router-dom';
interface FCMTokenPayload {
  deviceToken: string;
  deviceId: string;
}
interface ReactNativeMessage {
  type: string;
  payload?: string | FCMTokenPayload;
}
export const ReactNativeMessageListener = () => {
  const [tokenData, setTokenData] = useState<{
    deviceToken: string;
    deviceId: string;
  } | null>(null);

  const { mutate: patchDeviceToken } = usePatchDeviceToken();
  const navigate = useNavigate();
  // 상태가 변경될 때 API 호출
  useEffect(() => {
    if (tokenData) {
      console.log('상태 변경에 의한 API 호출:', tokenData);
      patchDeviceToken(tokenData);
    }
  }, [tokenData, patchDeviceToken]);

  useEffect(() => {
    // 메시지 리스너
    const messageHandler = setupReactNativeMessageListener(
      (data: ReactNativeMessage) => {
        if (data.type === 'FCMTOKEN' && data.payload !== undefined) {
          try {
            const payloadObj = JSON.parse(data.payload as string);
            const { deviceToken, deviceId } = payloadObj as FCMTokenPayload;

            // 직접 API 호출 대신 상태 업데이트
            setTokenData({ deviceToken, deviceId });
          } catch (error) {
            console.error('FCM 토큰 처리 오류:', error);
          }
        }

        if (data.type === 'NOTIFICATION_NAVIGATION') {
          navigate('/alarm');
        }
      },
    );

    return () => messageHandler();
  }, [navigate]);

  return null;
};
