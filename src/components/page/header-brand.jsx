import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { primaryColor, secondaryColor } from "../../colors";
import { devices } from "../helpers";

const StyledBrand = styled.div`
  align-items: center;
  color: ${primaryColor};
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  height: 36px;
  width: 36px;
`;

const BrandFragment = styled.span`
  display: none;

  @media ${devices.tablet} {
    display: block;
  }
`;

const Bracket = styled.span`
  color: ${secondaryColor};
  display: inline-block;
  margin-left: 4px;

  &:first-child {
    margin-left: 0;
    margin-right: 4px;
  }
`;

const prepareSiteTitle = (siteTitle) =>
  siteTitle
    .toLowerCase()
    .split(" ")
    .map((fragment) => (
      <React.Fragment key={fragment}>
        {fragment[0]}
        <BrandFragment>{fragment.slice(1)}</BrandFragment>
      </React.Fragment>
    ));

function Brand({ siteTitle }) {
  return (
    <StyledBrand>
      <Bracket>{"{"}</Bracket>
      {prepareSiteTitle(siteTitle)}
      <Bracket>{"}"}</Bracket>
    </StyledBrand>
  );
}

Brand.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Brand;
