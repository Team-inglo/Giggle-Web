import { useState } from "react";
import {
  ButtonContainer,
  CalendarStyled,
  CalendarWrapper,
  CancleButton,
  Container,
  DotStyled,
  ForbiddenStyled,
  OptionBox,
  OptionText,
  SubmitButton,
  TimeInput,
} from "./style";
import moment from "moment";
import { Calendar } from "../../../interfaces/calendar/totalSchedule";

type ScheduleAddCalendarDaysProp = {
  closeCalendarDays: () => void;
  onChangeCalendarView: (newDate: Date) => void;
  changedSchedules: Calendar[];
  setChangedSchedules: (value: Calendar[]) => void;
  color: string | null;
};

const ScheduleAddCalendarDays = ({
  closeCalendarDays,
  onChangeCalendarView,
  changedSchedules,
  setChangedSchedules,
  color,
}: ScheduleAddCalendarDaysProp) => {
  const [dates, setDates] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleDateChange = (newDate: Date) => {
    const newDateStr = moment(newDate).format("YYYY-MM-DD");
    if (changedSchedules.find((value) => value.date === newDateStr)) return;
    // 없으면 추가, 있으면 삭제
    if (dates.includes(newDateStr)) {
      setDates([...dates.filter((value) => value !== newDateStr)]);
    } else {
      setDates([...dates, newDateStr]);
    }
  };

  const submitCalendarDays = () => {
    closeCalendarDays();
    if (!startTime || !endTime) return;
    const newData = dates.map((value) => {
      return { date: value, startAt: startTime, endAt: endTime };
    });
    setChangedSchedules([...changedSchedules, ...newData]);
  };

  return (
    <Container>
      <ButtonContainer>
        <CancleButton onClick={closeCalendarDays}>취소하기</CancleButton>
        <SubmitButton onClick={submitCalendarDays}>저장하기</SubmitButton>
      </ButtonContainer>
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
            const selectedDate = moment(date).format("YYYY-MM-DD");
            // 선택한 부분 표시
            if (dates.includes(selectedDate)) {
              html.push(<DotStyled key={moment(date).format("YYYY-MM-DD")} $color={color}></DotStyled>);
            } else if (changedSchedules.find((value) => value.date === selectedDate)) {
              // 선택 불가능한 부분 취소선
              html.push(<ForbiddenStyled key={moment(date).format("YYYY-MM-DD")}></ForbiddenStyled>);
            }
            return <>{html}</>;
          }}
        />
        <OptionBox>
          <OptionText>시작시간</OptionText>
          <TimeInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </OptionBox>
        <OptionBox>
          <OptionText>종료시간</OptionText>
          <TimeInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </OptionBox>
      </CalendarWrapper>
    </Container>
  );
};

export default ScheduleAddCalendarDays;
