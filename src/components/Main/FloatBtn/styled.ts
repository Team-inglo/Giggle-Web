import styled from "styled-components";
import ChatBotTooltip from "../../../assets/images/chatbot_tooltip.svg?react";

export const Container = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

export const Tooltip = styled(ChatBotTooltip)``;

export const FloatButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.mainColor};
`;
