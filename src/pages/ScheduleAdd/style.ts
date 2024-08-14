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
  padding-bottom: 0.3rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.black};
`;

export const SubTitle = styled.div`
  padding-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.gray};
`;
