import { NetworkState } from 'reducers/network.reducer';
import { Ui } from 'reducers/ui.reducer';
import { Issues } from 'reducers/issues.reducer';
import { CurrentUser } from 'reducers/currentUser';

export type State = {
  network: NetworkState;
  issues: Issues;
  ui: Ui;
  currentUser: CurrentUser;
};
