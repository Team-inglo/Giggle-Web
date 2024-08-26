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
import EyeOffIcon from "../../../assets/icons/eye_off_icon.svg?react";
import EyeOnIcon from "../../../assets/icons/eye_on_icon.svg?react";
import { useState } from "react";

const foreignNumber = "123456-1234567";

const MainUserInfo = () => {
  const [showNumber, setShowNumber] = useState<boolean>(false);

  const onClickShowNumber = () => {
    setShowNumber(true);
  };

  const onClickHiddenNumber = () => {
    setShowNumber(false);
  };

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
            <InfoContent>{showNumber ? foreignNumber : "******-*******"}</InfoContent>
          </InfoTextBox>
        </InfoContentBox>
        {showNumber ? <EyeOnIcon onClick={onClickHiddenNumber} /> : <EyeOffIcon onClick={onClickShowNumber} />}
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
