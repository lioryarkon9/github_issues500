import { NetworkState } from 'reducers/network.reducer';
import { UiState } from 'reducers/ui.reducer';
import { IssuesState } from 'reducers/issues.reducer';
import { CurrentUserState } from 'reducers/currentUser.reducer';
import { ReposState } from 'reducers/repos.reducer';

export type State = {
  network: NetworkState;
  issues: IssuesState;
  ui: UiState;
  currentUser: CurrentUserState;
  repos: ReposState;
};
