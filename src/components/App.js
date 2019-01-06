import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from "../theme/globalStyle";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Splash } from "./Splash";
import { FAQ } from "./FAQ";
import { Flu101 } from "./Flu101";
import { Kiosks } from "./Kiosks";

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle/>
            <Header/>
            <Route exact path="/" component={Splash}/>
            <Route path="/faq" component={FAQ}/>
            <Route path="/flu101" component={Flu101}/>
            <Route path="/kiosks" component={Kiosks}/>
            <Footer/>
          </>
        </ThemeProvider>
      </Router>

    );
  }
}

export default App;
