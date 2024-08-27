import Menu from "../../components/Common/Menu/Menu";
import MainFloatBtn from "../../components/Main/FloatBtn/MainFloatBtn";
import MainHeader from "../../components/Common/MainHeader/MainHeader";
import MainScoreList from "../../components/Main/ScoreList/MainScoreList";
import MainUserInfo from "../../components/Main/UserInfo/MainUserInfo";
import MainVisaInfo from "../../components/Main/VisaInfo/MainVisaInfo";
import { Container, UserInfoContainer } from "./style";
import { useGetHome } from "../../hooks/services/home/queries";

const MainPage = () => {
  const { isLoading, error, data } = useGetHome();

  if (isLoading) return <div></div>;
  if (error) return <div>에러남: {error.message}</div>;
  if (data)
    return (
      <>
        <Container>
          <MainHeader />
          <UserInfoContainer>
            <MainUserInfo homeInfo={data?.data?.data} />
          </UserInfoContainer>
          <MainScoreList homeInfo={data?.data?.data} />
          <MainVisaInfo homeInfo={data?.data?.data} />
        </Container>
        <MainFloatBtn />
        <Menu />
      </>
    );
};

export default MainPage;
