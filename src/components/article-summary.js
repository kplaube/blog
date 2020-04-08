import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { textColor } from "./color";
import { devices, localedDate, localedReadingTime } from "./helpers";
import Thumbnail from "./thumbnail";
import { Subtitle } from "./typograph";

const Summary = styled.article`
  margin-bottom: 32px;
  overflow: auto;

  a {
    text-decoration: none;
  }

  @media ${devices.tablet} {
    margin-bottom: 48px;
  }
`;

const SummaryDescription = styled.p`
  display: none;

  @media ${devices.tablet} {
    color: ${textColor};
    display: block;
    font-size: 16px;
    line-height: 20px;
  }
`;

const SummaryMeta = styled.small`
  color: ${textColor};
  font-size: 12px;
`;

const SummaryTitle = styled(Subtitle)`
  font-size: 18px;
  margin-bottom: 8px;

  @media ${devices.tablet} {
    font-size: 24px;
    margin-bottom: 12px;
  }
`;

const SummaryThumbnail = styled(Thumbnail)`
  float: right;
  height: ${({ fixed }) => fixed.height / 2}px !important;
  margin-left: 8px;
  width: ${({ fixed }) => fixed.width / 2}px !important;

  @media ${devices.tablet} {
    height: ${({ fixed }) => fixed.height}px !important;
    width: ${({ fixed }) => fixed.width}px !important;
  }
`;

export default ({
  node: {
    excerpt,
    frontmatter: { date, title, thumbnail },
    fields: {
      readingTime: { minutes },
      slug,
    },
  },
}) => (
  <Summary>
    <Link to={slug}>
      {thumbnail && (
        <SummaryThumbnail fixed={thumbnail.childImageSharp.fixed} />
      )}
      <SummaryTitle>{title}</SummaryTitle>
      <SummaryDescription>{excerpt}</SummaryDescription>
      <SummaryMeta>
        {localedDate(date)} - {localedReadingTime(minutes)} de leitura
      </SummaryMeta>
    </Link>
  </Summary>
);
