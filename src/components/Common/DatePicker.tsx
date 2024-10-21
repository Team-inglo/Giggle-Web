import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from '@/style/CustomCalendar.module.css';
import NextMonthIcon from '@/assets/icons/Chevron.svg?react';
import PrevMonthIcon from '@/assets/icons/ChevronLeft.svg?react';

const months = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Calendar 컴포넌트의 value prop 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  setSelectedDate: (date: string) => void; // 선택된 날짜를 상위 컴포넌트에 전달하는 함수
};

const DatePicker = ({ setSelectedDate }: Props) => {
  // 현재 선택된 날짜 상태
  const [value, setValue] = useState<Value>(new Date());

  // 달력 상단에 표시될 내비게이션 레이블 커스터마이징
  const navigationLabel = ({ date }: { date: Date }) => {
    return (
      <span>
        {months[date.getMonth()]} {date.getFullYear()}
      </span>
    );
  };

  return (
    <div className="w-full relative rounded-[11px] bg-white border border-[rgba(55,56,60,0.16)] box-border flex flex-col items-end justify-start py-5 gap-5 text-center body-3 text-[#121212]">
      <div className={styles.customCalendar}>
        <Calendar
          onChange={setValue} // 날짜 선택 시 호출되는 핸들러
          minDetail="month" // 최소 표시 단위를 월로 설정
          onClickDay={(value) =>
            setSelectedDate(moment(value).format('YYYY/MM/DD'))
          } // 날짜 클릭 시 상위 컴포넌트에 선택된 날짜 전달
          value={value}
          formatDay={(_, date: Date) => date.getDate().toString()} // 일 표시 형식 커스터마이징
          formatShortWeekday={(_, date: Date) =>
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
          } // 요일 표시 형식 커스터마이징
          formatMonth={(_, date: Date) => (date.getMonth() + 1).toString()} // 월 표시 형식 커스터마이징
          className={styles.reactCalendar}
          nextLabel={<NextMonthIcon />} // 월 이동 아이콘 커스텀
          prevLabel={<PrevMonthIcon />} // 월 이동 아이콘 커스텀
          //TODO: 연도 이동 아이콘 디자이넝에게 제공 받으면 추가해야 함.
          showNeighboringMonth={false} // 이전/다음 달의 날짜를 표시하지 않음
          locale="en-US" // 로케일 설정
          navigationLabel={navigationLabel} // 내비게이션 레이블 커스터마이징
        />
      </div>
    </div>
  );
};

// React.memo를 사용하여 불필요한 리렌더링 방지
export default React.memo(DatePicker);
