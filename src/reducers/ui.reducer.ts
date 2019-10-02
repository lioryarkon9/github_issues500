import { handleActions } from 'redux-actions';
import { ON_CHANGE_FILTER_ISSUES_INPUT } from 'constants/actionNames.constants';
import { Ui } from 'types/redux.types';

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
