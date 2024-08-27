import { useState } from "react";
import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";
import EmployerRegistrationInput from "../../components/EmployerRegistration/EmployerRegistrationInput";
import {
  Container,
  ContentContainer,
  PageCounter,
  PageText,
  Title,
} from "./style";

const EmployerRegistrationPage = () => {
  const [pageNum, setPageNum] = useState(1);
  return (
    <>
      <Container>
        <BackBtnHeader />
        <ContentContainer>
          <PageCounter>
            <PageText>{pageNum}</PageText>/4
          </PageCounter>
          <Title>공고 등록</Title>
          <EmployerRegistrationInput setPageNum={() => setPageNum(pageNum + 1)}/>
        </ContentContainer>
      </Container>
    </>
  );
};

export default EmployerRegistrationPage;
