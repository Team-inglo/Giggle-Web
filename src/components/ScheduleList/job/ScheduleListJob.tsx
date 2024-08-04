import {
  ColorIcon,
  Container,
  ContentBox,
  Text,
  Title,
  TotalSalaryBox,
} from "./style";

const ScheduleListJob = () => {
  return (
    <Container>
      <ColorIcon></ColorIcon>
      <ContentBox>
        <Title>파리바게트</Title>
        <TotalSalaryBox>
          <Text>전체 20시간</Text>
          <Text>
            20시간 <br /> 시급 10,000원
          </Text>
        </TotalSalaryBox>
      </ContentBox>
    </Container>
  );
};

export default ScheduleListJob;
