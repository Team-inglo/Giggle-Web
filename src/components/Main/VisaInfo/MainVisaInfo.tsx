import { HomeInfo } from "../../../interfaces/home/homeInfo";
import { Container, LeftDate, ProgressBar, ProgressBarBox, Title, VisaBox, VisaButton } from "./style";

const MainVisaInfo = ({ homeInfo }: { homeInfo: HomeInfo }) => {
  return (
    <Container>
      <VisaBox>
        <Title>남은 체류 기간</Title>
        <LeftDate>{homeInfo?.periodOfStay}</LeftDate>
        <ProgressBarBox>
          <ProgressBar></ProgressBar>
        </ProgressBarBox>
        <VisaButton>비자 연장</VisaButton>
      </VisaBox>
    </Container>
  );
};

export default MainVisaInfo;
