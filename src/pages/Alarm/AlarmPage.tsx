import AlarmCardList from '@/components/Alarm/AlarmCardList';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import { LoadingItem } from '@/components/Common/LoadingItem';
import LoadingPostItem from '@/components/Common/LoadingPostItem';
import { alarmTranslation } from '@/constants/translation';
import { useInfiniteGetAlarms, usePatchReadAlarm } from '@/hooks/api/useAlarm';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useUserStore } from '@/store/user';
import { AlarmItemType } from '@/types/api/alarm';
import { isEmployerByAccountType } from '@/utils/signup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlarmPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInitialLoading,
  } = useInfiniteGetAlarms(10);

  const { mutate } = usePatchReadAlarm();
  const { account_type } = useUserStore();

  const navigate = useNavigate();

  const [alarmList, setAlarmList] = useState<AlarmItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const readAlarm = (id: number) => {
    mutate(id);
    // 낙관적 업데이트
    setAlarmList([
      ...alarmList.map((data) =>
        data.id === id ? { ...data, is_read: true } : data,
      ),
    ]);
  };

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoading(true);
      fetchNextPage().finally(() => setIsLoading(false));
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data?.notification_list);
      setAlarmList(result);
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/')}
        hasMenuButton={false}
        title={
          alarmTranslation.alarmTitle[isEmployerByAccountType(account_type)]
        }
      />
      {isInitialLoading ? (
        <div className="flex-1 flex flex-col justify-center items-center">
          <LoadingPostItem />
        </div>
      ) : (
        <div className="flex-1 pt-2 pb-6 flex flex-col">
          <AlarmCardList
            alarmList={alarmList}
            language={isEmployerByAccountType(account_type)}
            readAlarm={readAlarm}
          />
          {isLoading && <LoadingItem />}
        </div>
      )}
      <div ref={targetRef} className="h-1"></div>
    </div>
  );
};

export default AlarmPage;
