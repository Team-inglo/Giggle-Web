import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/back_icon.svg?react";
import GiGiIcon from "../../assets/icons/gigi_icon.svg?react";
import SendIcon from "../../assets/icons/send_icon.svg?react";
import {
  BackButton,
  ChatBotBox,
  ChatBotContent,
  ChatBotName,
  ChatBotText,
  ChatBotTime,
  Container,
  ContentContainer,
  HeaderContainer,
  Input,
  InputContainer,
  SubmitButton,
  UserChatBox,
  UserChatContent,
  UserChatText,
  UserChatTime,
} from "./style";

const ChatBotPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderContainer>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon />
        </BackButton>
        <GiGiIcon />
        <ChatBotName>GIGI</ChatBotName>
      </HeaderContainer>
      <ContentContainer>
        <ChatBotBox>
          <GiGiIcon />
          <ChatBotContent>
            <ChatBotText>difuherogih</ChatBotText>
            <ChatBotTime>12:12</ChatBotTime>
          </ChatBotContent>
        </ChatBotBox>
        <UserChatBox>
          <UserChatContent>
            <UserChatText>difuherogihherogihherogihherogihherogih</UserChatText>
            <UserChatTime>12:12</UserChatTime>
          </UserChatContent>
        </UserChatBox>
      </ContentContainer>
      {/* 이거 모바일에서 키보드나올 때 인풋창도 같이 올라오도록 해야할듯한데? */}
      <InputContainer>
        <Input placeholder="입력해주세요." />
        <SubmitButton>
          <SendIcon />
        </SubmitButton>
      </InputContainer>
    </Container>
  );
};

export default ChatBotPage;
