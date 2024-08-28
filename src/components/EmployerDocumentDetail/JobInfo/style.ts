import styled from "styled-components";

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.black};
`;

export const SubTitle = styled.div`
  padding-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.black};
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

export const InfoWrapper = styled.div``;

export const InfoTitle = styled.div`
  line-height: 1.5;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const InfoContent = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.deepGray};
`;

export const ApplicantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding-top: 1rem;
  width: 100%;
`;
