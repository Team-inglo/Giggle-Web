import { ButtonContainer, CheckButton, Container, InfoBox, InfoContainer, InfoContent, InfoTitle, StatusText } from "./style";

interface Applicant {
  id: number;
  name: string;
  date: string;
}

type EmployerDocumentDetailApplicantProp = {
  applicant: Applicant;
};

const EmployerDocumentDetailApplicant = ({ applicant }: EmployerDocumentDetailApplicantProp) => {
  return (
    <Container>
      <InfoContainer>
        <InfoBox>
          <InfoTitle>지원자</InfoTitle>
          <InfoContent>{applicant?.name}</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>지원날짜</InfoTitle>
          <InfoContent>{applicant?.date}</InfoContent>
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
