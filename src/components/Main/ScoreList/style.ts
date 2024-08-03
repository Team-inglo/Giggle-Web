import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: -3.5rem;
  padding: 0 1.5rem;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  overflow-x: scroll;
  // 스크롤바 제거
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }
`;

export const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1.2rem;
  min-width: 8rem;
  height: 7.3rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ScoreTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

export const ScoreNumber = styled.div`
  font-size: 0.875rem;
  text-align: end;
`;
