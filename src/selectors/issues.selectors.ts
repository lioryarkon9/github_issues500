import { State } from 'types/redux.types';
// import {
//   Issues,
//   getIssuesObjectByList,
//   SingleIssue
// } from 'reducers/issues.reducer';
import { createSelector } from 'reselect';

const issuesSelector = (state: State): any => state.issues;
const filterInputSelector = (state: State) => state.ui.filterInputValue;

// export const issuesFilteredByInputChangeSelector = createSelector(
//   issuesSelector,
//   filterInputSelector,
//   (issues: any, valueToFilterBy: string): any => {
//     const filteredIssuesList = Object.values(issues).filter(issue => {
//       const issueTitle = issue.title;
//
//       if (valueToFilterBy) {
//         const paramRegex = new RegExp(`${valueToFilterBy.toLocaleLowerCase()}`);
//
//         return paramRegex.test(issueTitle.toLocaleLowerCase());
//       }
//
//       return false;
//     });
//
//     return getIssuesObjectByList(filteredIssuesList);
//   }
// );

export default issuesSelector;

/*issuesSelector,
  (issuesSelector: Issues): Issues => {
    const filteredIssuesList = Object.values(issuesSelector).filter(issue => {
      const issueTitle = issue.title;
      const paramRegex = new RegExp(`${value}`);
      return paramRegex.test(issueTitle);
    });

    return getIssuesObjectByList(filteredIssuesList);
  }*/
