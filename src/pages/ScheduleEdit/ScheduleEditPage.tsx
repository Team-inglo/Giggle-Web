import {
  Container,
  ContentContainer,
  DeleteButton,
  SubmitButton,
  Title,
  TitleBox,
} from "./style";
import DeleteIcon from "../../assets/icons/delete_icon.svg?react";
import ScheduleEditInput from "../../components/ScheduleEdit/Input/ScheduleEditInput";
import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";

const ScheduleEditPage = () => {
  return (
    <Container>
      <BackBtnHeader />
      <ContentContainer>
        <TitleBox>
          <Title>12월 18일 일요일</Title>
          <DeleteButton>
            <DeleteIcon />
          </DeleteButton>
        </TitleBox>
        <ScheduleEditInput />
        <SubmitButton>수정 완료</SubmitButton>
      </ContentContainer>
    </Container>
  );
};

export default ScheduleEditPage;
