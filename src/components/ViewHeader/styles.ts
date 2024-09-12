import styled from "styled-components";

export const ViewHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
  height: fit-content;

  h2 {
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
  }

  p {
    font-size: 16px;
    line-height: 16px;
    font-weight: 300;
  }
`;
