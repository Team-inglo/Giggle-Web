import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  min-height: 100dvh;
`;

export const AddJobButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem);
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.gray};
`;

export const AddJobIcon = styled.div`
  align-self: end;
  color: ${(props) => props.theme.colors.black};
`;
