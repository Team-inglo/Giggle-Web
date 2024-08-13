import React from 'react';
import styled from "styled-components";

const MainLayout = (props: { children: React.ReactNode}) => {
  return <Wrapper>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 360px;
  align-items: center;
  min-height: 100vh;
  margin: 0;
`;

export default MainLayout;
