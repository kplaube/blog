import styled from "styled-components";
import { strongTextColor } from "./color";

export const Text = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  margin: 0;
`;

export const Title = styled.h1`
  color: ${strongTextColor};
  font-weight: 600;
  letter-spacing: -0.93px;
  margin: 0 0 4px 0;
`;

export const Subtitle = styled.h2`
  color: ${strongTextColor};
  font-weight: 600;
  letter-spacing: -0.93px;
  margin: 0;
`;
