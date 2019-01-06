import React, { Component } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components'
import logo from './logo.svg';
import { GlobalStyle, theme } from "./theme/globalStyle";

const AppWrapper = styled.div`
  text-align: center;
`
const AppHeader = styled.div`
  background-color: ${props => props.theme.backgroundDark};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const appLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const AppLogo = styled.img`
  animation: ${appLogoSpin} infinite 20s linear;
  height: 40vmin;
`

const AppLink = styled.a`
  color: #61dafb;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle/>
          <AppWrapper>
            <AppHeader>
              <AppLogo src={logo} alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
              </AppLink>
            </AppHeader>
          </AppWrapper>
        </>
      </ThemeProvider>
    );
  }
}

export default App;
