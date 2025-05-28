import { AlarmItemType } from '@/types/api/alarm';
import { UserType } from '@/constants/user';
import { useUserStore } from '@/store/user';
import {
  useCurrentApplicantIdStore,
  useCurrentPostIdEmployeeStore,
} from '@/store/url';
import { useNavigate } from 'react-router-dom';
import EmptyJobIcon from '@/assets/icons/EmptyJobIcon.svg?react';
import { alarmTranslation } from '@/constants/translation';

type AlarmCardListProps = {
  alarmList: AlarmItemType[];
  language: 'ko' | 'en';
  readAlarm: (id: number) => void;
};

const AlarmCardList = ({
  alarmList,
  language,
  readAlarm,
}: AlarmCardListProps) => {
  const navigate = useNavigate();

  const { updateCurrentPostId } = useCurrentPostIdEmployeeStore();
  const { updateCurrentApplicantId } = useCurrentApplicantIdStore();
  const { account_type } = useUserStore();

  const goToDetailPage = async (
    isRead: boolean,
    id: number,
    postId: number,
  ) => {
    if (!isRead) readAlarm(id);

    if (account_type === UserType.OWNER) {
      updateCurrentApplicantId(postId);
      navigate(`/employer/applicant/${postId}`);
    } else if (account_type === UserType.USER) {
      updateCurrentPostId(postId);
      navigate(`/application/${postId}`);
    }
  };

  if (alarmList?.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-1">
        <EmptyJobIcon />
        <p className="body-14-regular text-[#9397A1] text-center">
          {alarmTranslation.emptyAlarm[language]}
        </p>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col gap-2">
      {alarmList.map((alarmData) => (
        <article
          className="w-full p-4 flex items-start gap-1"
          onClick={() =>
            goToDetailPage(
              alarmData.is_read,
              alarmData.id,
              alarmData.user_owner_job_posting_id,
            )
          }
          key={alarmData.id}
        >
          <div
            className={`w-2 h-2 rounded-full ${alarmData.is_read ? `bg-transparent` : `bg-[#F3213B]`}`}
          ></div>
          <div className="w-full">
            <div className="w-full pb-1 flex items-end gap-1">
              <h5
                className={`button-16-semibold ${alarmData.is_read ? `text-text-disabled` : `text-text-normal`} `}
              >
                {alarmData.title}
              </h5>
              <p
                className={`caption-12-regular ${alarmData.is_read ? `text-text-disabled` : `text-text-assistive`}`}
              >
                {alarmData.created_at}
              </p>
              {alarmData.is_read && (
                <p className="ml-auto caption-12-regular text-text-disabled">
                  읽음
                </p>
              )}
            </div>
            <p
              className={`caption-12-regular ${alarmData.is_read ? `text-text-disabled` : `text-text-alternative`}`}
            >
              {alarmData.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default AlarmCardList;
