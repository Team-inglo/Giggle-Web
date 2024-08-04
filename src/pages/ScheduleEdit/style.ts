import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  min-height: 100dvh;
`;

export const ContentContainer = styled.div`
  padding: 0 1.5rem 2rem 1.5rem;
  width: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const DeleteButton = styled.button``;

export const SubmitButton = styled.button`
  margin-top: 4rem;
  padding: 0.7rem 0;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.lightBlack};
  border-radius: 0.5rem;
  font-size: 1rem;
`;
