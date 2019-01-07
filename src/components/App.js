import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import ScrollToTop from "./ScrollToTop";
import { GlobalStyle, PageContainer, theme } from "../theme/globalStyle";
import Header from "./Header";
import { Footer } from "./Footer";
import { Splash } from "./Splash";
import { FAQ } from "./FAQ";
import { Flu101 } from "./Flu101";
import { Kiosks } from "./Kiosks";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle/>
              <PageContainer>
                <Header/>
                <Route exact path="/" component={Splash}/>
                <Route path="/faq" component={FAQ}/>
                <Route path="/flu101" component={Flu101}/>
                <Route path="/kiosks" component={Kiosks}/>
                <Footer/>
              </PageContainer>
            </>
          </ThemeProvider>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
