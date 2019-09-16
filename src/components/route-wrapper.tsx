import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding: 3% 1% 1% 1%;
  display: flex;
  justify-content: center;
`;

const BodyContainer = styled.div`
  max-width: 1800px;
  min-width: 1100px;
`;

export default (props: any) => (
  <Wrapper>
    <BodyContainer>{props.children}</BodyContainer>
  </Wrapper>
);
