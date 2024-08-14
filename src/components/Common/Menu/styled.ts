import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100dvw;
  padding: 0.5rem 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  background-color: ${(props) => props.theme.colors.white};
`;

export const MenuBox = styled.div<{ $currentmenu: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
  color: ${(props) => (props.$currentmenu ? props.theme.colors.mainColor : props.theme.colors.gray)};
  // svg 색상 변경하기
  path,
  circle {
    stroke: ${(props) => (props.$currentmenu ? props.theme.colors.mainColor : props.theme.colors.gray)};
  }
`;

export const MenuText = styled.div`
  font-size: 0.68rem;
  text-align: center;
`;
