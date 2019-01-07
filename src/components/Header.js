import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import logo from '../img/horizontal-logo.png';
import * as utils from "./utils";

const Container = styled.div`
  max-width: 1080px;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
  background-color: #fff;
  margin: auto;
  min-height: 10vh;
  padding: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.primary500};
`

const Logo = styled.img`
  height: 100%;
  width: 280px;
  padding: 0px 10px 0px 10px;
`
const Spacer = styled.div`
  flex-grow: 10;
`

// Temporarily remove nav. I expect navigating to /faq and /kiosks via links within
// the splash page and returning to splash via the logo link at top left
// <Spacer/>
// <utils.InternalLink to="/Flu101">Flu101</utils.InternalLink>
// <utils.InternalLink to="/FAQ">FAQ</utils.InternalLink>

class Header extends React.Component  {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {

    const { match, location, history } = this.props;
    if(location.pathname === '/') return null;

    return (
      <Container>
        <utils.InternalLink to="/">
          <Logo src={logo} alt="logo" />
        </utils.InternalLink>
      </Container>
    )
  }

}

export default Header = withRouter(Header)
