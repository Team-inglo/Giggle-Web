import { AddJobButton, AddJobIcon, Container } from "./style";
import EmployerMenu from "../../components/Common/EmployerMenu/EmployerMenu";
import EmployerHeader from "../../components/Common/EmployerHeader/EmployerHeader";
import EmployerDocumentTab from "../../components/EmployerDocument/Tab/EmployerDocumentTab";
import { EmployerNotice } from "../../interfaces/document/employerNotice";
import { useNavigate } from "react-router-dom";

const ongoingNoticeList: EmployerNotice[] = [
  {
    announcementId: 1,
    title: "고등학생 영어 조교 모집",
    addressName: "서울시 강북구 덕릉로",
    completor: 1,
    applicant: 5,
    numberRecruited: 10,
    deadLine: "2024-09-10",
  },
  {
    announcementId: 2,
    title: "롯데시네마 영화관 파트타이머 모집",
    addressName: "서울시 중구",
    completor: 2,
    applicant: 3,
    numberRecruited: 22,
    deadLine: "2024-10-03",
  },
  {
    announcementId: 3,
    title: "파리바게트 파트타이머 모집",
    addressName: "서울시 강북구 수유동",
    completor: 3,
    applicant: 8,
    numberRecruited: 20,
    deadLine: "2024-10-10",
  },
  {
    announcementId: 4,
    title: "베스킨라빈스 파트타이머 모집",
    addressName: "서울시 강북구 솔샘로",
    completor: 4,
    applicant: 4,
    numberRecruited: 10,
    deadLine: "2024-09-20",
  },
  {
    announcementId: 5,
    title: "이마트 판촉 파트타이머 모집",
    addressName: "서울시 강북구 한천로",
    completor: 2,
    applicant: 4,
    numberRecruited: 14,
    deadLine: "2024-09-25",
  },
];

const completeNoticeList: EmployerNotice[] = [
  {
    announcementId: 6,
    title: "파리바게트 파트타이머 모집",
    addressName: "서울시 강북구 수유동",
    completor: 3,
    applicant: 8,
    numberRecruited: 20,
    deadLine: "2024-10-10",
  },
  {
    announcementId: 7,
    title: "베스킨라빈스 파트타이머 모집",
    addressName: "서울시 강북구 솔샘로",
    completor: 4,
    applicant: 4,
    numberRecruited: 10,
    deadLine: "2024-09-20",
  },
  {
    announcementId: 8,
    title: "이마트 판촉 파트타이머 모집",
    addressName: "서울시 강북구 한천로",
    completor: 2,
    applicant: 4,
    numberRecruited: 14,
    deadLine: "2024-09-25",
  },
];

const EmployerDocumentPage = () => {
  const navigate = useNavigate();

  const goToRegistrationPage = () => {
    navigate(`/employer-registration`);
  };

  return (
    <>
      <Container>
        <EmployerHeader />
        <AddJobButton onClick={goToRegistrationPage}>
          공고 등록하기<AddJobIcon>+</AddJobIcon>
        </AddJobButton>
        <EmployerDocumentTab ongoingNoticeList={ongoingNoticeList} completeNoticeList={completeNoticeList} />
      </Container>
      <EmployerMenu />
    </>
  );
};

export default EmployerDocumentPage;
