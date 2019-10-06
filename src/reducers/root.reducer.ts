import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import issues from 'reducers/issues.reducer';
import ui from 'reducers/ui.reducer';
import currentUser from 'reducers/currentUser.reducer';
import repos from 'reducers/repos.reducer';

export const reducersMap = {
  network,
  issues,
  ui,
  currentUser,
  repos
};

export default combineReducers(reducersMap);
