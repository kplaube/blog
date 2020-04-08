import { FacebookSquare } from "@styled-icons/boxicons-logos/FacebookSquare";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";
import { Twitter } from "@styled-icons/boxicons-logos/Twitter";
import { Whatsapp } from "@styled-icons/boxicons-logos/Whatsapp";
import React from "react";
import styled, { css } from "styled-components";
import { strongTextColor } from "./color";
import { devices } from "./helpers";

const BaseIconStyles = css`
  color: ${strongTextColor};
  height: 24px;
  width: 24px;
`;

const FacebookStyled = styled(FacebookSquare)`
  ${BaseIconStyles}
`;

const LinkedinStyled = styled(LinkedinSquare)`
  ${BaseIconStyles}
`;

const TwitterStyled = styled(Twitter)`
  ${BaseIconStyles}
`;

const WhatsappStyled = styled(Whatsapp)`
  ${BaseIconStyles}
`;

const SocialLink = styled.a`
  display: inline-block;
  margin-right: 8px;
`;

const SocialWrapper = styled.div`
  clear: both;
  margin-bottom: 32px;

  @media ${devices.tablet} {
    clear: none;
    float: right;
    line-height: 48px;
  }
`;

export default ({ siteUrl, slug, title }) => {
  const fullUrl = siteUrl + slug;

  const twitter = `https://twitter.com/intent/tweet?url=${fullUrl}&text=${title}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`;
  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl}&title=${title}`;
  const whatsapp = `https://api.whatsapp.com/send?text=${fullUrl}`;

  return (
    <SocialWrapper>
      <SocialLink
        href={twitter}
        target="_blank"
        rel="noreferrer"
        title="Compartilhe no Twitter"
      >
        <TwitterStyled />
      </SocialLink>
      <SocialLink
        href={fb}
        target="_blank"
        rel="noreferrer"
        title="Compartilhe no Facebook"
      >
        <FacebookStyled />
      </SocialLink>
      <SocialLink
        href={linkedin}
        target="_blank"
        rel="noreferrer"
        title="Compartilhe no Linkedin"
      >
        <LinkedinStyled />
      </SocialLink>
      <SocialLink
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        title="Compartilhe no Whatsapp"
      >
        <WhatsappStyled />
      </SocialLink>
    </SocialWrapper>
  );
};
