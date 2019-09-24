import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import issues from 'reducers/issues.reducer';
//import ui from 'reducers/ui.reducer';

export const reducersMap = {
  network,
  issues
};

export default combineReducers(reducersMap);
