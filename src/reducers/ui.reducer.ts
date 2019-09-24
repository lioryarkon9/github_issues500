import { handleActions } from 'redux-actions';
import { Issues, SingleIssue } from 'reducers/issues.reducer';
//import { FILTER_ISSUES_BY_INPUT_VALUE } from 'actions/ui.actions';

export type UiReducer = {
  filteredIssues?: SingleIssue[];
};

const initialState: UiReducer = {
  filteredIssues: []
};

const uiReducer = handleActions<UiReducer>(
  {
    ['FILTER_ISSUES_BY_INPUT_VALUE']: (state, action) => {
      const { filterValue, issues, allIssues } = action.payload;
      const filteredList = Object.values(allIssues as Issues).filter(
        (issue: SingleIssue) => {
          const issueTitle = issue.title;
          const paramRegex = new RegExp(`${filterValue}`);

          return paramRegex.test(issueTitle);
        }
      );

      return {
        ...state,
        filteredIssues: filteredList
      };
    }
  },
  initialState
);

export default uiReducer;
