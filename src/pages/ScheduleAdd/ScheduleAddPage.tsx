import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";
import ScheduleAddInput from "../../components/ScheduleAdd/Input/ScheduleAddInput";
import { Container, ContentContainer, SubTitle, Title } from "./style";

const ScheduleAddPage = () => {
  return (
    <Container>
      <BackBtnHeader />
      <ContentContainer>
        <Title>스케쥴 편집하기</Title>
        <SubTitle>근로 내용이 캘린더에 기록돼요!</SubTitle>
        <ScheduleAddInput />
      </ContentContainer>
    </Container>
  );
};

export default ScheduleAddPage;
