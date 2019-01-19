import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import logo from '../img/logo-horizontal.png';
import * as utils from "./utils";

const HeaderContainer = styled.div`
  max-width: 1080px;
  @media (max-width: 735px) {
    max-width: 90vw;
  }
  background-color: #fff;
  margin: auto;
  height: 60px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.primary500};
`
const LogoContainer = styled.div`
  margin: auto;
  overflow: hidden;
  @media (max-width: 480px) {
    width: 56px;
  }
`

const Logo = styled.img`
  height: 60px;
  width: auto;
  padding: 0px;
`
const Spacer = styled.div`
  flex-grow: 10;
`

const LinkContainer = styled.div`
  margin: 0em 1em 0em 1em;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  color: ${props => props.theme.neutral500};
  border-bottom: 1px solid ${props => props.theme.neutral200};
`

class Header extends React.Component  {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {

    const { match, location, history } = this.props;

    return (
      <HeaderContainer>
          <LogoContainer>
            <utils.InternalLink to="/">
              <Logo src={logo} alt="logo" />
            </utils.InternalLink>
          </LogoContainer>
        <Spacer/>
        <LinkContainer>
          {(location.pathname !== '/kiosks') ? (
            <utils.InternalSoftLink to="/kiosks">Find a Kiosk</utils.InternalSoftLink>
          ) : <utils.InternalLink to="/kiosks">Find a Kiosk</utils.InternalLink>}
        </LinkContainer>
        <LinkContainer>
          {(location.pathname !== '/faq') ? (
            <utils.InternalSoftLink to="/faq">FAQ</utils.InternalSoftLink>
          ) : <utils.InternalLink to="/faq">FAQ</utils.InternalLink>}
        </LinkContainer>
      </HeaderContainer>
    )
  }

}

export default Header = withRouter(Header)
