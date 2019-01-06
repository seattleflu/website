import React from 'react';
import styled from 'styled-components'
import logoBBI from '../img/BBILogoGrey.png';
import logoUWMed from '../img/UWMedLogoGrey.png';
import logoSC from '../img/SeattleChildrensLogoGrey.png';
import logoFH from '../img/FredHutchLogoGrey.png';

const Container = styled.div`
  background-color: ${props => props.theme.primary900};
  min-height: 10vh;
  width: 100vw;
  font-size: 15px;
  line-height: 24px;
  padding-bottom: 2em;
  padding-top: 2em;
`
const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto 3em;
  max-width: 1080px;
  @media (max-width: 735px) {
    flex-direction: column;
    margin: 0 3em 3em;
  }
`
const Column = styled.div`
  flex: 1;
  @media (max-width: 735px) {
    margin-bottom: 1em
  }
`
const ColumnHeader = styled.div`
  margin: 0 0 10px;
  color: ${props => props.theme.neutral300}
  font-weight: 600;
`
const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.primary500};
  &:hover {
    color: ${props => props.theme.accent500};
  }
`
const BlockLink = styled(Link)`
  display: block;
  padding-top: 3px;
  padding-bottom: 3px;
`
const Center = styled.div`
  text-align: center;
  color: ${props => props.theme.neutral400};
`
const Logo = styled.img`
  margin: auto;
  min-width: 200px;
  max-width: 200px;
  display: block;
  @media (max-width: 735px) {
    max-width: 100px;
    padding-bottom: 20px;
  }
`


export const Footer = () => (
  <Container>
    <Flex>
      <Column>
        <ColumnHeader>Contact</ColumnHeader>
        <BlockLink href="blah">Blah</BlockLink>
        <BlockLink href="blah">Blah</BlockLink>
        <BlockLink href="blah">Blah</BlockLink>
      </Column>
      <Column>
        <ColumnHeader>Contact</ColumnHeader>
        <BlockLink href="blah">Blah</BlockLink>
        <BlockLink href="blah">Blah</BlockLink>
        <BlockLink href="blah">Blah</BlockLink>
      </Column>
      <Column>
        <ColumnHeader>Contact</ColumnHeader>
        <BlockLink href="blah">Blah</BlockLink>
        <BlockLink href="blah">Blah</BlockLink>
        <BlockLink href="blah">Blah</BlockLink>
      </Column>
    </Flex>
    <Flex>
      <Logo src={logoFH} alt="Fred Hutch"/>
      <Logo src={logoUWMed} alt="UW Medicine"/>
      <Logo src={logoSC} alt="Seattle Children's"/>
      <Logo src={logoBBI} alt="BBI"/>
    </Flex>
    <Center>
      <span>Site design: </span>
      <Link href="https://twitter.com/hamesjadfield">James Hadfield</Link>
    </Center>
    <Center>
      Copyright © 2018-2019 ???
    </Center>
  </Container>
)