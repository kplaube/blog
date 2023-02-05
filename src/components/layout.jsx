import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { createGlobalStyle } from "styled-components";
import { strongTextColor } from "./color";
import PageFooter from "./page/footer";
import Header from "./page/header";

const GlobalStyle = createGlobalStyle`
  body {
    color: ${strongTextColor};
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }
`;

function Layout({ children }) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          contact
          licenseName
          licenseUrl
          repositoryUrl
          siteUrl
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />

      <Header
        contact={siteMetadata.contact}
        siteTitle={siteMetadata.title}
        siteUrl={siteMetadata.siteUrl}
      />
      <div>{children}</div>
      <PageFooter
        licenseName={siteMetadata.licenseName}
        licenseUrl={siteMetadata.licenseUrl}
        repositoryUrl={siteMetadata.repositoryUrl}
      />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
