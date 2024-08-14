import { JobSchedule } from "../../../interfaces/Schedule/JobSchedule";
import {
  ColorIcon,
  Container,
  ContentBox,
  Text,
  Title,
  TotalSalaryBox,
} from "./style";

const ScheduleListJob = ({ data }: { data: JobSchedule }) => {
  return (
    <Container>
      <ColorIcon color={data.color}></ColorIcon>
      <ContentBox>
        <Title>{data.name}</Title>
        <TotalSalaryBox>
          <Text>전체</Text>
          <Text>
            {data.time}시간 <br /> 시급 {data.money}원
          </Text>
        </TotalSalaryBox>
      </ContentBox>
    </Container>
  );
};

export default ScheduleListJob;
