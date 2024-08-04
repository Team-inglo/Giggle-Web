import { Container, Logo } from "./style";
import SettingIcon from "../../../assets/icons/setting_icon.svg?react";

const MainHeader = () => {
  return (
    <Container>
      <Logo>Giggle</Logo>
      <SettingIcon />
    </Container>
  );
};

export default MainHeader;
