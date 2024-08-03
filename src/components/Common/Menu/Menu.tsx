import { Container, MenuBox, MenuIcon, MenuText } from "./styled";

import documentIcon from "../../../assets/icons/document_icon.svg";
import noticeIcon from "../../../assets/icons/notice_icon.svg";
import homeIcon from "../../../assets/icons/home_icon.svg";
import calendarIcon from "../../../assets/icons/calendar_icon.svg";
import chatIcon from "../../../assets/icons/chat_icon.svg";

const Menu = () => {
  // 나중에 페이지 연결하기
  // const menuData = { 서류: "/", 공고: "/", 홈: "/", 캘린더: "/", 챗봇: "/" };

  return (
    <Container>
      <MenuBox>
        <MenuIcon src={documentIcon} />
        <MenuText>서류</MenuText>
      </MenuBox>
      <MenuBox>
        <MenuIcon src={noticeIcon} />
        <MenuText>공고</MenuText>
      </MenuBox>
      <MenuBox>
        <MenuIcon src={homeIcon} />
        <MenuText>홈</MenuText>
      </MenuBox>
      <MenuBox>
        <MenuIcon src={calendarIcon} />
        <MenuText>캘린더</MenuText>
      </MenuBox>
      <MenuBox>
        <MenuIcon src={chatIcon} />
        <MenuText>챗봇</MenuText>
      </MenuBox>
    </Container>
  );
};

export default Menu;
