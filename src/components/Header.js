import React from 'react';
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
  @media (max-width: 520px) {
    width: 116px;
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

const HeaderLink = withRouter(props => {
  const { location, to, children } = props;
  return (
    <LinkContainer>
      {(location.pathname !== to)
        ? <utils.InternalSoftLink to={to}>{children}</utils.InternalSoftLink>
        : <utils.InternalLink to={to}>{children}</utils.InternalLink>}
    </LinkContainer>
  )
});


export default class Header extends React.Component {
  render() {
    return (
      <HeaderContainer>
        <LogoContainer>
          <utils.InternalLink to="/">
            <Logo src={logo} alt="logo" />
          </utils.InternalLink>
        </LogoContainer>
        <Spacer/>
        <HeaderLink to="/current">Current Conditions</HeaderLink>
        <HeaderLink to="/kiosks">Find a Kiosk</HeaderLink>
        <HeaderLink to="/results">Find My Results</HeaderLink>
        <HeaderLink to="/faq">FAQ</HeaderLink>
      </HeaderContainer>
    )
  }
}
