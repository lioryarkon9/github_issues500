import { Dispatch } from 'redux';
import { BaseAction } from 'types/base-redux.types';
import { RouterProps } from 'react-router';

const actionsRequiringNavigation = [
  'ON_SUCCESS_ADD_NEW_ISSUE',
  'ON_SUCCESS_UPDATE_NEW_ISSUE'
];

const navigationMiddleware = () => (next: Dispatch<BaseAction>) => (
  action: BaseAction & { router: RouterProps }
) => {
  next(action);

  if (actionsRequiringNavigation.includes(action.type)) {
    action.router.history.goBack();
  }
};

export default navigationMiddleware;
