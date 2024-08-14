import { useState } from "react";
import { CalendarStyled, CalendarWrapper, Container, DotStyled, OptionBox, OptionText, SelectRepeat, SubmitButton, TimeInput } from "./style";
import moment from "moment";

const ScheduleAddCalendar = () => {
  const [dates, setDates] = useState<string[]>([]);

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
      <SubmitButton>주기 저장</SubmitButton>
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
          <TimeInput type="time" />
        </OptionBox>
        <OptionBox>
          <OptionText>종료시간</OptionText>
          <TimeInput type="time" />
        </OptionBox>
        <OptionBox>
          <OptionText>반복</OptionText>
          <SelectRepeat>
            <option value="없음">없음</option>
            <option value="매일">매일</option>
            <option value="매주">매주</option>
            <option value="매달">매달</option>
            <option value="매년">매년</option>
          </SelectRepeat>
        </OptionBox>
      </CalendarWrapper>
    </Container>
  );
};

export default ScheduleAddCalendar;
