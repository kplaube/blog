import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Summary from "../components/article/summary";
import Container from "../components/container";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import SEO from "../components/seo";
import { Title } from "../components/typograph";

const PageTitle = styled(Title)`
  margin-bottom: 64px;
  text-align: center;
`;

function Tags({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext: { currentPage, numPages, tag },
}) {
  return (
    <Layout>
      <SEO title={`Posts com ${tag}`} />

      <Container>
        <PageTitle>{`Posts disponíveis em "${tag}"`}</PageTitle>

        {edges.map(({ node }) => (
          <Summary key={node.fields.slug} node={node} />
        ))}

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          prefix={`tag/${tag}`}
        />
      </Container>
    </Layout>
  );
}

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: {
      edges: PropTypes.array.isRequired,
    },
  }).isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
    tag: PropTypes.string,
  }).isRequired,
};

export default Tags;

export const query = graphql`
  query TagsQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMarkdownRemark(
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          excerpt(pruneLength: 125)
          fields {
            slug
          }
        }
      }
    }
  }
`;
