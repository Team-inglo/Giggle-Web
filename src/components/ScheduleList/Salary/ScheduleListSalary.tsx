import { useState } from "react";

import ScheduleListBottomSheet from "../BottomSheet/ScheduleListBottomSheet";
import ScheduleListCalendar from "../Calendar/ScheduleListCalendar";
import ScheduleListJob from "../job/ScheduleListJob";
import { Container, EditButton, TotalSalaryBox, TotalSalaryText } from "./style";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { TotalSchedule } from "../../../interfaces/calendar/totalSchedule";

const ScheduleListSalary = () => {
  const navigate = useNavigate();

  const today = new Date();

  const [date, setDate] = useState<Date>(today);
  const [, setYear] = useState<number>(today.getFullYear());
  const [, setMonth] = useState<number>(today.getMonth());

  // 캘린더 년,월 변경 시 새로 조회하기
  const onChangeCalendarView = (newDate: Date) => {
    setYear(Number(moment(newDate).format("YYYY")));
    setMonth(Number(moment(newDate).format("MM")));
  };

  // 알바 날짜 예시
  const jobScheduleData: TotalSchedule = {
    summary: [
      {
        name: "베스킨라빈스",
        totalHour: 5.0,
        salary: 55000.0,
        color: "#FFB65A",
      },
      {
        name: "파리바게트",
        totalHour: 16.0,
        salary: 160000.0,
        color: "#7DD0B6",
      },
    ],
    totalSalary: 215000.0,
    schedules: [
      {
        id: 1,
        partTimeName: "파리바게트",
        hourlyRate: 10000,
        startAt: [2024, 8, 25, 9, 0],
        endAt: [2024, 8, 25, 17, 0],
      },
      {
        id: 2,
        partTimeName: "파리바게트",
        hourlyRate: 10000,
        startAt: [2024, 8, 26, 10, 0],
        endAt: [2024, 8, 26, 18, 0],
      },
      {
        id: 3,
        partTimeName: "베스킨라빈스",
        hourlyRate: 11000,
        startAt: [2024, 8, 16, 9, 0],
        endAt: [2024, 8, 16, 12, 0],
      },
      {
        id: 4,
        partTimeName: "베스킨라빈스",
        hourlyRate: 11000,
        startAt: [2024, 8, 18, 10, 0],
        endAt: [2024, 8, 18, 12, 0],
      },
      {
        id: 2,
        partTimeName: "베스킨라빈스",
        hourlyRate: 10000,
        startAt: [2024, 8, 25, 10, 0],
        endAt: [2024, 8, 25, 18, 0],
      },
    ],
  };

  const goToAddPage = () => {
    navigate("/calendar/add");
  };

  return (
    <>
      <Container>
        <TotalSalaryBox>
          <TotalSalaryText>월급</TotalSalaryText>
          <TotalSalaryText>{jobScheduleData.totalSalary}원</TotalSalaryText>
        </TotalSalaryBox>
        <EditButton onClick={goToAddPage}>스케쥴 편집하기 +</EditButton>
        <ScheduleListCalendar jobScheduleData={jobScheduleData} date={date} setDate={setDate} onChangeCalendarView={onChangeCalendarView} />
        {jobScheduleData?.summary.map((data, idx) => (
          <ScheduleListJob key={`${data.name}_${idx}`} data={data} />
        ))}
      </Container>
      <ScheduleListBottomSheet date={date} schedules={jobScheduleData.schedules} />
    </>
  );
};

export default ScheduleListSalary;
