import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  min-height: 100dvh;
`;

export const ContentContainer = styled.div`
  padding: 0 1.5rem 2rem 1.5rem;
  width: 100%;
  .activated {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
  }
  .disabled {
    background-color: ${(props) => props.theme.colors.lightGray};
    color: ${(props) => props.theme.colors.gray};
    border: 1px solid ${(props) => props.theme.colors.gray};
  }
`;

export const Title = styled.div`
  padding-bottom: 0.3rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.black};
`;

export const PageCounter = styled.div`
  font-size: 20px;
  line-height: 24px;
  text-align: left;
`;

export const PageText = styled.span`
  color: ${(props) => props.theme.colors.gray};
`;
