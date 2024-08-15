import BackBtnHeader from "../../components/Common/BackBtnHeader/BackBtnHeader";
import { Container, ContentContainer, MenuBox, MenuContainer, Title } from "./style";
import UserInfoIcon from "../../assets/icons/user_info_icon.svg?react";
import FileIcon from "../../assets/icons/file_icon.svg?react";
import LogoutIcon from "../../assets/icons/logout_icon.svg?react";
import QuestionIcon from "../../assets/icons/question_icon.svg?react";

const SettingPage = () => {
  return (
    <Container>
      <BackBtnHeader />
      <ContentContainer>
        <Title>계정 관리</Title>
        <MenuContainer>
          <MenuBox>
            <UserInfoIcon />내 정보 수정
          </MenuBox>
          <MenuBox>
            <UserInfoIcon />
            비밀번호 변경
          </MenuBox>
          <MenuBox>
            <UserInfoIcon />
            여권 업데이트
          </MenuBox>
        </MenuContainer>
        <Title>스펙 수정</Title>
        <MenuContainer>
          <MenuBox>
            <FileIcon />
            TOPIK 증명서
          </MenuBox>
          <MenuBox>
            <FileIcon />
            사회통합프로그램 증명서
          </MenuBox>
          <MenuBox>
            <FileIcon />
            세종학당 증명서
          </MenuBox>
          <MenuBox>
            <FileIcon />
            성적증명서
          </MenuBox>
        </MenuContainer>
        <Title>기타</Title>
        <MenuContainer>
          <MenuBox>
            <QuestionIcon style={{ marginRight: "0.3rem" }} />
            문의
          </MenuBox>
          <MenuBox>
            <LogoutIcon />
            로그아웃
          </MenuBox>
        </MenuContainer>
      </ContentContainer>
    </Container>
  );
};

export default SettingPage;
