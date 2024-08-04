import { useState } from "react";
import { CalendarStyled, Container, DotContainer, DotStyled } from "./style";
import moment from "moment";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface jobSchedule {
  name: string;
  color: string;
  days: string[];
}

const ScheduleListCalendar = () => {
  const today = new Date();

  const [date, setDate] = useState<Value>(today);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  // 알바 날짜 예시
  const attendDay: jobSchedule[] = [
    {
      name: "파리바게트",
      color: "#FFB65A",
      days: [
        "2023-01-01",
        "2024-08-01",
        "2024-08-08",
        "2024-08-05",
        "2024-08-12",
        "2024-08-19",
        "2024-08-26",
      ],
    },
    {
      name: "베스킨라빈스",
      color: "#7DD0B6",
      days: [
        "2024-08-01",
        "2024-08-08",
        "2024-08-15",
        "2024-08-22",
        "2024-08-29",
      ],
    },
    {
      name: "알바3",
      color: "#FF7B5A",
      days: [
        "2024-08-01",
        "2024-08-08",
        "2024-08-15",
        "2024-08-22",
        "2024-08-29",
      ],
    },
  ];

  const findAttendDay = (date: string): string[] => {
    const set: Set<string> = new Set();
    for (const data of attendDay) {
      if (data.days.includes(date)) set.add(data.color);
    }
    return [...set];
  };

  return (
    <Container>
      <CalendarStyled
        value={date}
        onChange={handleDateChange}
        locale="en"
        formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        tileContent={({ date }) => {
          const html = [];
          const colors = findAttendDay(moment(date).format("YYYY-MM-DD"));
          html.push(
            colors.map((color) => (
              <DotStyled
                key={moment(date).format("YYYY-MM-DD")}
                color={color}
              ></DotStyled>
            ))
          );

          return <DotContainer>{html}</DotContainer>;
        }}
      />
    </Container>
  );
};

export default ScheduleListCalendar;
