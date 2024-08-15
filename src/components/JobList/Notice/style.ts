import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.7rem;
`;

export const DayTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.6rem;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.red};
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const MoneyTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.6rem;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.lightGreen};
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
  line-height: 1.5;
`;

export const Location = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.lightBlack};
  line-height: 1.5;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.7rem;
  width: 100%;
`;

export const RecruitingNum = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const LikeButton = styled.button<{ $like: boolean }>`
  path {
    fill: ${(props) => (props.$like ? props.theme.colors.red : props.theme.colors.gray)};
  }
`;
