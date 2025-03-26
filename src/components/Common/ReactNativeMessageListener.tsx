import { useEffect } from 'react';
import { setupReactNativeMessageListener } from '@/utils/reactNativeMessage';
import { usePatchDeviceToken } from '@/hooks/api/useAuth';

export const ReactNativeMessageListener = () => {
  const { mutate: patchDeviceToken } = usePatchDeviceToken();

  useEffect(() => {
    const cleanup = setupReactNativeMessageListener((data) => {
      if (data.type === 'FCMTOKEN' && data.payload !== undefined) {
        patchDeviceToken(data.payload);
      }
    });

    return cleanup;
  }, [patchDeviceToken]);

  return null;
};
