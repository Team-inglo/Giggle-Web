import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 1rem;
  width: 100%;
  border-radius: 0.3rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const ContentBox = styled.div`
  color: ${(props) => props.theme.colors.black};
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
`;

export const Text = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.3;
`;

export const EditButton = styled.button``;
