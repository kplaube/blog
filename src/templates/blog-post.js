import { graphql } from "gatsby";
import React from "react";
import Article from "../components/article";
import Container from "../components/container";
import Layout from "../components/layout";
import SEO from "../components/seo";

const BlogPost = (props) => {
  const { author, siteUrl } = props.data.site.siteMetadata;
  const post = props.data.markdownRemark;
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
        readingTime {
          minutes
        }
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
