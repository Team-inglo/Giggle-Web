import Router from '@/router';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import ServerErrorBottomSheet from '@/components/Common/ServerErrorBottomSheet';
import { LoadingOverLay } from '@/components/Common/LoadingItem';
import { ReactNativeMessageListener } from '@/components/Common/ReactNativeMessageListener';
import ApiErrorBottomSheet from './components/Common/ApiErrorBottomSheet';

function App() {
  const [isOpenServerErrorBottomSheet, setIsOpenServerErrorBottomSheet] =
    useState(false);
  const [isOpenErrorBottomSheet, setIsOpenErrorBottomSheet] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const openErrorBottomSheet = (error: unknown) => {
    if (!axios.isAxiosError(error)) return;

    if (error.response?.status === 500 || error.response?.status === 408) {
      setIsOpenServerErrorBottomSheet(true);
    } else if (error.response?.status !== 401) {
      setIsOpenErrorBottomSheet(true);
      setErrorMessage(error.response?.data?.error?.message ?? '');
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

  return (
    <QueryClientProvider client={queryClient}>
      <ReactNativeMessageListener />
      <Router />
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
    </QueryClientProvider>
  );
}

export default App;
