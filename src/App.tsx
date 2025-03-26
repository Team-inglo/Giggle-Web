import Router from '@/router';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ServerErrorBottomSheet from '@/components/Common/ServerErrorBottomSheet';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import { setupReactNativeMessageListener } from '@/utils/reactNativeMessage';
import { usePatchDeviceToken } from '@/hooks/api/useAuth';

function App() {
  const [isOpenErrorBottomSheet, setIsOpenErrorBottomSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: patchDeviceToken } = usePatchDeviceToken();

  const openErrorBottomSheet = (error: unknown) => {
    if (!axios.isAxiosError(error)) return;

    if (error.response?.status === 500 || error.response?.status === 408) {
      setIsOpenErrorBottomSheet(true);
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => openErrorBottomSheet(error),
        }),
        mutationCache: new MutationCache({
          onError: (error) => openErrorBottomSheet(error),
          onMutate: (_, query) => {
            if (query.meta?.skipGlobalLoading) return;
            setIsLoading(true);
          },
          onSettled: (_, __, ___, ____, query) => {
            if (query.meta?.skipGlobalLoading) return;
            setIsLoading(false);
          },
        }),
      }),
  );

  useEffect(() => {
    const cleanup = setupReactNativeMessageListener((data) => {
      if (data.type === 'FCMTOKEN' && data.payload !== undefined) {
        patchDeviceToken(data.payload);
      }
    });

    return cleanup;
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {isOpenErrorBottomSheet && (
        <ServerErrorBottomSheet
          isShowBottomsheet={isOpenErrorBottomSheet}
          setIsShowBottomSheet={setIsOpenErrorBottomSheet}
        />
      )}
      {isLoading && <LoadingOverLay />}
    </QueryClientProvider>
  );
}

export default App;
