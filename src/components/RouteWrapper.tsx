import React from 'react';
import styled from '@emotion/styled';
import { State } from 'types/redux.types';
import { connect } from 'react-redux';

const RouteWrapper = ({ children, currentUser }: any) => (
  <Wrapper>
    <Greeting>
      {currentUser ? `Logged-in as ${currentUser.login}` : 'Log in to start'}
    </Greeting>
    <BodyContainer>{children}</BodyContainer>
  </Wrapper>
);

const Greeting = styled.div`
  text-align: right;
  font-size: 0.9em;
  color: #3c4146;
  padding: 2%;
  font-weight: bold;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding: 3% 1% 1% 1%;
`;

const BodyContainer = styled.div`
  max-width: 1800px;
  min-width: 1100px;
`;

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(RouteWrapper);
