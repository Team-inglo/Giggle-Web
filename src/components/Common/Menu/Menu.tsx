import { Container, MenuBox, MenuText } from "./styled";

import DocumentIcon from "../../../assets/icons/document_icon.svg?react";
import NoticeIcon from "../../../assets/icons/notice_icon.svg?react";
import HomeIcon from "../../../assets/icons/home_icon.svg?react";
import CalendarIcon from "../../../assets/icons/calendar_icon.svg?react";
import ChatIcon from "../../../assets/icons/chat_icon.svg?react";

const Menu = () => {
  // 나중에 페이지 연결하기
  // const menuData = { 서류: "/", 공고: "/", 홈: "/", 캘린더: "/", 챗봇: "/" };

  return (
    <Container>
      <MenuBox>
        <DocumentIcon />
        <MenuText>서류</MenuText>
      </MenuBox>
      <MenuBox>
        <NoticeIcon />
        <MenuText>공고</MenuText>
      </MenuBox>
      <MenuBox>
        <HomeIcon />
        <MenuText>홈</MenuText>
      </MenuBox>
      <MenuBox>
        <CalendarIcon />
        <MenuText>캘린더</MenuText>
      </MenuBox>
      <MenuBox>
        <ChatIcon />
        <MenuText>챗봇</MenuText>
      </MenuBox>
    </Container>
  );
};

export default Menu;
