import { ButtonContainer, CheckButton, Container, InfoBox, InfoContainer, InfoContent, InfoTitle, StatusText } from "./style";

const EmployerDocumentDetailApplicant = () => {
  return (
    <Container>
      <InfoContainer>
        <InfoBox>
          <InfoTitle>지원자</InfoTitle>
          <InfoContent>이름</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>지원날짜</InfoTitle>
          <InfoContent>2024-08-20</InfoContent>
        </InfoBox>
      </InfoContainer>
      <ButtonContainer>
        <StatusText>시간제 취업허가서 작성 중</StatusText>
        <CheckButton>근로계약서 확인</CheckButton>
      </ButtonContainer>
    </Container>
  );
};

export default EmployerDocumentDetailApplicant;
