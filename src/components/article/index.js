import { DiscussionEmbed } from "disqus-react";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Avatar from "../avatar";
import {
  lightSeparator,
  primaryColor,
  secondaryColor,
  strongTextColor,
  textColor,
} from "../color";
import { devices, localedDate, localedReadingTime } from "../helpers";
import { Title } from "../typograph";
import Share from "./share";
import Tags from "./tags";

const AuthorName = styled.div`
  color: ${strongTextColor};
  margin-bottom: 4px;
`;

const Content = styled.div`
  clear: both;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.054px;
  line-height: 28px;
  margin-bottom: 48px;

  @media ${devices.tablet} {
    font-size: 20px;
  }

  * {
    margin: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    padding: 0;
  }

  h2,
  h3,
  h4 {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    letter-spacing: -0.66px;
    margin-top: 8px;
    margin-bottom: 28px;

    @media ${devices.tablet} {
      margin-bottom: 16px;
    }
  }

  figure,
  iframe,
  .gatsby-highlight {
    left: -24px;
    position: relative;
    width: 100vw;

    @media ${devices.tablet} {
      left: 0;
      width: auto;
    }
  }

  a {
    color: ${primaryColor};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    color: ${textColor};
    font-style: italic;
  }

  code {
    font-size: 16px;
  }

  figcaption {
    color: ${textColor};
    font-size: 16px;
    line-height: 20px;
    padding: 16px 24px 0;
    text-align: center;
  }

  h2 {
    font-size: 26px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 28px;
  }

  h3 {
    color: ${secondaryColor};
    font-size: 22px;
    font-weight: 300;
    line-height: 28px;
  }

  h4 {
    color: ${textColor};
    font-size: 16;
    font-weight: 300;
    line-height: 24px;
  }

  iframe {
    display: block;
    margin: 0 auto 28px auto;
    height: 260px;

    @media ${devices.tablet} {
      margin-bottom: 42px;
      height: 315px;
      width: 560px;
    }
  }

  img {
    display: block;
    margin: 0 auto;
  }

  p {
    margin-bottom: 28px;

    & > .language-text {
      background-color: ${lightSeparator};
      color: ${secondaryColor};
    }

    @media ${devices.tablet} {
      margin-bottom: 42px;
    }
  }

  pre {
    font-size: 16px;
    margin-bottom: 28px;
    padding: 24px 16px;

    @media ${devices.tablet} {
      margin-bottom: 42px;
    }
  }

  ol,
  ul {
    margin-left: 28px;

    @media ${devices.tablet} {
      margin-bottom: 42px;
    }
  }

  li {
    margin-bottom: 8px;

    @media ${devices.tablet} {
      margin-bottom: 16px;
    }
  }
`;

const DiscussionWrapper = styled.div`
  border-top: 1px solid ${lightSeparator};
  margin-bottom: 24px;
  padding-top: 24px;
`;

const Meta = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  float: left;
  font-size: 14px;
  margin-bottom: 32px;
`;

const MetaText = styled.div`
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 16px;
`;

const StyledTitle = styled(Title)`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 32px;

  @media ${devices.tablet} {
    font-size: 40px;
  }
`;

const Article = ({
  author,
  node: {
    frontmatter: { date, tags, title },
    fields: {
      readingTime: { minutes },
      slug,
    },
    html,
  },
  siteUrl,
}) => (
  <>
    <StyledTitle>{title}</StyledTitle>

    <Meta>
      <StyledAvatar src={author.gravatar} width="48" height="48" alt="Avatar" />

      <MetaText>
        <AuthorName>{author.name}</AuthorName>
        {localedDate(date)} - {localedReadingTime(minutes)} de leitura
      </MetaText>
    </Meta>

    <Share siteUrl={siteUrl} slug={slug} title={title} />

    <Content dangerouslySetInnerHTML={{ __html: html }} />

    <Tags tags={tags} />

    <DiscussionWrapper>
      <DiscussionEmbed
        shortname={process.env.GATSBY_DISQUS_NAME || `klauslaube`}
        config={{
          title,
          identifier: slug,
        }}
      />
    </DiscussionWrapper>
  </>
);

Article.propTypes = {
  author: PropTypes.node.isRequired,
  node: PropTypes.node.isRequired,
  siteUrl: PropTypes.string.isRequired,
};

export default Article;
