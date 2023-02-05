import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Summary from "../components/article/summary";
import Author from "../components/author";
import Container from "../components/container";
import Layout from "../components/layout";
import Pagination from "../components/pagination";
import SEO from "../components/seo";

function BlogList({
  data: {
    allMarkdownRemark: { edges },
    site: {
      siteMetadata: { author, description },
    },
  },
  pageContext: { currentPage, numPages },
}) {
  return (
    <Layout>
      <SEO
        title={description}
        meta={[
          {
            name: "keywords",
            content: ["desenvolvimento-web", "python", "django"],
          },
          {
            property: `og:image`,
            content: author.gravatar,
          },
        ]}
      />

      <Container>
        <Author
          github={author.github}
          gravatar={author.gravatar}
          linkedin={author.linkedin}
          medium={author.medium}
        />

        {edges.map(({ node }) => (
          <Summary key={node.fields.slug} node={node} />
        ))}

        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          prefix="index"
        />
      </Container>
    </Layout>
  );
}

BlogList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.arrayOf({
            slug: PropTypes.string,
          }),
        })
      ),
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.shape({
          github: PropTypes.string,
          gravatar: PropTypes.string,
          linkedin: PropTypes.string,
          medium: PropTypes.string,
        }).isRequired,
        description: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }).isRequired,
};

export default BlogList;

export const query = graphql`
  query ListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date
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
    site {
      siteMetadata {
        author {
          github
          gravatar
          linkedin
          medium
          name
        }
        description
      }
    }
  }
`;
