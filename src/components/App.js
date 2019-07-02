import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import ScrollToTop from "./ScrollToTop";
import { GlobalStyle, theme } from "../theme/globalStyle";
import Header from "./Header";
import { Footer } from "./Footer";
import { Splash } from "./Splash";
import { FAQ } from "./FAQ";
import CurrentConditions from "./CurrentConditions";
import Kiosks from "./Kiosks";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle/>
                <Header/>
                <Route exact path="/" component={Splash}/>
                <Route path="/current" component={CurrentConditions}/>
                <Route path="/faq" component={FAQ}/>
                <Route path="/kiosks" component={Kiosks}/>
                <Footer/>
            </>
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
