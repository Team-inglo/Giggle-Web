import { useState } from "react";
import { JobSchedule } from "../../../interfaces/Schedule/JobSchedule";
import ScheduleListBottomSheet from "../BottomSheet/ScheduleListBottomSheet";
import ScheduleListCalendar from "../Calendar/ScheduleListCalendar";
import ScheduleListJob from "../job/ScheduleListJob";
import { Container, EditButton, TotalSalaryBox, TotalSalaryText } from "./style";
import { useNavigate } from "react-router-dom";

const ScheduleListSalary = () => {
  const navigate = useNavigate();

  const today = new Date();

  const [date, setDate] = useState<Date>(today);

  // 알바 날짜 예시
  const jobScheduleData: JobSchedule[] = [
    {
      name: "파리바게트",
      color: "#FFB65A",
      time: 20,
      money: 10000,
      days: ["2023-01-01", "2024-08-01", "2024-08-08", "2024-08-05", "2024-08-12", "2024-08-19", "2024-08-26"],
    },
    {
      name: "베스킨라빈스",
      color: "#7DD0B6",
      time: 12,
      money: 9000,
      days: ["2024-08-01", "2024-08-08", "2024-08-15", "2024-08-22", "2024-08-29"],
    },
    {
      name: "단기알바",
      color: "#FF7B5A",
      time: 15,
      money: 12000,
      days: ["2024-08-16"],
    },
  ];

  const goToAddPage = () => {
    navigate("/calendar/add");
  };

  return (
    <>
      <Container>
        <TotalSalaryBox>
          <TotalSalaryText>월급</TotalSalaryText>
          <TotalSalaryText>520,000원</TotalSalaryText>
        </TotalSalaryBox>
        <EditButton onClick={goToAddPage}>스케쥴 편집하기 +</EditButton>
        <ScheduleListCalendar jobScheduleData={jobScheduleData} date={date} setDate={setDate} />
        {jobScheduleData.map((data) => (
          <ScheduleListJob key={data.name} data={data} />
        ))}
      </Container>
      <ScheduleListBottomSheet date={date} />
    </>
  );
};

export default ScheduleListSalary;
