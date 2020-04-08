import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { lightSeparator, textColor } from "./color";

const Tags = styled.div`
  margin-bottom: 24px;
`;

const Tag = styled(Link)`
  background-color: ${lightSeparator};
  color: ${textColor};
  display: inline-block;
  font-size: 14px;
  margin: 0 8px 8px 0;
  padding: 8px 16px;
  text-decoration: none;
`;

export default ({ tags }) => (
  <Tags>
    {tags.map((tag) => (
      <Tag key={tag} to={`/tag/${tag}.html`}>
        {tag}
      </Tag>
    ))}
  </Tags>
);
