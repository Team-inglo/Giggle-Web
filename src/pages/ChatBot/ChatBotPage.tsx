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
  Container,
  ContentContainer,
  GiGiIconWrapper,
  HeaderContainer,
  Input,
  InputContainer,
  SubmitButton,
  UserChatBox,
  UserChatContent,
  UserChatText,
} from "./style";
import { usePostChat } from "../../hooks/services/chatbot/mutations";
import { useState } from "react";

interface ChatBotPage {
  isBot: boolean;
  message: string;
  // 시간 값도 필요함...
}

const ChatBotPage = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState<string>("");
  const [chatData, setChatData] = useState<ChatBotPage[]>([]);

  const mutation = usePostChat();

  const onClickSubmit = () => {
    if (!prompt) return;

    const newUserChatData = {
      isBot: false,
      message: prompt,
    };

    setChatData([...chatData, newUserChatData]);
    setPrompt("");

    mutation.mutate(
      { userId: 1, prompt: prompt },
      {
        onSuccess: (data) => {
          // I will fire second!
          const newChatBotData = {
            isBot: true,
            message: data?.data?.data,
          };

          console.log("success: ", data);

          setChatData([...chatData, newUserChatData, newChatBotData]);
        },
        onError: (error) => {
          // I will fire second!
          console.error("error: ", error.message);
        },
      }
    );
  };

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
        {chatData.map((data, idx) =>
          data.isBot ? (
            <ChatBotBox key={idx}>
              <GiGiIconWrapper>
                <GiGiIcon />
              </GiGiIconWrapper>
              <ChatBotContent>
                <ChatBotText>{data.message}</ChatBotText>
                {/* <ChatBotTime>12:12</ChatBotTime> */}
              </ChatBotContent>
            </ChatBotBox>
          ) : (
            <UserChatBox key={idx}>
              <UserChatContent>
                <UserChatText>{data.message}</UserChatText>
                {/* <UserChatTime>12:12</UserChatTime> */}
              </UserChatContent>
            </UserChatBox>
          )
        )}
      </ContentContainer>
      <InputContainer>
        <Input placeholder="입력해주세요." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <SubmitButton onClick={onClickSubmit}>
          <SendIcon />
        </SubmitButton>
      </InputContainer>
    </Container>
  );
};

export default ChatBotPage;
