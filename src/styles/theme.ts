import { DefaultTheme } from "styled-components";

const colors = {
  mainColor: "#FFB65A",
  lightOrange: "#FFD8A8",
  white: "#fff",
  black: "#151515",
  lightBlack: "#383838",
  deepGray: "#757575",
  gray: "#AAA",
  lightGray: "#F2F2F2",
  red: "#FF7B5A",
  lightGreen: "#7DD0B6",
};

export type ColorsTypes = typeof colors;
export const theme: DefaultTheme = {
  colors,
};
