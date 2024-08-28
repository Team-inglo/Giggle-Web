import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";
import EmployerDocumentDetailJobInfo from "../../components/EmployerDocumentDetail/JobInfo/EmployerDocumentDetailJobInfo";
import { Container, ContentContainer } from "./style";

const EmployerDocumentDetailPage = () => {
  return (
    <Container>
      <BackBtnHeader />
      <ContentContainer>
        <EmployerDocumentDetailJobInfo />
      </ContentContainer>
    </Container>
  );
};

export default EmployerDocumentDetailPage;
