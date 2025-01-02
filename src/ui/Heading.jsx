import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
// `;
// background-color: var(--color-grey-500);
const Heading = styled.h1`
  color: var(--color-grey-500);

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
`;
export default Heading;
