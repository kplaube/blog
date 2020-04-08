import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { createGlobalStyle } from "styled-components";
import { strongTextColor } from "./color";
import Header from "./page-header";
import PageFooter from "./page-footer";

const GlobalStyle = createGlobalStyle`
  body {
    color: ${strongTextColor};
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }
`;

const Layout = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
    }
  `);

  return (
    <>
      <GlobalStyle />

      <Header siteTitle={siteMetadata.title} siteUrl={siteMetadata.siteUrl} />
      <div>{children}</div>
      <PageFooter />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
