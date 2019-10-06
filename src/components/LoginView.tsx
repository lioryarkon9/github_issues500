import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import RouteWrapper from 'components/RouteWrapper';
import { setUserDetails } from 'actions/currentUser.actions';
import { connect } from 'react-redux';
import { State } from 'types/redux.types';
import { Redirect } from 'react-router';

const LoginView = ({
  location,
  currentUser,
  setUserDetails: setUserDetailsRename
}: any) => {
  const gitHubUrl =
    'https://github.com/login/oauth/authorize?client_id=3f7df47dee6d4bfe0466';
  const [url, code] = location.search.split('=');

  console.log('currentUser: ', currentUser);
  console.log('setUSerDetails: ', setUserDetails);

  useEffect(() => {
    console.info('useEffect running');
    if (code) {
      fetch(`https://gatekeeper-test2.herokuapp.com/authenticate/${code}`).then(
        httpResponse => {
          httpResponse.json().then(({ token }) => {
            if (token) {
              window.sessionStorage.setItem('_token', token);
              fetch(`https://api.github.com/user`, {
                headers: {
                  Authorization: `token ${token}`
                }
              }).then(httpResponse => {
                httpResponse.json().then(jsonResponse => {
                  setUserDetailsRename(jsonResponse);
                });
              });
            }
          });
        }
      );
    }
  }, [code]);

  if (currentUser) {
    return <Redirect to="/" />;
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
  { setUserDetails }
)(LoginView);
