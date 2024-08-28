import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  width: 100%;
  border-radius: 0.3rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const TitleContainer = styled.div``;

export const Title = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.5;
`;

export const SubTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.5;
`;

export const InfoContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
  width: 100%;
`;

export const InfoBox = styled.div`
  flex: 1;
`;

export const InfoTitle = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray};
  line-height: 1.5;
`;

export const InfoContent = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.5;
`;

export const LeftDate = styled.p`
  padding: 0.3rem 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.deepRed};
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NoticeDetailButton = styled.button`
  flex: 1;
  padding: 0.6rem;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.mainColor};
  border-radius: 0.5rem;
  text-align: center;
`;

export const ApplicantButton = styled.button`
  flex: 1;
  padding: 0.6rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 0.5rem;
  text-align: center;
`;
