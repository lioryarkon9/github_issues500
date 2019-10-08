import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
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
    'https://github.com/login/oauth/authorize?client_id=3f7df47dee6d4bfe0466&scope=repo';
  const code = location.search.split('=')[1];

  useEffect(() => {
    if (code && !currentUser) {
      fetchTokenByCodeAndGetUserDetails(code);
    }
  }, []);

  if (currentUser) {
    return <Redirect to="/repos" />;
  }

  return (
    <>
      <LoginTitle>Login</LoginTitle>
      <FormInputsContainer>
        <a href={gitHubUrl}>Initialize Github</a>
      </FormInputsContainer>
    </>
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
