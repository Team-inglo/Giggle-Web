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

export const InfoWrapper = styled.div`
  margin-right: 0.5rem;
  padding: 0.8rem;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const InfoTitle = styled.div`
  line-height: 1.5;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const InfoContent = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
`;

export const ExtraInfoWrapper = styled.div`
  display: flex;
  align-items: start;
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 0.3rem;
  gap: 0.5rem;
`;

export const ExtraInfoText = styled.div``;

export const ExtraInfoTitle = styled.div`
  padding-bottom: 0.3rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
`;

export const ExtraInfoContent = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.deepGray};
`;

export const ContentContainer = styled.div`
  margin: 1rem 0;
  padding-bottom: 1rem;
`;
export const ContentTitle = styled.div`
  padding-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
`;

export const ContentText = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.black};
`;
