import React from 'react';
import { connect } from 'react-redux';
import { State } from 'types/redux.types';
import { Redirect } from 'react-router';
import { fetchUserDetails, setUserDetails } from 'actions/currentUser.actions';
import { CurrentUserState } from 'reducers/currentUser.reducer';
import { BaseAction } from 'types/base-redux.types';

type Props = {
  currentUser: CurrentUserState;
  rest?: any;
  fetchUserDetails(): BaseAction;
  setUserDetails(param: CurrentUserState): BaseAction;
};

const WithAuth = (Component: React.FunctionComponent<any>) => {
  const RenderAuthorized = ({
    currentUser,
    fetchUserDetails,
    setUserDetails,
    ...rest
  }: Props) => {
    const cachedUser = window.sessionStorage.getItem('_currentUser');

    if (!currentUser) {
      if (cachedUser) {
        setUserDetails(JSON.parse(cachedUser));
      } else {
        fetchUserDetails();
      }

      return null;
    }

    if (!window.sessionStorage.getItem('_token')) {
      return <Redirect to="/login" />;
    }

    return <Component {...rest} />;
  };

  const mapStateToProps = (state: State) => ({
    currentUser: state.currentUser
  });

  return connect(
    mapStateToProps,
    {
      fetchUserDetails,
      setUserDetails
    }
  )(RenderAuthorized);
};

export default WithAuth;
