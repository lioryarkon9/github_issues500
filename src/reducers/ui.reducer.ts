import { handleActions } from 'redux-actions';
import {
  ON_CHANGE_FILTER_ISSUES_INPUT,
  TOGGLE_LOADER_STATUS
} from 'constants/actionNames.constants';

export type UiState = {
  isDisplayLoader: boolean;
  filterInputValue: string;
};

const initialState: UiState = {
  isDisplayLoader: false,
  filterInputValue: ''
};

const uiReducer = handleActions<UiState>(
  {
    [ON_CHANGE_FILTER_ISSUES_INPUT]: (state, action) => {
      const { value } = action.payload;

      return {
        ...state,
        filterInputValue: value
      };
    },
    [TOGGLE_LOADER_STATUS]: state => ({
      ...state,
      isDisplayLoader: !state.isDisplayLoader
    })
  },
  initialState
);

export default uiReducer;
