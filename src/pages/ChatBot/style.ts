import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: ${(props) => props.theme.colors.white};
`;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 1rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

export const BackButton = styled.button`
  padding-right: 1rem;
`;

export const ChatBotName = styled.div`
  padding: 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const ContentContainer = styled.div`
  padding-top: 3.5rem;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.lightOrange};
`;

export const ChatBotBox = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;
`;

export const ChatBotContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

export const ChatBotText = styled.div`
  padding: 0.75rem 0.85rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  border-radius: 0 1rem 1rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-all;
`;

export const ChatBotTime = styled.div`
  align-self: flex-end;
  padding-right: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
`;

export const UserChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
`;

export const UserChatContent = styled.div``;

export const UserChatText = styled.div`
  padding: 0.75rem 0.85rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  color: ${(props) => props.theme.colors.black};
  border-radius: 1rem 0 1rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-all;
`;

export const UserChatTime = styled.div`
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
`;

export const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 1rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Input = styled.textarea`
  flex: 1;
  height: 2rem;
  border: none;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.5;
  resize: none;
`;

export const SubmitButton = styled.button``;
