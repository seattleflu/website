import styled, { createGlobalStyle } from 'styled-components'

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

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

// this is mocks/seattle-flu-study-colour-palette-v4.sketch
export const theme = {
  white: "#FFFFFF",
  black: "#000000",
  neutral100: "#EDEFEF",
  neutral200: "#C9CED0",
  neutral300: "#A6AEB0",
  neutral400: "#828D91",
  neutral500: "#707D81",
  neutral600: "#626D71",
  neutral700: "#464E51",
  neutral800: "#2A2F30",
  neutral900: "#0E1010",
  primary100: "#C2DEEA",
  primary200: "#ADD3E3",
  primary300: "#92C4DA",
  primary400: "#6EB0CE",
  primary500: "#3D95BD",
  primary600: "#2E708E",
  primary700: "#23546B",
  primary800: "#1A3F50",
  primary900: "#142F3C",
  accent100: "#FDE3B4",
  accent200: "#FCDA9B",
  accent300: "#FBCE7A",
  accent400: "#F9BE4D",
  accent500: "#F7A812",
  accent600: "#B97E0E",
  accent700: "#8B5F0A",
  accent800: "#684708",
  accent900: "#4E3506",
  warning500: "#D81C1C",
}
