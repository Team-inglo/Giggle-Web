import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";
import JobDetailInfo from "../../components/JobDetail/Info/JobDetailInfo";
import { Container, ContentContainer } from "./style";

const EmployerJobDetailPage = () => {
  return (
    <Container>
      <BackBtnHeader />
      <ContentContainer>
        <JobDetailInfo />
      </ContentContainer>
    </Container>
  );
};

export default EmployerJobDetailPage;
