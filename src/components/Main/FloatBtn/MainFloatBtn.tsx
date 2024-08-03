import ChatBotIcon from "../../../assets/icons/chatbot_icon.svg?react";
import { Container, FloatButton, Tooltip } from "./styled";

const MainFloatBtn = () => {
  return (
    <Container>
      <Tooltip />
      <FloatButton>
        <ChatBotIcon />
      </FloatButton>
    </Container>
  );
};

export default MainFloatBtn;
