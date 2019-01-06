import React from 'react';
import styled from 'styled-components'
import logo from '../img/logo.svg';
import * as utils from "./utils";

const Container = styled.div`
  background-color: ${props => props.theme.primary900};
  min-height: 10vh;
  padding: 2vh 20px 2vh 20px;
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
  max-width: 70vw;
`
const Spacer = styled.div`
  flex-grow: 10;
`

export const Header = () => (
  <Container>
    <utils.InternalLink to="/">
      <Logo src={logo} alt="logo" />
    </utils.InternalLink>
    <Spacer/>
    <utils.InternalLink to="/Flu101">Flu101</utils.InternalLink>
    <utils.InternalLink to="/FAQ">FAQ</utils.InternalLink>
  </Container>
)