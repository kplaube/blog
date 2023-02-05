import { graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Article from "../components/article";
import Container from "../components/container";
import Layout from "../components/layout";
import SEO from "../components/seo";

function BlogPost({ data }) {
  const { author, siteUrl } = data.site.siteMetadata;
  const post = data.markdownRemark;
  const { tags, title, thumbnail } = post.frontmatter;

  const seoMeta = [
    {
      name: "keywords",
      content: tags,
    },
  ];

  if (thumbnail) {
    seoMeta.push({
      property: `og:image`,
      content: siteUrl + thumbnail.publicURL,
    });
  }

  return (
    <Layout>
      <SEO title={title} description={post.excerpt} meta={seoMeta} />

      <Container>
        <Article node={post} author={author} siteUrl={siteUrl} />
      </Container>
    </Layout>
  );
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    markdownRemark: PropTypes.shape({
      excerpt: PropTypes.string,
      frontmatter: PropTypes.shape({
        tags: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        thumbnail: PropTypes.shape({
          publicURL: PropTypes.string,
        }),
      }).isRequired,
    }),
  }).isRequired,
};

export default BlogPost;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        date
        title
        tags
        thumbnail {
          childImageSharp {
            fixed(width: 180, height: 180) {
              ...GatsbyImageSharpFixed
            }
          }
          publicURL
        }
      }
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        author {
          name
          gravatar
        }
        siteUrl
      }
    }
  }
`;
