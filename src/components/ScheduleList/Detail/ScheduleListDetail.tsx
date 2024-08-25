import { Container, ContentBox, Text, Title } from "./style";
import { Schedule } from "../../../interfaces/calendar/totalSchedule";

const ScheduleListDetail = ({ schedule }: { schedule: Schedule }) => {
  const parseArrToTime = (dateArr: number[]) => {
    const formattedHour = String(dateArr[3]).padStart(2, "0"); // 두 자릿수로 맞춤
    const formattedMinute = String(dateArr[4]).padStart(2, "0"); // 두 자릿수로 맞춤
    return `${formattedHour}:${formattedMinute}`;
  };

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
