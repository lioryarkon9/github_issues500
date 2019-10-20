import { get, castArray, compact } from 'lodash/fp';
import urljoin from 'url-join';
import { Dispatch, Store, ActionCreator } from 'redux';

import apiUtils from 'utils/api.utils';
import { startNetwork, endNetwork } from 'actions/network.actions';
import { BaseAction } from 'types/base-redux.types';
import { State } from 'types/redux.types';
import { BASE_URL } from 'constants/config';
import * as logger from 'utils/logger';
import { toggleLoaderStatus } from 'actions/ui.actions';
import { GITHUB_BASE_URL } from 'constants/custom.constants';

export function dispatchActions(
  dispatch: Dispatch<BaseAction>,
  actionCreators: ActionCreator<BaseAction> | ActionCreator<BaseAction>[],
  response: any
) {
  compact(castArray(actionCreators)).forEach(
    (actionCreator: ActionCreator<BaseAction>) => {
      const action = actionCreator(response);

      return action && dispatch(action);
    }
  );
}

export function apiMiddleware({ dispatch }: Store<State>) {
  return (next: Dispatch<BaseAction>) => async (action: BaseAction) => {
    if (!get('meta.api', action)) {
      return next(action);
    }

    dispatch(toggleLoaderStatus());

    const { payload } = action;
    const {
      path,
      baseUrl,
      onSuccess,
      onError,
      networkLabel,
      data,
      method
    } = payload;
    const headers: Record<string, string> = {};
    const requestUrl = urljoin(baseUrl || BASE_URL, path);

    if (action.payload.baseUrl === GITHUB_BASE_URL) {
      headers['Authorization'] = `token ${window.sessionStorage.getItem(
        '_token'
      )}`;
    }

    // force browser to avoid caching items after editing through patch http request
    if (action.type === 'FETCH_ISSUES_BY_OWNER_AND_REPO') {
      const now = new Date();

      headers['If-Modified-Since'] = now.toString();
    }

    next(action);
    dispatch(startNetwork(networkLabel));

    try {
      const response = await apiUtils.request({
        method,
        url: requestUrl,
        data,
        headers
      });

      if (onSuccess) {
        dispatchActions(dispatch, onSuccess, response.body || response.text);
      }

      dispatch(toggleLoaderStatus());

      dispatch(endNetwork(networkLabel));
    } catch (error) {
      logger.error('API error', error, action);

      if (get('response.status', error) === 401) {
        // TODO: handle 401
      }

      if (onError) {
        dispatchActions(dispatch, onError, error);
      }
      dispatch(endNetwork(networkLabel));
    }
  };
}

export default apiMiddleware;
