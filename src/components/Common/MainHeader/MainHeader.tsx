import { Container, Logo, SettingButton } from "./style";
import SettingIcon from "../../../assets/icons/setting_icon.svg?react";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();

  const goToSettingPage = () => {
    navigate("/setting");
  };

  return (
    <Container>
      <Logo>Giggle</Logo>
      <SettingButton onClick={goToSettingPage}>
        <SettingIcon />
      </SettingButton>
    </Container>
  );
};

export default MainHeader;
