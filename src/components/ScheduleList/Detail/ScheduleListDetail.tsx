import { Container, ContentBox, Text, Title } from "./style";
import { Schedule } from "../../../interfaces/calendar/totalSchedule";
import { parseArrToTime } from "../../../utils/dateTimeUtil";

const ScheduleListDetail = ({ schedule }: { schedule: Schedule }) => {
  const calculateSalary = (startDateArr: number[], endDateArr: number[], hourlyRate: number) => {
    const workHours = endDateArr[3] - startDateArr[3];
    return hourlyRate * workHours;
  };

  return (
    <Container>
      <ContentBox>
        <Title>{calculateSalary(schedule.startAt, schedule.endAt, schedule.hourlyRate)}원</Title>
        <Text>{schedule.partTimeName}</Text>
        <Text>
          {parseArrToTime(schedule.startAt)} ~ {parseArrToTime(schedule.endAt)}
        </Text>
      </ContentBox>
    </Container>
  );
};

export default ScheduleListDetail;
