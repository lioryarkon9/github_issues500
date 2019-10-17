import React from 'react';
import styled from '@emotion/styled';
import './Loader.css';

const Loader = () => (
  <Wrapper>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #b4bcc7;
  opacity: 0.9;
  color: #3c4146;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: fixed;
  left: 0;
`;

export default Loader;
