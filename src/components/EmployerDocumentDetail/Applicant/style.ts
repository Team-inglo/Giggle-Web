import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  width: 100%;
`;

export const InfoBox = styled.div`
  flex: 1;
`;

export const InfoTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.gray};
`;

export const InfoContent = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
`;

export const StatusText = styled.p`
  flex: 1;
  padding-right: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.deepRed};
  word-break: keep-all;
`;

export const CheckButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.lightBlack};
  text-align: center;
`;
