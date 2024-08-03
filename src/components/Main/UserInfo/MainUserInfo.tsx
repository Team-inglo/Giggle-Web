import {
  Container,
  InfoBox,
  InfoContent,
  InfoContentBox,
  InfoIcon,
  InfoTextBox,
  InfoTitle,
  UserCountry,
  UserName,
  UserNameBox,
} from "./styled";
import UserIcon from "../../../assets/icons/user_icon.svg?react";
import MapPinIcon from "../../../assets/icons/map_pin_icon.svg?react";
import HiddenIcon from "../../../assets/icons/hidden_icon.svg?react";

const MainUserInfo = () => {
  return (
    <Container>
      <UserNameBox>
        <UserName>정은지님</UserName>
        <UserCountry>미국</UserCountry>
      </UserNameBox>
      <InfoBox>
        <InfoContentBox>
          <InfoIcon>
            <UserIcon />
          </InfoIcon>
          <InfoTextBox>
            <InfoTitle>외국인 등록번호</InfoTitle>
            <InfoContent>*******-*******</InfoContent>
          </InfoTextBox>
        </InfoContentBox>
        <HiddenIcon />
      </InfoBox>
      <InfoBox>
        <InfoContentBox>
          <InfoIcon>
            <MapPinIcon />
          </InfoIcon>
          <InfoTextBox>
            <InfoTitle>거주지</InfoTitle>
            <InfoContent>서울특별시 강북구 수유동 222-55</InfoContent>
          </InfoTextBox>
        </InfoContentBox>
      </InfoBox>
    </Container>
  );
};

export default MainUserInfo;
