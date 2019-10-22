import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchToken } from 'actions/currentUser.actions';
import { connect } from 'react-redux';
import { State } from 'types/redux.types';
import { Redirect } from 'react-router';
import ViewTitle from 'components/ViewTitle';
import { GITHUB_CLIENT_ID } from 'constants/custom.constants';
import { CurrentUserState } from 'reducers/currentUser.reducer';
import * as H from 'history';
import { BaseAction } from 'types/base-redux.types';

type Props = {
  location: H.Location;
  currentUser: CurrentUserState;
  fetchToken(code: string): BaseAction;
};

const LoginView = ({ location, currentUser, fetchToken }: Props) => {
  const gitHubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo`;
  const code = location.search.split('=')[1];

  useEffect(() => {
    if (code && !currentUser) {
      fetchToken(code);
    }
  }, []);

  if (currentUser) {
    return <Redirect to="/repos" />;
  }

  return (
    <>
      <ViewTitle>Login</ViewTitle>
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

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  { fetchToken }
)(LoginView);
