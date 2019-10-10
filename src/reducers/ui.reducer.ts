import { handleActions } from 'redux-actions';
import {
  ON_CHANGE_FILTER_ISSUES_INPUT,
  TOGGLE_LOADER_STATUS
} from 'constants/actionNames.constants';
import { action } from '@storybook/addon-actions';

export type Ui = {
  isDisplayLoader: boolean;
  filterInputValue: string;
};

const initialState: Ui = {
  isDisplayLoader: false,
  filterInputValue: ''
};

const uiReducer = handleActions<Ui>(
  {
    [ON_CHANGE_FILTER_ISSUES_INPUT]: (state, action) => {
      const { value } = action.payload;

      return {
        ...state,
        filterInputValue: value
      };
    },
    [TOGGLE_LOADER_STATUS]: state => {
      return {
        ...state,
        isDisplayLoader: !state.isDisplayLoader
      };
    }
  },
  initialState
);

export default uiReducer;
