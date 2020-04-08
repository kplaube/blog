import { Mail } from "@styled-icons/feather/Mail";
import { Link } from "gatsby";
import React from "react";
import styled, { css } from "styled-components";
import { secondaryColor, textColor } from "./color";
import Container from "./container";
import { devices } from "./helpers";
import Brand from "./page-header-brand";

const BaseIconStyles = css`
  color: ${secondaryColor};
  width: 22px;
`;

const GreyMail = styled(Mail)`
  ${BaseIconStyles};
`;

const Header = styled.div`
  box-shadow: 0 -8px 16px 0 ${textColor};
  font-size: 1.1rem;
  margin-bottom: 24px;

  @media ${devices.tablet} {
    margin-bottom: 64px;
  }
`;

const HeaderContainer = styled(Container)`
  align-items: center;
  display: flex;
  height: 56px;
  justify-content: space-between;
  max-width: 974px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledA = styled.a`
  text-decoration: none;
`;

export default ({ siteTitle }) => (
  <Header>
    <HeaderContainer>
      <StyledLink to="/">
        <Brand siteTitle={siteTitle} />
      </StyledLink>
      <div>
        <StyledA href="https://about.me/klauslaube" title="Contato">
          <GreyMail />
        </StyledA>
      </div>
    </HeaderContainer>
  </Header>
);
