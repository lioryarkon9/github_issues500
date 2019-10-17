import React from 'react';
import { connect } from 'react-redux';
import { State } from 'types/redux.types';
import { Redirect } from 'react-router';
import { fetchUserDetails } from 'actions/currentUser.actions';

type AuthProps = {
  currentUser: any;
  rest?: any;
  fetchUserDetails: any;
};

const WithAuth = (Component: React.FunctionComponent<any>) => {
  const RenderAuthorized = ({
    currentUser,
    fetchUserDetails,
    ...rest
  }: AuthProps) => {
    if (!currentUser) {
      fetchUserDetails();
    } else if (!window.sessionStorage.getItem('_token')) {
      return <Redirect to="/login" />;
    }

    return <Component {...rest} />;
  };

  const mapStateToProps = (state: State) => ({
    currentUser: state.currentUser
  });

  return connect(
    mapStateToProps,
    { fetchUserDetails }
  )(RenderAuthorized);
};

export default WithAuth;
