import { useState } from "react";
import {
  ButtonContainer,
  CalendarStyled,
  CalendarWrapper,
  CancleButton,
  Container,
  DotStyled,
  OptionBox,
  OptionText,
  SubmitButton,
  TimeInput,
} from "./style";
import moment from "moment";

const ScheduleAddCalendarDays = ({ closeCalendarDays }: { closeCalendarDays: () => void }) => {
  const [dates, setDates] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  const handleDateChange = (newDate: Date) => {
    const newDateStr = moment(newDate).format("YYYY-MM-DD");
    // 없으면 추가, 있으면 삭제
    if (dates.includes(newDateStr)) {
      setDates([...dates.filter((value) => value !== newDateStr)]);
    } else {
      setDates([...dates, newDateStr]);
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <CancleButton onClick={closeCalendarDays}>취소하기</CancleButton>
        <SubmitButton onClick={closeCalendarDays}>저장하기</SubmitButton>
      </ButtonContainer>
      <CalendarWrapper>
        <CalendarStyled
          onClickDay={handleDateChange}
          locale="en"
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
            if (dates.includes(moment(date).format("YYYY-MM-DD"))) {
              html.push(<DotStyled key={moment(date).format("YYYY-MM-DD")}></DotStyled>);
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
