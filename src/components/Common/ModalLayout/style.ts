import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: 10;
  overflow: hidden;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 90dvw;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
`;

export const CancelButton = styled.button`
  align-self: flex-end;
`;
