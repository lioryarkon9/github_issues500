import { handleActions } from 'redux-actions';
import { ON_CHANGE_FILTER_ISSUES_INPUT } from 'constants/actionNames.constants';

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
    }
  },
  initialState
);

export default uiReducer;
