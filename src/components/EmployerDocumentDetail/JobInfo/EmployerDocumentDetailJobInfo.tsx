import EmployerDocumentDetailApplicant from "../Applicant/EmployerDocumentDetailApplicant";
import { ApplicantContainer, InfoContainer, InfoContent, InfoTitle, InfoWrapper, SubTitle, Title } from "./style";

const EmployerDocumentDetailJobInfo = () => {
  return (
    <>
      <Title>파리바게트 파트타이머 모집</Title>
      <SubTitle>서울시 강북구 수유동</SubTitle>
      <InfoContainer>
        <InfoWrapper>
          <InfoTitle>서류완료자/지원자</InfoTitle>
          <InfoContent>3/8명</InfoContent>
        </InfoWrapper>
        <InfoWrapper>
          <InfoTitle>모집 마감일</InfoTitle>
          <InfoContent>2024.08.24</InfoContent>
        </InfoWrapper>
      </InfoContainer>
      <ApplicantContainer>
        <EmployerDocumentDetailApplicant />
        <EmployerDocumentDetailApplicant />
        <EmployerDocumentDetailApplicant />
      </ApplicantContainer>
    </>
  );
};

export default EmployerDocumentDetailJobInfo;
