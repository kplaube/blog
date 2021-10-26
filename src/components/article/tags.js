import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { lightSeparator, textColor } from "../color";

const StyledTags = styled.div`
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

const Tags = ({ tags }) => (
  <StyledTags>
    {tags.map((tag) => (
      <Tag key={tag} to={`/tag/${tag}.html`}>
        {tag}
      </Tag>
    ))}
  </StyledTags>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
