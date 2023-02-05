import { Github } from "@styled-icons/boxicons-logos/Github";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";
import { MediumSquare } from "@styled-icons/boxicons-logos/MediumSquare";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";
import { textColor } from "../colors";
import Avatar from "./avatar";
import { devices } from "./helpers";
import { Text, Title } from "./typograph";

const BaseIconStyles = css`
  color: ${textColor};
  width: 22px;
`;

const GithubGrey = styled(Github)`
  ${BaseIconStyles};
`;

const LinkedinGrey = styled(LinkedinSquare)`
  ${BaseIconStyles};
`;

const MediumGrey = styled(MediumSquare)`
  ${BaseIconStyles};
`;

const AuthorWrapper = styled.div`
  margin-bottom: 48px;

  @media ${devices.tablet} {
    align-items: center;
    display: flex;
    margin-bottom: 56px;
  }
`;

const Headline = styled(Text)`
  color: ${textColor};
  display: inline;
`;

const Name = styled(Title)`
  font-size: 28px;
`;

const Social = styled.div`
  float: right;
  margin: 0 0 0 16px;
  padding: 0 4px;

  a {
    margin: 0 4px;
  }
`;

const StyledAvatar = styled(Avatar)`
  height: 80px;
  margin-bottom: 20px;
  width: 80px;

  @media ${devices.tablet} {
    margin: 0 24px 0 0;
  }
`;

function Author({ github, gravatar, linkedin, medium }) {
  return (
    <AuthorWrapper>
      <StyledAvatar src={gravatar} alt="Avatar" />
      <div>
        <Name />
        <Headline>Desenvolvedor web, apaixonado por Python e Django.</Headline>
        <Social>
          <a href={github}>
            <GithubGrey />
          </a>
          <a href={linkedin}>
            <LinkedinGrey />
          </a>
          <a href={medium}>
            <MediumGrey />
          </a>
        </Social>
      </div>
    </AuthorWrapper>
  );
}

Author.propTypes = {
  github: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
};

export default Author;
