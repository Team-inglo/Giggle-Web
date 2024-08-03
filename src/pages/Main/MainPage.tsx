import Menu from "../../components/Common/Menu/Menu";
import MainHeader from "../../components/Main/Header/MainHeader";
import MainScoreList from "../../components/Main/ScoreList/MainScoreList";
import MainUserInfo from "../../components/Main/UserInfo/MainUserInfo";
import MainVisaInfo from "../../components/Main/VisaInfo/MainVisaInfo";
import { Container, UserInfoContainer } from "./style";

const MainPage = () => {
  return (
    <>
      <Container>
        <MainHeader />
        <UserInfoContainer>
          <MainUserInfo />
        </UserInfoContainer>
        <MainScoreList />
        <MainVisaInfo />
      </Container>
      <Menu />
    </>
  );
};

export default MainPage;
