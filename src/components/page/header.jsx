import { Mail } from "@styled-icons/feather/Mail";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import { secondaryColor, textColor } from "../../colors";
import Container from "../container";
import { devices } from "../helpers";
import Brand from "./header-brand";

const BaseIconStyles = css`
  color: ${secondaryColor};
  width: 22px;
`;

const GreyMail = styled(Mail)`
  ${BaseIconStyles};
`;

const StyledHeader = styled.div`
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

function Header({ contact, siteTitle }) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLink to="/">
          <Brand siteTitle={siteTitle} />
        </StyledLink>
        <div>
          <StyledA href={contact} title="Contato">
            <GreyMail />
          </StyledA>
        </div>
      </HeaderContainer>
    </StyledHeader>
  );
}

Header.propTypes = {
  contact: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
