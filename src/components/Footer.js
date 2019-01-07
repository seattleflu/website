import React from 'react';
import styled from 'styled-components'
import logoBBI from '../img/BBILogoGrey.png';
import logoUWMed from '../img/UWMedLogoGrey.png';
import logoSC from '../img/SeattleChildrensLogoGrey.png';
import logoFH from '../img/FredHutchLogoGrey.png';
import * as utils from "./utils";

const Container = styled.div`
  background-color: ${props => props.theme.neutral900};
  min-height: 10vh;
  width: 100vw;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  padding-bottom: 2em;
  padding-top: 2em;
  flex-shrink: 0;
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
const LogoLink = styled.a`
  cursor: pointer;
  margin: auto 0;
`
const BlockLinkInternal = styled(utils.InternalLink)`
  display: block;
  padding-top: 3px;
  padding-bottom: 3px;
`
const BlockLinkExternal = styled(utils.ExternalLink)`
  display: block;
  padding-top: 3px;
  padding-bottom: 3px;
`
const Center = styled.div`
  text-align: center;
  color: ${props => props.theme.neutral200};
  padding-left: 5px;
  padding-right: 5px;
`
const Logo = styled.img`
  margin: auto;
  min-width: 210px;
  max-width: 210px;
  display: block;
  @media (max-width: 735px) {
    max-width: 100px;
    padding-bottom: 20px;
  }
`

// Temporarily removing links from footer
// <Flex>
//   <Column>
//     <ColumnHeader>Internal Links</ColumnHeader>
//     <BlockLinkInternal to="/">Home</BlockLinkInternal>
//     <BlockLinkInternal to="/FAQ">FAQ</BlockLinkInternal>
//     <BlockLinkInternal to="/Flu101">Influenza 101</BlockLinkInternal>
//   </Column>
//   <Column>
//   <ColumnHeader>External Links</ColumnHeader>
//     <BlockLinkExternal href="https://nextstrain.org">Nextstrain</BlockLinkExternal>
//   </Column>
// </Flex>

export const Footer = () => (
  <Container>
    <Flex>
      <LogoLink href="https://brotmanbaty.org">
        <Logo src={logoBBI} alt="BBI"/>
      </LogoLink>
      <LogoLink href="https://www.uwmedicine.org/">
        <Logo src={logoUWMed} alt="UW Medicine"/>
      </LogoLink>
      <LogoLink href="https://www.fredhutch.org/en.html">
        <Logo src={logoFH} alt="Fred Hutch"/>
      </LogoLink>
      <LogoLink href="https://www.seattlechildrens.org/">
        <Logo src={logoSC} alt="Seattle Children's"/>
      </LogoLink>
    </Flex>
    <Center>
      For other questions or more information, please email: <utils.ExternalLink href="mailto:info@bbi.org">info@bbi.org</utils.ExternalLink>.
      <span>{" "}</span>
      For press inquiries, please email: <utils.ExternalLink href="mailto:BBI@feareygroup.com">BBI@feareygroup.com</utils.ExternalLink>.
    </Center>
    <br/>
    <Center>
      <span>Site design: </span>
      <utils.ExternalLink href="https://twitter.com/hamesjadfield">James Hadfield</utils.ExternalLink>
      <span>{" & "}</span>
      <utils.ExternalLink href="https://bedford.io/team/trevor-bedford/">Trevor Bedford</utils.ExternalLink>
    </Center>
    <Center>
      © 2018-2019 Brotman Baty Institute
    </Center>
  </Container>
)
