import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as H from 'history';

import { State } from 'types/redux.types';
import { BaseAction } from 'types/base-redux.types';

import { fetchToken } from 'actions/currentUser.actions';
import ViewTitle from 'components/ViewTitle';
import { GITHUB_CLIENT_ID } from 'constants/custom.constants';
import { CurrentUserState } from 'reducers/currentUser.reducer';

type Props = {
  location: H.Location;
  currentUser: CurrentUserState;
  fetchToken(code: string): BaseAction;
};

const LoginView = ({ location, currentUser, fetchToken }: Props) => {
  const gitHubUrl: string = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo`;

  const regexExec: RegExpExecArray | null = pattern.exec(location.search);
  const code: string = regexExec ? regexExec[1] : '';

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

const pattern: RegExp = /client_id=([0-9]{40})./;

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
