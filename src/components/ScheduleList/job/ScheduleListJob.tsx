import { Schedule, Summary } from "../../../interfaces/calendar/totalSchedule";
import { ColorIcon, Container, ContentBox, Text, Title, TotalSalaryBox } from "./style";

const ScheduleListJob = ({ data, schedules }: { data: Summary; schedules: Schedule[] }) => {
  return (
    <Container>
      <ColorIcon color={schedules.find((value) => value?.partTimeColor === data.color)?.partTimeColor ?? "#fff"}></ColorIcon>
      <ContentBox>
        <Title>{data.name}</Title>
        <TotalSalaryBox>
          <Text>전체</Text>
          <Text>
            {data.totalHour}시간 <br /> 시급 {data.salary}원
          </Text>
        </TotalSalaryBox>
      </ContentBox>
    </Container>
  );
};

export default ScheduleListJob;
