import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";
import JobDetailButton from "../../components/JobDetail/Button/JobDetailButton";
import JobDetailInfo from "../../components/JobDetail/Info/JobDetailInfo";
import { Container, ContentContainer } from "./style";

const JobDetailPage = () => {
  return (
    <Container>
      <BackBtnHeader />
      <ContentContainer>
        <JobDetailInfo />
        <JobDetailButton />
      </ContentContainer>
    </Container>
  );
};

export default JobDetailPage;
