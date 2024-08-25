import { useState } from "react";
import {
  CalendarStyled,
  CalendarWrapper,
  Container,
  DeleteBox,
  DeleteButton,
  DeleteText,
  DotStyled,
  OptionBox,
  OptionText,
  SubmitButton,
  TimeInput,
} from "./style";
import moment from "moment";
import DeleteIcon from "../../../assets/icons/delete_icon.svg?react";
import { Calendar } from "../../../interfaces/calendar/totalSchedule";

type ScheduleAddCalendarProp = {
  openCalendarDays: () => void;
  onChangeCalendarView: (newDate: Date) => void;
  changedSchedules: Calendar[];
  setChangedSchedules: (value: Calendar[]) => void;
};

const ScheduleAddCalendar = ({
  openCalendarDays,
  onChangeCalendarView,
  changedSchedules,
  setChangedSchedules,
}: ScheduleAddCalendarProp) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  const handleDateChange = (newDate: Date) => {
    const newDateStr = moment(newDate).format("YYYY-MM-DD");
    const findData = changedSchedules.find((value) => value.date === newDateStr);
    setSelectedDate(findData?.date || "");
    setStartTime(findData?.startAt || "");
    setEndTime(findData?.endAt || "");
  };

  const handleEditStartTime = (newStartTime: string) => {
    setStartTime(newStartTime);
    setChangedSchedules(changedSchedules.map((value) => (value.date === selectedDate ? { ...value, startAt: newStartTime } : value)));
  };

  const handleEditEndTime = (newEndTime: string) => {
    setEndTime(newEndTime);
    setChangedSchedules(changedSchedules.map((value) => (value.date === selectedDate ? { ...value, endAt: newEndTime } : value)));
  };

  const handleDeleteDate = () => {
    setChangedSchedules(changedSchedules.filter((value) => value.date !== selectedDate));
    setSelectedDate(null);
  };

  return (
    <Container>
      <SubmitButton onClick={openCalendarDays}>일정 추가하기</SubmitButton>
      <CalendarWrapper>
        <CalendarStyled
          onClickDay={handleDateChange}
          locale="en"
          onActiveStartDateChange={({ activeStartDate }) => activeStartDate && onChangeCalendarView(activeStartDate)}
          formatDay={(_locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
          formatYear={(_locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
          formatMonthYear={(_locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
          calendarType="gregory" // 일요일 부터 시작
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
          // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
          tileContent={({ date, view }) => {
            if (view !== "month") return;
            const html = [];
            if (changedSchedules.some((value) => value.date === moment(date).format("YYYY-MM-DD"))) {
              html.push(<DotStyled key={moment(date).format("YYYY-MM-DD")}></DotStyled>);
            }
            return <>{html}</>;
          }}
        />
        {selectedDate && (
          <>
            <OptionBox>
              <OptionText>시작시간</OptionText>
              <TimeInput type="time" value={startTime} onChange={(e) => handleEditStartTime(e.target.value)} />
            </OptionBox>
            <OptionBox>
              <OptionText>종료시간</OptionText>
              <TimeInput type="time" value={endTime} onChange={(e) => handleEditEndTime(e.target.value)} />
            </OptionBox>
            <DeleteBox>
              <DeleteButton onClick={handleDeleteDate}>
                <DeleteIcon width={15} height={15} />
                <DeleteText>일정 삭제</DeleteText>
              </DeleteButton>
            </DeleteBox>
          </>
        )}
      </CalendarWrapper>
    </Container>
  );
};

export default ScheduleAddCalendar;
