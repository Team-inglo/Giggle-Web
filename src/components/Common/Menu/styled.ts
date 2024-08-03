import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100dvw;
  padding: 0.5rem 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  background-color: ${(props) => props.theme.colors.white};
`;

export const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
`;

export const MenuText = styled.div`
  font-size: 0.68rem;
  color: ${(props) => props.theme.colors.gray};
  text-align: center;
`;
