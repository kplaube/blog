import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { lightSeparator, strongTextColor, textColor } from "../color";
import Container from "../container";
import { devices } from "../helpers";

const Footer = styled.footer`
  border-top: 1px solid ${lightSeparator};
  color: ${textColor};
  font-size: 14px;
  padding: 24px 0;
  text-align: center;

  @media ${devices.tablet} {
    text-align: right;
  }
`;

const Link = styled.a`
  color: ${strongTextColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PageFooter = ({ licenseName, licenseUrl, repositoryUrl }) => (
  <Footer>
    <Container>
      <p>
        O conteúdo desse blog está sob a licença{" "}
        <Link href={licenseUrl}>{licenseName}</Link>.
      </p>
      <p>
        <Link href={repositoryUrl}>Fork me on Github</Link>.
      </p>
    </Container>
  </Footer>
);

PageFooter.propTypes = {
  licenseName: PropTypes.string.isRequired,
  licenseUrl: PropTypes.string.isRequired,
  repositoryUrl: PropTypes.string.isRequired,
};

export default PageFooter;
