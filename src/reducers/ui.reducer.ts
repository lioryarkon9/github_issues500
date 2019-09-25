import { handleActions } from 'redux-actions';
import { Issues, SingleIssue } from 'reducers/issues.reducer';
import { ON_CHANGE_FILTER_ISSUES_INPUT } from 'constants/actionNames.constants';

export type UiReducer = {
  filterInputValue?: string;
};

const initialState: UiReducer = {
  filterInputValue: ''
};

const uiReducer = handleActions<UiReducer>(
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
