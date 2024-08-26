import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem 0.5rem;
  width: 100%;
`;

export const UserNameBox = styled.div`
  margin-bottom: 0.6rem;
  width: 100%;
  display: flex;
  align-items: baseline;
  line-height: 1.5;
  gap: 0.75rem;
`;

export const UserName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
`;

export const UserCountry = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.black};
`;

export const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoContentBox = styled.div`
  display: flex;
  align-items: start;
  gap: 0.5rem;
`;

export const InfoIcon = styled.div`
  padding-top: 0.3rem;
  color: ${(props) => props.theme.colors.black};
`;

export const InfoTextBox = styled.div`
  line-height: 1.5;
`;

export const InfoTitle = styled.div`
  padding-bottom: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
`;

export const InfoContent = styled.div`
  letter-spacing: 0.05rem;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.black};
`;
