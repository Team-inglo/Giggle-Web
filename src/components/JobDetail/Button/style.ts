import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
`;

export const Explain = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.lightBlack};
  text-align: center;
`;

export const NoticeButton = styled.button`
  padding: 0.7rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  color: ${(props) => props.theme.colors.black};
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.7rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
`;
