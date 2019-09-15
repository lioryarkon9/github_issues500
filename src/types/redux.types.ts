import { NetworkState } from 'reducers/network.reducer';
import { Issues } from 'reducers/issues.reducer';

export type State = {
  network: NetworkState;
  issues: Issues;
};
