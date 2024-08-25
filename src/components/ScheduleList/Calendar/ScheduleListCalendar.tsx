import { CalendarStyled, Container, DotContainer, DotStyled } from "./style";
import moment from "moment";
import { TotalSchedule } from "../../../interfaces/calendar/totalSchedule";
import { parseArrToDate } from "../../../utils/dateTimeUtil";

const ScheduleListCalendar = ({
  jobScheduleData,
  date,
  setDate,
  onChangeCalendarView,
}: {
  jobScheduleData: TotalSchedule;
  date: Date;
  setDate: (data: Date) => void;
  onChangeCalendarView: (newDate: Date) => void;
}) => {
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const findAttendDay = (date: string): string[] => {
    const set: Set<string> = new Set();
    for (const data of jobScheduleData.schedules) {
      if (parseArrToDate(data.startAt) === date) {
        const findJobSummary = jobScheduleData.summary.find((value) => value.name === data.partTimeName);
        findJobSummary && set.add(findJobSummary.color);
      }
    }
    return [...set];
  };

  return (
    <Container>
      <CalendarStyled
        value={date}
        onActiveStartDateChange={({ activeStartDate }) => activeStartDate && onChangeCalendarView(activeStartDate)}
        onClickDay={(date) => handleDateChange(date)}
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
          const colors = findAttendDay(moment(date).format("YYYY-MM-DD"));
          html.push(colors.map((color, index) => <DotStyled key={moment(date).format("YYYY-MM-DD") + index} color={color}></DotStyled>));

          return <DotContainer>{html}</DotContainer>;
        }}
      />
    </Container>
  );
};

export default ScheduleListCalendar;
