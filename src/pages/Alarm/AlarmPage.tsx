import AlarmCard from '@/components/Alarm/AlarmCard';
import BaseHeader from '@/components/Common/Header/BaseHeader';
import LoadingItem from '@/components/Common/LoadingItem';
import { alarmTranslation } from '@/constants/translation';
import { useInfiniteGetAlarms, usePatchReadAlarm } from '@/hooks/api/useAlarm';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useUserStore } from '@/store/user';
import { AlarmItemType } from '@/types/api/alarm';
import { isEmployerByAccountType } from '@/utils/signup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlarmPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGetAlarms(10);

  const { mutateAsync } = usePatchReadAlarm();
  const { account_type } = useUserStore();

  const navigate = useNavigate();

  const [alarmList, setAlarmList] = useState<AlarmItemType[]>([]);

  const readAlarm = async (id: number) => {
    const result = await mutateAsync(id);
    if (result?.success)
      setAlarmList([
        ...alarmList.map((data) =>
          data.id === id ? { ...data, is_read: true } : data,
        ),
      ]);
  };

  const targetRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, !!hasNextPage);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const result = data.pages.flatMap((page) => page.data?.notification_list);
      setAlarmList(result);
    }
  }, [data]);

  return (
    <>
      <BaseHeader
        hasBackButton={true}
        onClickBackButton={() => navigate('/')}
        hasMenuButton={false}
        title={
          alarmTranslation.alarmTitle[isEmployerByAccountType(account_type)]
        }
      />
      <section className="flex flex-col gap-[1rem] w-full p-[1rem] pb-[5rem]">
        {alarmList?.length > 0 ? (
          alarmList.map((data) => (
            <AlarmCard key={data.id} alarmData={data} readAlarm={readAlarm} />
          ))
        ) : (
          <div className="mt-8 w-full text-center body-2">
            {alarmTranslation.emptyAlarm[isEmployerByAccountType(account_type)]}
          </div>
        )}
        {isFetchingNextPage && <LoadingItem />}
      </section>
      <div ref={targetRef} className="h-1"></div>
    </>
  );
};

export default AlarmPage;
