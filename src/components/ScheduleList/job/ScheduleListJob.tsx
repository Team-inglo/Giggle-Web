import { Summary } from "../../../interfaces/calendar/totalSchedule";
import { ColorIcon, Container, ContentBox, Text, Title, TotalSalaryBox } from "./style";

const ScheduleListJob = ({ data }: { data: Summary }) => {
  return (
    <Container>
      <ColorIcon color={data.color}></ColorIcon>
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
