import Router from '@/router';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import ServerErrorBottomSheet from '@/components/Common/ServerErrorBottomSheet';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import { ReactNativeMessageListener } from '@/components/Common/ReactNativeMessageListener';
import ApiErrorBottomSheet from '@/components/Common/ApiErrorBottomSheet';
import { BrowserRouter } from 'react-router-dom';
import { useErrorStore } from '@/store/error';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import Toast from '@/components/Common/Toast';

function App() {
  useKakaoLoader({
    appkey: import.meta.env.VITE_APP_KAKAO_API_KEY as string,
    libraries: ['services', 'clusterer'],
  });
  const {
    isOpenServerErrorBottomSheet,
    isOpenErrorBottomSheet,
    errorMessage,
    setIsOpenServerErrorBottomSheet,
    setIsOpenErrorBottomSheet,
    openErrorBottomSheet,
  } = useErrorStore();

  const [isLoading, setIsLoading] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => openErrorBottomSheet(error),
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            if (mutation.meta?.skipGlobalError) return;
            openErrorBottomSheet(error);
          },
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

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactNativeMessageListener />
        <Router />
      </BrowserRouter>

      {isOpenServerErrorBottomSheet && (
        <ServerErrorBottomSheet
          isShowBottomsheet={isOpenServerErrorBottomSheet}
          setIsShowBottomSheet={setIsOpenServerErrorBottomSheet}
        />
      )}
      {isOpenErrorBottomSheet && (
        <ApiErrorBottomSheet
          errorMessage={errorMessage}
          isShowBottomsheet={isOpenErrorBottomSheet}
          setIsShowBottomSheet={setIsOpenErrorBottomSheet}
        />
      )}
      {isLoading && <LoadingOverLay />}
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
