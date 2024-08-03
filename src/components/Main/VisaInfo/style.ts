import styled from "styled-components";

export const Container = styled.div`
  margin: 2rem 1rem 0 1rem;
  color: ${(props) => props.theme.colors.black};
`;

export const VisaBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1.25rem;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1rem;
`;

export const Title = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
`;

export const LeftDate = styled.div`
  font-size: 0.875rem;
`;

export const ProgressBarBox = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 0.4rem;
  background-color: ${(props) => props.theme.colors.lightGray};
  border-radius: 1rem;
`;

export const ProgressBar = styled.div`
  width: 60%;
  height: 0.4rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  border-radius: 1rem;
`;

export const VisaButton = styled.button`
  align-self: flex-end;
  padding: 0.5rem;
  width: 8.75rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 0.8rem;
`;
