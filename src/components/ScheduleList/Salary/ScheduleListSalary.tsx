import ScheduleListCalendar from "../Calendar/ScheduleListCalendar";
import ScheduleListJob from "../job/ScheduleListJob";
import {
  Container,
  EditButton,
  TotalSalaryBox,
  TotalSalaryText,
} from "./style";

const ScheduleListSalary = () => {
  return (
    <Container>
      <TotalSalaryBox>
        <TotalSalaryText>월급</TotalSalaryText>
        <TotalSalaryText>520,000원</TotalSalaryText>
      </TotalSalaryBox>
      <EditButton>스케쥴 편집하기 +</EditButton>
      <ScheduleListCalendar />
      <ScheduleListJob />
      <ScheduleListJob />
    </Container>
  );
};

export default ScheduleListSalary;
