import { createGlobalStyle } from "styled-components";

const GlobalStye = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /*태블릿 및 모바일 화면을 위한 스타일링*/
  @media (max-width: 768px) {

  }

  /*모바일 화면을 위한 스타일링*/
  @media (max-width: 480px) {

  }
  
  body {
    /* 글씨체 넣기! */
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    background-color: white;
  }
`;

export default GlobalStye;
