import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  min-height: 100dvh;
`;

export const ContentContainer = styled.div`
  padding: 0 1.5rem 2rem 1.5rem;
  width: 100%;
`;

export const Title = styled.div`
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  color: ${(props) => props.theme.colors.black};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const MenuBox = styled.button`
  display: flex;
  gap: 2rem;
  align-items: center;
  color: ${(props) => props.theme.colors.lightBlack};
  font-size: 1rem;
  line-height: 1.5;
`;
