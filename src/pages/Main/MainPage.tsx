import Menu from "../../components/Common/Menu/Menu";
import MainFloatBtn from "../../components/Main/FloatBtn/MainFloatBtn";
import MainHeader from "../../components/Common/Header/MainHeader";
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
      <MainFloatBtn />
      <Menu />
    </>
  );
};

export default MainPage;
