import React from 'react';
import styled from 'styled-components'
import logo from '../img/logo.svg';

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

const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: ${props => props.theme.accent500};
  }
`
const Logo = styled.img`
  height: 100%;
  max-width: 70vw;
`


export const Header = () => (
  <Container>
    <Logo src={logo} alt="logo" />
    <span/>
    <Link>FAQ</Link>
  </Container>
)