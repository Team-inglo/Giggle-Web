import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Tab = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  margin-top: ${(props) => (props.$isSelected ? "0px" : "-5px")};
  padding: 0.5rem 1rem;
  border-bottom: ${(props) => (props.$isSelected ? "5px" : "0px")} solid ${(props) => props.theme.colors.black};
  background-color: white;
  color: ${(props) => (props.$isSelected ? props.theme.colors.lightBlack : props.theme.colors.gray)};
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
`;

export const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem 5rem 1rem;
  width: 100%;
`;
