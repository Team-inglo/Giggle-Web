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
//import { useUserFcmTokenStore } from './store/user';

function App() {
  const [isOpenErrorBottomSheet, setIsOpenErrorBottomSheet] = useState(false);

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
        }),
      }),
  );
  {
    /*   useEffect(() => {
    const handleToken = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData?.type === 'RECEIVE_TOKEN') {
        updateToken(parsedData.payload);
      }
    };

    window.addEventListener('message', handleToken);
    return () => window.removeEventListener('message', handleToken);
  }, [])  const { updateToken } = useUserFcmTokenStore();;*/
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {isOpenErrorBottomSheet && (
        <ServerErrorBottomSheet
          isShowBottomsheet={isOpenErrorBottomSheet}
          setIsShowBottomSheet={setIsOpenErrorBottomSheet}
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
