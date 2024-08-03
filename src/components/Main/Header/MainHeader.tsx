import { Container, Logo, SettingIcon } from "./style";
import settingIcon from "../../../assets/icons/setting_icon.svg";

const MainHeader = () => {
  return (
    <Container>
      <Logo>Giggle</Logo>
      <SettingIcon src={settingIcon} />
    </Container>
  );
};

export default MainHeader;
