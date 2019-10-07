import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import RouteWrapper from 'components/RouteWrapper';
import { fetchToken } from 'actions/currentUser.actions';
import { connect } from 'react-redux';
import { State } from 'types/redux.types';
import { Redirect } from 'react-router';

const LoginView = ({
  location,
  currentUser,
  fetchToken: fetchTokenByCodeAndGetUserDetails
}: any) => {
  const gitHubUrl =
    'https://github.com/login/oauth/authorize?client_id=3f7df47dee6d4bfe0466';
  const [url, code] = location.search.split('=');

  useEffect(() => {
    if (code) {
      fetchTokenByCodeAndGetUserDetails(code);
    }
  }, [code]);

  if (currentUser) {
    return <Redirect to="/repos" />;
  }

  return (
    <RouteWrapper>
      <LoginTitle>Login</LoginTitle>
      <FormInputsContainer>
        <a href={gitHubUrl}>Initialize Github</a>
      </FormInputsContainer>
    </RouteWrapper>
  );
};

const FormInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h1`
  text-align: center;
`;

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  { fetchToken }
)(LoginView);
