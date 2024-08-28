import { useNavigate } from "react-router-dom";
import { EmployerNotice } from "../../../interfaces/document/employerNotice";
import {
  ApplicantButton,
  ButtonContainer,
  Container,
  InfoBox,
  InfoContainer,
  InfoContent,
  InfoTitle,
  LeftDate,
  NoticeDetailButton,
  SubTitle,
  Title,
  TitleContainer,
} from "./style";

const EmployerDocumentNotice = ({ noticeData }: { noticeData: EmployerNotice }) => {
  const navigate = useNavigate();

  const goToJobDetailPage = () => {
    navigate(`/notice-employer/detail/${noticeData.announcementId}`);
  };

  const goToApplicantPage = () => {
    navigate(`/document-employer/${noticeData.announcementId}`);
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{noticeData.title}</Title>
        <SubTitle>{noticeData.addressName}</SubTitle>
      </TitleContainer>
      <InfoContainer>
        <InfoBox>
          <InfoTitle>서류완료자/지원자</InfoTitle>
          <InfoContent>
            {noticeData.completor}/{noticeData.applicant}명
          </InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoTitle>모집 마감</InfoTitle>
          <InfoContent>{noticeData.deadLine}</InfoContent>
        </InfoBox>
      </InfoContainer>
      <LeftDate>마감까지 {noticeData.numberRecruited}일 남았어요.</LeftDate>
      <ButtonContainer>
        <NoticeDetailButton onClick={goToJobDetailPage}>공고 상세보기</NoticeDetailButton>
        <ApplicantButton onClick={goToApplicantPage}>지원자 보기</ApplicantButton>
      </ButtonContainer>
    </Container>
  );
};

export default EmployerDocumentNotice;
