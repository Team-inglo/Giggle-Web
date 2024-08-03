import { ThemeProvider } from "styled-components";
import Router from "./router";
import GlobalStye from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStye />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
