import React from 'react';
import { connect } from 'react-redux';
import { State } from 'types/redux.types';
import { Redirect } from 'react-router';

type AuthProps = {
  currentUser: any;
  rest?: any;
};

const WithAuth = (Component: React.FunctionComponent<any>) => ({
  currentUser,
  ...rest
}: AuthProps) => {
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
};

const mapStateToProps = (state: State) => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(WithAuth);
