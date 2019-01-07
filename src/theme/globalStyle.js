import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #fff
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`
export const theme = {
  neutral100: "#F7F7F7",
  neutral200: "#DCDEDF",
  neutral300: "#C6C8C9",
  neutral400: "#A3A7A9",
  neutral500: "#707D81",
  neutral600: "#394D53",
  neutral700: "#223940",
  neutral900: "#042A36",
  primary200: "#C6DEE6",
  primary300: "#99D0E1",
  primary400: "#69C0DB",
  primary500: "#31ABD1",
  primary600: "#1780A1",
  primary700: "#074B61",
  primary900: "#04252F",
  accent200: "#FBE3D4",
  accent300: "#FDC5A1",
  accent400: "#FA9C60",
  accent500: "#F67D2F",
  accent700: "#CE5E16",
  accent900: "#993C00",
  warning200: "#FFCDCD",
  warning500: "#D81C1C",
  warning900: "#700000",
}