import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import issues from 'reducers/issues.reducer';
import ui from 'reducers/ui.reducer';
import currentUser from 'reducers/currentUser';

export const reducersMap = {
  network,
  issues,
  ui,
  currentUser
};

export default combineReducers(reducersMap);
