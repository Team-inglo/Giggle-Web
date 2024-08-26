import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

export const FilterBox = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: ${(props) => (props.$isSelected ? props.theme.colors.lightBlack : props.theme.colors.gray)};
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: ${(props) => (props.$isSelected ? "4px" : "0px")} solid ${(props) => props.theme.colors.lightBlack};
  font-size: 1rem;
  white-space: nowrap;
`;
