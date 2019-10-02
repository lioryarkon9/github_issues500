import { NetworkState } from 'reducers/network.reducer';

export type Issues = {
  [id: number]: any;
};

export type Ui = {
  isDisplayLoader: boolean;
  filterInputValue?: string;
};

export type State = {
  network: NetworkState;
  issues: [Issues];
  ui: Ui;
};
