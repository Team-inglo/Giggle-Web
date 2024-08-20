import { ButtonBox, Container, Explain, NoticeButton, SubmitButton } from "./style";

const JobDetailButton = () => {
  return (
    <Container>
      <ButtonBox>
        <Explain>고용주와 얘기를 해야해요</Explain>
        <NoticeButton>공고 보러가기</NoticeButton>
      </ButtonBox>
      <ButtonBox>
        <Explain>고용주와 이미 얘기했어요</Explain>
        <SubmitButton>공고 보러가기</SubmitButton>
      </ButtonBox>
    </Container>
  );
};

export default JobDetailButton;
