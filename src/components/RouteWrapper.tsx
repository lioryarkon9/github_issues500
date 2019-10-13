import React from 'react';
import styled from '@emotion/styled';
import { State } from 'types/redux.types';
import { connect } from 'react-redux';
import Loader from 'components/Loder/Loader';

const RouteWrapper = ({ children, currentUser, isDisplayLoader }: any) => (
  <Wrapper>
    {isDisplayLoader ? <Loader /> : null}

    <Greeting>
      {currentUser ? `Logged-in as ${currentUser.login}` : 'Log in to start'}
    </Greeting>

    <BodyContainer>
      <Body>{children}</Body>
    </BodyContainer>
  </Wrapper>
);

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
`;

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
  padding: 0% 1% 1% 1%;
`;

const Body = styled.div`
  max-width: 1800px;
  min-width: 100vw;
`;

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser,
  isDisplayLoader: state.ui.isDisplayLoader
});

export default connect(mapStateToProps)(RouteWrapper);
