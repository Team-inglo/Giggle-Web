import styled from "styled-components";

export const Container = styled.div`
  padding: 0 1rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingButton = styled.button``;

export const Logo = styled.div`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.mainColor};
`;
