import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
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

export const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.6rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.mainColor};
  border-radius: 1rem;
  font-size: 0.7rem;
  white-space: nowrap;
`;
